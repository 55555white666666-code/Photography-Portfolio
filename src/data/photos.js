// 这里是整个网站的照片数据中心。
// 以后新增照片时，只需要做三件事：
// 1. 把图片文件放到 public/images/
// 2. 复制下面 photos 数组里的一条数据
// 3. 修改字段内容，让它对应你的新照片

// 分类中文名只负责页面展示。
// 每张照片真正使用的是短分类 id，例如 "astro"、"landscape"。
export const categoryLabels = {
  astro: '星空摄影',
  landscape: '风光摄影',
  portrait: '人像摄影',
  travel: '旅行记录',
  street: '城市街拍',
  event: '活动记录',
};

// 默认分类顺序在这里调整。
// 你目前还没有星空摄影作品，所以先把 astro 放在最后。
const defaultCategoryOrder = ['landscape', 'portrait', 'travel', 'street', 'event', 'astro'];

export const photos = [
  {
    id: 'landscape-01',
    title: '清晨山谷',
    category: 'landscape',
    src: '/images/landscape-01.jpg',
    alt: '晨雾中的层叠山脉与山谷风光摄影作品',
    location: 'Yunnan',
    date: '2026-03',
    camera: 'Sony A7 IV',
    lens: '24-70mm F2.8',
    description: '用柔和的清晨光线记录山谷的层次，画面重点放在雾气和远山之间的距离感。',
    featured: true,
    orientation: '横图',
    tags: ['风光', '山谷', '晨雾'],
  },
  {
    id: 'portrait-01',
    title: '窗边侧影',
    category: 'portrait',
    src: '/images/portrait-01.jpg',
    alt: '自然窗光下的人像侧影摄影作品',
    location: 'Shanghai',
    date: '2026-02',
    camera: 'Canon EOS R6',
    lens: '50mm F1.8',
    description: '一次自然光人像练习，使用侧影和留白弱化人物身份，突出安静的情绪。',
    featured: true,
    orientation: '竖图',
    tags: ['人像', '自然光', '侧影'],
  },
  {
    id: 'travel-01',
    title: '海岸公路',
    category: 'travel',
    src: '/images/travel-01.jpg',
    alt: '海边公路与远处云层构成的旅行摄影作品',
    location: 'Fujian',
    date: '2025-11',
    camera: 'Fujifilm X-T5',
    lens: '18-55mm F2.8-4',
    description: '旅行途中遇到的一段海岸线，画面用道路的延伸感表达出发和停留之间的状态。',
    featured: true,
    orientation: '横图',
    tags: ['旅行', '海岸', '公路'],
  },
  {
    id: 'street-01',
    title: '雨后路口',
    category: 'street',
    src: '/images/street-01.jpg',
    alt: '雨后城市街道路口与灯光倒影的街拍作品',
    location: 'Hangzhou',
    date: '2025-10',
    camera: 'Fujifilm X100V',
    lens: '23mm F2',
    description: '雨后的城市路口让光线变得更柔软，地面反光为普通街景增加了电影感。',
    featured: true,
    orientation: '竖图',
    tags: ['街拍', '雨后', '城市'],
  },
  {
    id: 'travel-02',
    title: '暗房笔记',
    category: 'travel',
    src: '/images/travel-02.jpg',
    alt: '相机与笔记本构成的静物细节摄影作品',
    location: 'Studio',
    date: '2025-09',
    camera: 'Sony A7 IV',
    lens: '35mm F1.4',
    description: '一张关于拍摄准备的细节照片，用低调光线呈现摄影工具和记录习惯。',
    featured: false,
    orientation: '方图',
    tags: ['静物', '器材', '记录'],
  },
  {
    id: 'event-01',
    title: '活动现场',
    category: 'event',
    src: '/images/event-01.jpg',
    alt: '活动现场中的人物、灯光与空间记录摄影作品',
    location: 'Campus',
    date: '2025-12',
    camera: 'Sony A7 IV',
    lens: '24-70mm F2.8',
    description: '一张用于活动记录分类的示例作品，适合展示课程活动、社团现场或项目记录。',
    featured: false,
    orientation: '横图',
    tags: ['活动', '纪实', '现场'],
  },
  {
    id: 'activity-0987',
    title: '活动记录 01',
    category: 'event',
    src: '/images/activity-log-web/DSC_0987.webp',
    alt: '季宏宇拍摄的活动现场记录照片',
    location: '学校',
    date: '2026-06',
    camera: 'Nikon',
    lens: '未知镜头',
    description: '活动现场记录作品。',
    featured: false,
    orientation: '横图',
    tags: ['活动', '纪实', '现场'],
  },
];

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

// 分类按钮会根据照片数据自动生成。
// 如果你新增了第一个属于某个新分类的照片，页面上会自动出现新的分类按钮。
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
