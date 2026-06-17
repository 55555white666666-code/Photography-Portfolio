import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const photosFile = path.join(projectRoot, 'src', 'data', 'photos.js');
const publicDir = path.join(projectRoot, 'public');
const isDryRun = process.argv.includes('--dry-run');

const FILLABLE_FIELDS = ['camera', 'lens', 'date', 'orientation'];
const BASIC_PLACEHOLDERS = new Set([
  '',
  '未填写',
  '未知',
  '未知时间',
  '未知相机',
  '未知镜头',
  '待填写',
  'TBD',
  'todo',
]);
const GENERIC_CAMERA_PLACEHOLDERS = new Set([
  'nikon',
  'canon',
  'sony',
  'fujifilm',
  'fuji',
  'apple',
]);

function normalizePath(filePath) {
  return filePath.replaceAll('\\', '/');
}

function cleanText(value) {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value)
    .replace(/\0/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function readUInt16(buffer, offset, littleEndian) {
  return littleEndian ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset);
}

function readUInt32(buffer, offset, littleEndian) {
  return littleEndian ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);
}

function readInt32(buffer, offset, littleEndian) {
  return littleEndian ? buffer.readInt32LE(offset) : buffer.readInt32BE(offset);
}

function findJpegExif(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;

  while (offset + 4 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];

    if (marker === 0xda || marker === 0xd9) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset + 2);
    const payloadOffset = offset + 4;
    const payloadLength = segmentLength - 2;

    if (marker === 0xe1) {
      const payload = buffer.subarray(payloadOffset, payloadOffset + payloadLength);

      if (payload.toString('ascii', 0, 6) === 'Exif\0\0') {
        return payload.subarray(6);
      }
    }

    offset += 2 + segmentLength;
  }

  return null;
}

function findWebpExif(buffer) {
  if (
    buffer.length < 12 ||
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    return null;
  }

  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString('ascii', offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const payloadOffset = offset + 8;
    const payload = buffer.subarray(payloadOffset, payloadOffset + chunkSize);

    if (chunkType === 'EXIF') {
      if (payload.toString('ascii', 0, 6) === 'Exif\0\0') {
        return payload.subarray(6);
      }

      return payload;
    }

    offset += 8 + chunkSize + (chunkSize % 2);
  }

  return null;
}

function getExifBuffer(buffer) {
  return findJpegExif(buffer) || findWebpExif(buffer);
}

function getValueBuffer(tiffBuffer, entryOffset, type, count, littleEndian) {
  const TYPE_LENGTHS = {
    1: 1,
    2: 1,
    3: 2,
    4: 4,
    5: 8,
    7: 1,
    9: 4,
    10: 8,
  };
  const valueLength = (TYPE_LENGTHS[type] || 1) * count;

  if (valueLength <= 4) {
    return tiffBuffer.subarray(entryOffset + 8, entryOffset + 8 + valueLength);
  }

  const valueOffset = readUInt32(tiffBuffer, entryOffset + 8, littleEndian);
  return tiffBuffer.subarray(valueOffset, valueOffset + valueLength);
}

function parseExifValue(tiffBuffer, entryOffset, littleEndian) {
  const type = readUInt16(tiffBuffer, entryOffset + 2, littleEndian);
  const count = readUInt32(tiffBuffer, entryOffset + 4, littleEndian);
  const valueBuffer = getValueBuffer(tiffBuffer, entryOffset, type, count, littleEndian);

  if (type === 2 || type === 7) {
    return cleanText(valueBuffer.toString('utf8'));
  }

  if (type === 3) {
    const values = [];

    for (let index = 0; index < count; index += 1) {
      values.push(readUInt16(valueBuffer, index * 2, littleEndian));
    }

    return count === 1 ? values[0] : values;
  }

  if (type === 4) {
    const values = [];

    for (let index = 0; index < count; index += 1) {
      values.push(readUInt32(valueBuffer, index * 4, littleEndian));
    }

    return count === 1 ? values[0] : values;
  }

  if (type === 5) {
    const values = [];

    for (let index = 0; index < count; index += 1) {
      const offset = index * 8;
      const numerator = readUInt32(valueBuffer, offset, littleEndian);
      const denominator = readUInt32(valueBuffer, offset + 4, littleEndian);
      values.push(denominator === 0 ? 0 : numerator / denominator);
    }

    return count === 1 ? values[0] : values;
  }

  if (type === 9) {
    const values = [];

    for (let index = 0; index < count; index += 1) {
      values.push(readInt32(valueBuffer, index * 4, littleEndian));
    }

    return count === 1 ? values[0] : values;
  }

  if (type === 10) {
    const values = [];

    for (let index = 0; index < count; index += 1) {
      const offset = index * 8;
      const numerator = readInt32(valueBuffer, offset, littleEndian);
      const denominator = readInt32(valueBuffer, offset + 4, littleEndian);
      values.push(denominator === 0 ? 0 : numerator / denominator);
    }

    return count === 1 ? values[0] : values;
  }

  return valueBuffer;
}

function readIfd(tiffBuffer, offset, littleEndian) {
  if (!Number.isFinite(offset) || offset <= 0 || offset + 2 > tiffBuffer.length) {
    return new Map();
  }

  const entries = new Map();
  const entryCount = readUInt16(tiffBuffer, offset, littleEndian);

  for (let index = 0; index < entryCount; index += 1) {
    const entryOffset = offset + 2 + index * 12;

    if (entryOffset + 12 > tiffBuffer.length) {
      break;
    }

    const tag = readUInt16(tiffBuffer, entryOffset, littleEndian);
    entries.set(tag, parseExifValue(tiffBuffer, entryOffset, littleEndian));
  }

  return entries;
}

function parseExif(tiffBuffer) {
  if (!tiffBuffer || tiffBuffer.length < 8) {
    return null;
  }

  const byteOrder = tiffBuffer.toString('ascii', 0, 2);
  const littleEndian = byteOrder === 'II';

  if (!littleEndian && byteOrder !== 'MM') {
    return null;
  }

  if (readUInt16(tiffBuffer, 2, littleEndian) !== 42) {
    return null;
  }

  const firstIfdOffset = readUInt32(tiffBuffer, 4, littleEndian);
  const mainIfd = readIfd(tiffBuffer, firstIfdOffset, littleEndian);
  const exifIfdOffset = mainIfd.get(34665);
  const exifIfd = readIfd(tiffBuffer, exifIfdOffset, littleEndian);

  return {
    make: cleanText(mainIfd.get(271)),
    model: cleanText(mainIfd.get(272)),
    dateTime: cleanText(mainIfd.get(306)),
    dateTimeOriginal: cleanText(exifIfd.get(36867)),
    lensModel: cleanText(exifIfd.get(42036)),
    lensMake: cleanText(exifIfd.get(42035)),
    lensSpecification: exifIfd.get(42034),
    exifWidth: exifIfd.get(40962),
    exifHeight: exifIfd.get(40963),
  };
}

function readUInt24LE(buffer, offset) {
  return buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16);
}

function getJpegSize(buffer) {
  let offset = 2;

  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    const isStartOfFrame =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      ![0xc4, 0xc8, 0xcc].includes(marker);

    if (isStartOfFrame) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += 2 + length;
  }

  return null;
}

function getPngSize(buffer) {
  if (buffer.toString('ascii', 1, 4) !== 'PNG') {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function getWebpSize(buffer) {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    return null;
  }

  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString('ascii', offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const payloadOffset = offset + 8;

    if (chunkType === 'VP8X') {
      return {
        width: readUInt24LE(buffer, payloadOffset + 4) + 1,
        height: readUInt24LE(buffer, payloadOffset + 7) + 1,
      };
    }

    if (chunkType === 'VP8 ' && buffer.toString('hex', payloadOffset + 3, payloadOffset + 6) === '9d012a') {
      return {
        width: buffer.readUInt16LE(payloadOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(payloadOffset + 8) & 0x3fff,
      };
    }

    if (chunkType === 'VP8L' && buffer[payloadOffset] === 0x2f) {
      const b1 = buffer[payloadOffset + 1];
      const b2 = buffer[payloadOffset + 2];
      const b3 = buffer[payloadOffset + 3];
      const b4 = buffer[payloadOffset + 4];

      return {
        width: 1 + (((b2 & 0x3f) << 8) | b1),
        height: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6)),
      };
    }

    offset += 8 + chunkSize + (chunkSize % 2);
  }

  return null;
}

function getImageSize(buffer, filePath, exifData) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === '.jpg' || extension === '.jpeg') {
    return getJpegSize(buffer);
  }

  if (extension === '.png') {
    return getPngSize(buffer);
  }

  if (extension === '.webp') {
    return getWebpSize(buffer);
  }

  if (exifData?.exifWidth && exifData?.exifHeight) {
    return { width: exifData.exifWidth, height: exifData.exifHeight };
  }

  return null;
}

function getOrientation(size) {
  if (!size) {
    return '';
  }

  if (size.width > size.height * 1.15) {
    return '横图';
  }

  if (size.height > size.width * 1.15) {
    return '竖图';
  }

  return '方图';
}

function formatExifDate(value) {
  const match = cleanText(value).match(/^(\d{4}):(\d{2}):(\d{2})/);

  if (!match) {
    return '';
  }

  return `${match[1]}-${match[2]}-${match[3]}`;
}

function formatCamera(make, model) {
  const cleanMake = cleanText(make);
  const cleanModel = cleanText(model);

  if (!cleanModel) {
    return cleanMake;
  }

  if (!cleanMake || cleanModel.toLowerCase().includes(cleanMake.toLowerCase().split(' ')[0])) {
    return cleanModel;
  }

  return `${cleanMake} ${cleanModel}`;
}

function formatLens(lensModel, lensSpecification) {
  const cleanLensModel = cleanText(lensModel);

  if (cleanLensModel) {
    return cleanLensModel;
  }

  if (Array.isArray(lensSpecification) && lensSpecification.length >= 4) {
    const [minFocal, maxFocal, minAperture, maxAperture] = lensSpecification;
    const focal =
      minFocal === maxFocal
        ? `${Math.round(minFocal)}mm`
        : `${Math.round(minFocal)}-${Math.round(maxFocal)}mm`;
    const aperture =
      minAperture === maxAperture
        ? `f/${Number(minAperture).toFixed(1).replace(/\.0$/, '')}`
        : `f/${Number(minAperture).toFixed(1).replace(/\.0$/, '')}-${Number(maxAperture).toFixed(1).replace(/\.0$/, '')}`;

    return `${focal} ${aperture}`;
  }

  return '';
}

function readPhotoMetadata(filePath) {
  const buffer = fs.readFileSync(filePath);
  const exifData = parseExif(getExifBuffer(buffer)) || {};
  const size = getImageSize(buffer, filePath, exifData);

  return {
    camera: formatCamera(exifData.make, exifData.model),
    lens: formatLens(exifData.lensModel, exifData.lensSpecification),
    date: formatExifDate(exifData.dateTimeOriginal || exifData.dateTime),
    orientation: getOrientation(size),
  };
}

function findEditablePhotosBounds(content) {
  const marker = 'const editablePhotos =';
  const markerIndex = content.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error('找不到 const editablePhotos =，无法安全更新照片数据。');
  }

  const openIndex = content.indexOf('[', markerIndex);

  if (openIndex < 0) {
    throw new Error('找不到 editablePhotos 的数组开始符号 [。');
  }

  const closeIndex = findMatchingBracket(content, openIndex, '[', ']');

  return { openIndex, closeIndex };
}

function findMatchingBracket(content, openIndex, openChar, closeChar) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let index = openIndex; index < content.length; index += 1) {
    const char = content[index];
    const nextChar = content[index + 1];

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (char === '*' && nextChar === '/') {
        inBlockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === '\\') {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '/' && nextChar === '/') {
      inLineComment = true;
      index += 1;
      continue;
    }

    if (char === '/' && nextChar === '*') {
      inBlockComment = true;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === openChar) {
      depth += 1;
      continue;
    }

    if (char === closeChar) {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  throw new Error(`找不到 ${openChar} 对应的 ${closeChar}。`);
}

function findPhotoObjects(content, bounds) {
  const objects = [];
  let quote = null;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;
  let depth = 0;
  let objectStart = -1;

  for (let index = bounds.openIndex + 1; index < bounds.closeIndex; index += 1) {
    const char = content[index];
    const nextChar = content[index + 1];

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (char === '*' && nextChar === '/') {
        inBlockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === '\\') {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '/' && nextChar === '/') {
      inLineComment = true;
      index += 1;
      continue;
    }

    if (char === '/' && nextChar === '*') {
      inBlockComment = true;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') {
      if (depth === 0) {
        objectStart = index;
      }

      depth += 1;
      continue;
    }

    if (char === '}') {
      depth -= 1;

      if (depth === 0 && objectStart >= 0) {
        objects.push({ start: objectStart, end: index + 1 });
        objectStart = -1;
      }
    }
  }

  return objects;
}

function getFieldValue(objectText, field) {
  const pattern = new RegExp(`\\b${field}\\s*:\\s*(["'\`])([\\s\\S]*?)\\1`);
  const match = objectText.match(pattern);

  return match ? match[2] : '';
}

function shouldFillField(field, currentValue, nextValue) {
  const current = cleanText(currentValue);
  const next = cleanText(nextValue);

  if (!next) {
    return false;
  }

  if (BASIC_PLACEHOLDERS.has(current)) {
    return true;
  }

  if (field === 'camera' && GENERIC_CAMERA_PLACEHOLDERS.has(current.toLowerCase())) {
    return next.toLowerCase() !== current.toLowerCase();
  }

  return false;
}

function makeJsString(value) {
  return JSON.stringify(cleanText(value));
}

function setFieldValue(objectText, field, value) {
  const pattern = new RegExp(`(\\b${field}\\s*:\\s*)(["'\`])([\\s\\S]*?)(\\2)`);

  if (pattern.test(objectText)) {
    return objectText.replace(pattern, `$1${makeJsString(value)}`);
  }

  const srcPattern = /(\bsrc\s*:\s*["'`][^"'`]+["'`],?)/;

  if (srcPattern.test(objectText)) {
    return objectText.replace(srcPattern, `$1\n    ${field}: ${makeJsString(value)},`);
  }

  return objectText.replace(/}$/, `  ${field}: ${makeJsString(value)},\n}`);
}

function getLocalPathFromSrc(src) {
  if (!src.startsWith('/')) {
    return path.join(projectRoot, src);
  }

  return path.join(publicDir, src.replace(/^\//, ''));
}

function updateObjectFromExif(objectText, stats) {
  const src = getFieldValue(objectText, 'src');

  if (!src) {
    return objectText;
  }

  const localPath = getLocalPathFromSrc(src);

  if (!fs.existsSync(localPath)) {
    stats.missingFiles.push(src);
    return objectText;
  }

  let metadata;

  try {
    metadata = readPhotoMetadata(localPath);
  } catch (error) {
    stats.failedFiles.push(`${src}: ${error.message}`);
    return objectText;
  }

  let nextObjectText = objectText;

  for (const field of FILLABLE_FIELDS) {
    const currentValue = getFieldValue(nextObjectText, field);
    const nextValue = metadata[field];

    if (shouldFillField(field, currentValue, nextValue)) {
      nextObjectText = setFieldValue(nextObjectText, field, nextValue);
      stats.updated.push({ src, field, from: cleanText(currentValue), to: cleanText(nextValue) });
    }
  }

  return nextObjectText;
}

const originalContent = fs.readFileSync(photosFile, 'utf8');
const bounds = findEditablePhotosBounds(originalContent);
const objects = findPhotoObjects(originalContent, bounds);
const stats = {
  updated: [],
  missingFiles: [],
  failedFiles: [],
};
let nextContent = '';
let lastIndex = 0;

for (const objectRange of objects) {
  nextContent += originalContent.slice(lastIndex, objectRange.start);

  const objectText = originalContent.slice(objectRange.start, objectRange.end);
  nextContent += updateObjectFromExif(objectText, stats);
  lastIndex = objectRange.end;
}

nextContent += originalContent.slice(lastIndex);

if (isDryRun) {
  console.log(`Found ${objects.length} photo objects.`);
  console.log(`Would update ${stats.updated.length} fields.`);

  for (const change of stats.updated.slice(0, 80)) {
    console.log(`+ ${change.src} | ${change.field}: ${change.from || '空'} -> ${change.to}`);
  }

  if (stats.updated.length > 80) {
    console.log(`...and ${stats.updated.length - 80} more changes.`);
  }

  if (stats.missingFiles.length > 0) {
    console.log(`Missing files: ${stats.missingFiles.length}`);
  }

  if (stats.failedFiles.length > 0) {
    console.log(`Failed files: ${stats.failedFiles.length}`);
    for (const failure of stats.failedFiles.slice(0, 20)) {
      console.log(`! ${failure}`);
    }
  }

  process.exit(0);
}

if (stats.updated.length === 0) {
  console.log('No empty EXIF fields found. photos.js was not changed.');
  process.exit(0);
}

fs.writeFileSync(photosFile, nextContent, 'utf8');

console.log(`Updated ${stats.updated.length} fields in ${normalizePath(path.relative(projectRoot, photosFile))}.`);

if (stats.missingFiles.length > 0) {
  console.log(`Skipped ${stats.missingFiles.length} entries with missing image files.`);
}

if (stats.failedFiles.length > 0) {
  console.log(`Skipped ${stats.failedFiles.length} entries whose EXIF could not be read.`);
}
