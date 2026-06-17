import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const imagesDir = path.join(projectRoot, 'public', 'images');
const outputFile = path.join(projectRoot, 'src', 'data', 'photos.js');
const isDryRun = process.argv.includes('--dry-run');

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const skippedImageFiles = new Set(
  [
    'astro-milky-way.png',
    'city-rain-crossing.png',
    'event-01.jpg',
    'hero.png',
    'landscape-01.jpg',
    'landscape-morning-ridge.png',
    'landscape-mountain-mist.png',
    'portrait-01.jpg',
    'portrait-window-light.png',
    'portrait-window-silhouette.png',
    'quiet-camera-detail.png',
    'star-01.jpg',
    'street-01.jpg',
    'street-evening-crossing.png',
    'travel-01.jpg',
    'travel-02.jpg',
    'travel-coastal-road.png',
  ].map(normalizePath),
);

function normalizePath(filePath) {
  return filePath.replaceAll('\\', '/');
}

function walkImages(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return walkImages(entryPath);
      }

      if (!entry.isFile() || !imageExtensions.has(path.extname(entry.name).toLowerCase())) {
        return [];
      }

      return [entryPath];
    });
}

function readUInt24LE(buffer, offset) {
  return buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16);
}

function getJpegSize(buffer) {
  let offset = 2;

  while (offset < buffer.length) {
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

function getImageSize(filePath) {
  const buffer = fs.readFileSync(filePath);
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

  return null;
}

function getOrientation(filePath) {
  const size = getImageSize(filePath);

  if (!size) {
    return '横图';
  }

  if (size.width > size.height * 1.15) {
    return '横图';
  }

  if (size.height > size.width * 1.15) {
    return '竖图';
  }

  return '方图';
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inferCategory(relativePath) {
  const lowerPath = relativePath.toLowerCase();

  if (lowerPath.includes('activity') || lowerPath.includes('event')) {
    return 'event';
  }

  if (lowerPath.includes('portrait')) {
    return 'portrait';
  }

  if (lowerPath.includes('street') || lowerPath.includes('city')) {
    return 'street';
  }

  if (lowerPath.includes('travel')) {
    return 'travel';
  }

  if (lowerPath.includes('star') || lowerPath.includes('astro')) {
    return 'astro';
  }

  if (lowerPath.includes('nature') || lowerPath.includes('natural') || lowerPath.includes('ziran')) {
    return 'nature';
  }

  if (lowerPath.includes('landscape')) {
    return 'landscape';
  }

  return 'event';
}

function makePhoto(relativePath, index, featuredLimit) {
  const normalizedRelativePath = normalizePath(relativePath);
  const category = inferCategory(normalizedRelativePath);
  const baseName = path.basename(normalizedRelativePath, path.extname(normalizedRelativePath));
  const folderName = normalizePath(path.dirname(normalizedRelativePath));
  const inActivityFolder = folderName.includes('activity');
  const idPrefix = inActivityFolder ? 'activity' : 'photo';
  const displayNumber = String(index + 1).padStart(3, '0');

  return {
    id: `${idPrefix}-${slugify(baseName)}`,
    title: inActivityFolder ? `活动记录 ${displayNumber}` : `待整理作品 ${displayNumber}`,
    category,
    src: `/images/${normalizedRelativePath}`,
    visible: false,
    alt: `季宏宇拍摄的${category === 'event' ? '活动记录' : '摄影'}作品`,
    location: inActivityFolder ? '学校' : '未填写',
    date: inActivityFolder ? '2026-06' : '未填写',
    camera: '未填写',
    lens: '未填写',
    description: inActivityFolder ? '活动现场记录作品。' : '这张作品的信息还没有完善，可以在 photos.js 中修改标题、地点、时间和简介。',
    featured: index < featuredLimit,
    orientation: getOrientation(path.join(imagesDir, relativePath)),
    tags: inActivityFolder ? ['活动', '纪实', '现场'] : ['待整理'],
  };
}

function formatValue(value) {
  return JSON.stringify(value, null, 2)
    .replaceAll('\n', '\n  ')
    .replace(/"([^"]+)":/g, '$1:');
}

function formatPhoto(photo) {
  return `  ${formatValue(photo)},`;
}

function getSourceKeyFromSrc(src) {
  return normalizePath(src)
    .replace(/^\/images\//, '')
    .replace(/\.[^.]+$/, '')
    .toLowerCase();
}

function getExistingSourceKeys(content) {
  const srcPattern = /\bsrc\s*:\s*(['"`])([^'"`]+)\1/g;
  const sourceKeys = new Set();
  let match = srcPattern.exec(content);

  while (match) {
    const src = match[2].trim();

    if (src) {
      sourceKeys.add(getSourceKeyFromSrc(src));
    }

    match = srcPattern.exec(content);
  }

  return sourceKeys;
}

function findEditablePhotosArrayEnd(content) {
  const marker = 'const editablePhotos =';
  const markerIndex = content.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error('找不到 const editablePhotos =，无法安全追加照片数据。');
  }

  const openIndex = content.indexOf('[', markerIndex);

  if (openIndex < 0) {
    throw new Error('找不到 editablePhotos 的数组开始符号 [。');
  }

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

    if (char === '[') {
      depth += 1;
      continue;
    }

    if (char === ']') {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  throw new Error('找不到 editablePhotos 的数组结束符号 ]。');
}

function appendPhotosToExistingFile(content, newPhotos) {
  const insertionIndex = findEditablePhotosArrayEnd(content);
  const beforeArrayEnd = content.slice(0, insertionIndex);
  const afterArrayEnd = content.slice(insertionIndex);
  const trimmedBefore = beforeArrayEnd.replace(/\s+$/, '');
  const needsComma = !trimmedBefore.endsWith('[') && !trimmedBefore.endsWith(',');
  const comma = needsComma ? ',' : '';
  const insertion = `${comma}\n${newPhotos.map(formatPhoto).join('\n')}\n`;

  return `${trimmedBefore}${insertion}${afterArrayEnd}`;
}

function buildPhotosFile(generatedPhotos) {
  return `// 这里是整个网站的照片数据中心。
// 你可以直接修改 editablePhotos 里的 visible、title、category、location、date 等信息。
// 如果以后又放入了很多新照片，可以运行 npm run photos:scan 追加新照片数据。
// 想先预览会追加几张，可以运行 npm run photos:scan -- --dry-run。
//
// 新增一张照片的流程：
// 1. 把图片放到 public/images/ 或 public/images/某个文件夹/
// 2. 运行 npm run photos:scan 自动追加新照片基础数据，或手动复制 editablePhotos 里的一条数据
// 3. 修改 title、category、src、location 等文字
//
// 容易写错的地方：
// - 图片路径字段必须叫 src，不要写成 image
// - visible 写 true 才会显示；写 false 会隐藏
// - 时间字段必须叫 date，不要写成 year
// - tags 必须是数组，例如 ['活动', '纪实']；没有标签就写 []
// - 每一行字段后面基本都要有英文逗号

export const categoryLabels = {
  astro: '星空摄影',
  landscape: '风光摄影',
  nature: '自然摄影',
  portrait: '人像摄影',
  travel: '旅行记录',
  street: '城市街拍',
  event: '活动记录',
};

// 分类按钮的默认顺序在这里调整。
// 目前星空摄影先放最后，之后有正式作品时可以把 astro 移到前面。
const defaultCategoryOrder = ['landscape', 'nature', 'portrait', 'travel', 'street', 'event', 'astro'];

const photoDefaults = {
  title: '未命名作品',
  category: 'event',
  src: '',
  visible: false,
  alt: '季宏宇摄影作品',
  location: '未填写',
  date: '未填写',
  camera: '未填写',
  lens: '未填写',
  description: '',
  featured: false,
  orientation: '横图',
  tags: [],
  hidden: false,
};

// 这些是之前用于搭页面的示例作品，已经隐藏，不会显示在网站上。
const hiddenExamplePhotos = [
  { id: 'example-landscape-01', title: '示例风光作品', category: 'landscape', src: '', hidden: true },
  { id: 'example-portrait-01', title: '示例人像作品', category: 'portrait', src: '', hidden: true },
  { id: 'example-travel-01', title: '示例旅行作品', category: 'travel', src: '', hidden: true },
  { id: 'example-street-01', title: '示例街拍作品', category: 'street', src: '', hidden: true },
  { id: 'example-travel-02', title: '示例静物作品', category: 'travel', src: '', hidden: true },
  { id: 'example-event-01', title: '示例活动作品', category: 'event', src: '', hidden: true },
];

// 只改这里：照片数据表。
// category 可选：landscape / nature / portrait / travel / street / event / astro
// orientation 可选：横图 / 竖图 / 方图
// visible 写 true 才会在网站显示；写 false 会隐藏。
// featured 写 true 会进入精选作品区；写 false 只在分类作品区显示。
const editablePhotos = [
  ...hiddenExamplePhotos,
${generatedPhotos.map(formatPhoto).join('\n')}
];

function normalizePhoto(photo, index) {
  const normalizedPhoto = {
    ...photoDefaults,
    id: \`photo-\${index + 1}\`,
    ...photo,
  };

  return {
    ...normalizedPhoto,
    tags: Array.isArray(normalizedPhoto.tags) ? normalizedPhoto.tags : [],
  };
}

// 页面实际读取的是 photos。
// 如果某条数据漏写 src，visible 不是 true，或 hidden 写成 true，会被自动跳过。
export const photos = editablePhotos
  .map(normalizePhoto)
  .filter((photo) => photo.src && !photo.hidden && photo.visible === true);

export function getCategoryLabel(category) {
  return categoryLabels[category] || category;
}

export function sortPhotosByFeatured(photoList) {
  return [...photoList].sort((firstPhoto, secondPhoto) => {
    if (firstPhoto.featured === secondPhoto.featured) {
      return 0;
    }

    return firstPhoto.featured ? -1 : 1;
  });
}

export function getPhotosByCategory(category) {
  if (category === 'all') {
    return sortPhotosByFeatured(photos);
  }

  if (category === 'featured') {
    return photos.filter((photo) => photo.featured);
  }

  return sortPhotosByFeatured(
    photos.filter((photo) => photo.category === category),
  );
}

const categoriesFromPhotos = [...new Set(photos.map((photo) => photo.category))];
const plannedCategories = Object.keys(categoryLabels);
const knownCategories = [...new Set([...plannedCategories, ...categoriesFromPhotos])];
const orderedCategories = defaultCategoryOrder.filter((category) =>
  knownCategories.includes(category),
);
const unorderedCategories = knownCategories.filter(
  (category) => !orderedCategories.includes(category) && category !== 'astro',
);
const tailCategories = orderedCategories.filter((category) => category === 'astro');
const mainCategories = orderedCategories.filter((category) => category !== 'astro');

export const categories = [
  { id: 'all', label: '全部作品' },
  { id: 'featured', label: '精选作品' },
  ...mainCategories.map((category) => ({
    id: category,
    label: getCategoryLabel(category),
  })),
  ...unorderedCategories.map((category) => ({
    id: category,
    label: getCategoryLabel(category),
  })),
  ...tailCategories.map((category) => ({
    id: category,
    label: getCategoryLabel(category),
  })),
];
`;
}

const allRelativeImagePaths = walkImages(imagesDir)
  .map((filePath) => normalizePath(path.relative(imagesDir, filePath)))
  .filter((relativePath) => !skippedImageFiles.has(relativePath))
  .sort((firstPath, secondPath) => firstPath.localeCompare(secondPath, 'en'));

const webpSourceKeys = new Set(
  allRelativeImagePaths
    .filter((relativePath) => path.extname(relativePath).toLowerCase() === '.webp')
    .map((relativePath) => relativePath.replace(/\.[^.]+$/, '').toLowerCase()),
);

const relativeImagePaths = allRelativeImagePaths.filter((relativePath) => {
  const extension = path.extname(relativePath).toLowerCase();
  const sourceKey = relativePath.replace(/\.[^.]+$/, '').toLowerCase();

  return extension === '.webp' || !webpSourceKeys.has(sourceKey);
});

const hasExistingPhotosFile = fs.existsSync(outputFile);
const existingContent = hasExistingPhotosFile
  ? fs.readFileSync(outputFile, 'utf8')
  : '';
const existingSourceKeys = hasExistingPhotosFile
  ? getExistingSourceKeys(existingContent)
  : new Set();
const newRelativeImagePaths = relativeImagePaths.filter(
  (relativePath) => !existingSourceKeys.has(getSourceKeyFromSrc(`/images/${relativePath}`)),
);
const featuredLimit = hasExistingPhotosFile ? 0 : Math.min(6, newRelativeImagePaths.length);
const generatedPhotos = newRelativeImagePaths.map((relativePath, index) =>
  makePhoto(relativePath, index, featuredLimit),
);

if (isDryRun) {
  console.log(`Found ${relativeImagePaths.length} scanned photos.`);
  console.log(`Found ${existingSourceKeys.size} existing photo src entries in ${normalizePath(path.relative(projectRoot, outputFile))}.`);
  console.log(`Would append ${generatedPhotos.length} new photos.`);

  if (generatedPhotos.length > 0) {
    for (const photo of generatedPhotos) {
      console.log(`+ ${photo.src}`);
    }
  }

  process.exit(0);
}

if (hasExistingPhotosFile) {
  if (generatedPhotos.length === 0) {
    console.log('No new photos found. photos.js was not changed.');
    process.exit(0);
  }

  fs.writeFileSync(outputFile, appendPhotosToExistingFile(existingContent, generatedPhotos), 'utf8');
  console.log(`Appended ${generatedPhotos.length} new photos to ${normalizePath(path.relative(projectRoot, outputFile))}`);
  process.exit(0);
}

fs.writeFileSync(outputFile, buildPhotosFile(generatedPhotos), 'utf8');
console.log(`Generated ${generatedPhotos.length} photos in ${normalizePath(path.relative(projectRoot, outputFile))}`);
