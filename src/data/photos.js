// 这里是整个网站的照片数据中心。
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
  {
    id: "activity-dsc-0987",
    title: "活动记录 001",
    category: "event",
    src: "/images/activity-log-web/DSC_0987.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: true,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-0989",
    title: "活动记录 002",
    category: "event",
    src: "/images/activity-log-web/DSC_0989.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: true,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-0993",
    title: "活动记录 003",
    category: "event",
    src: "/images/activity-log-web/DSC_0993.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: true,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-0994",
    title: "活动记录 004",
    category: "event",
    src: "/images/activity-log-web/DSC_0994.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: true,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-0998",
    title: "活动记录 005",
    category: "event",
    src: "/images/activity-log-web/DSC_0998.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: true,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1002",
    title: "活动记录 006",
    category: "event",
    src: "/images/activity-log-web/DSC_1002.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: true,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1005",
    title: "活动记录 007",
    category: "event",
    src: "/images/activity-log-web/DSC_1005.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1006",
    title: "活动记录 008",
    category: "event",
    src: "/images/activity-log-web/DSC_1006.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1008",
    title: "活动记录 009",
    category: "event",
    src: "/images/activity-log-web/DSC_1008.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1014",
    title: "活动记录 010",
    category: "event",
    src: "/images/activity-log-web/DSC_1014.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1015",
    title: "活动记录 011",
    category: "event",
    src: "/images/activity-log-web/DSC_1015.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1019",
    title: "活动记录 012",
    category: "event",
    src: "/images/activity-log-web/DSC_1019.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1025",
    title: "活动记录 013",
    category: "event",
    src: "/images/activity-log-web/DSC_1025.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1026",
    title: "活动记录 014",
    category: "event",
    src: "/images/activity-log-web/DSC_1026.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1028",
    title: "活动记录 015",
    category: "event",
    src: "/images/activity-log-web/DSC_1028.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1033",
    title: "活动记录 016",
    category: "event",
    src: "/images/activity-log-web/DSC_1033.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1037",
    title: "活动记录 017",
    category: "event",
    src: "/images/activity-log-web/DSC_1037.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1041",
    title: "活动记录 018",
    category: "event",
    src: "/images/activity-log-web/DSC_1041.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1046",
    title: "活动记录 019",
    category: "event",
    src: "/images/activity-log-web/DSC_1046.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1052",
    title: "活动记录 020",
    category: "event",
    src: "/images/activity-log-web/DSC_1052.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1053",
    title: "活动记录 021",
    category: "event",
    src: "/images/activity-log-web/DSC_1053.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1058",
    title: "活动记录 022",
    category: "event",
    src: "/images/activity-log-web/DSC_1058.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1059",
    title: "活动记录 023",
    category: "event",
    src: "/images/activity-log-web/DSC_1059.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1064",
    title: "活动记录 024",
    category: "event",
    src: "/images/activity-log-web/DSC_1064.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1069",
    title: "活动记录 025",
    category: "event",
    src: "/images/activity-log-web/DSC_1069.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1070",
    title: "活动记录 026",
    category: "event",
    src: "/images/activity-log-web/DSC_1070.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1073",
    title: "活动记录 027",
    category: "event",
    src: "/images/activity-log-web/DSC_1073.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1076",
    title: "活动记录 028",
    category: "event",
    src: "/images/activity-log-web/DSC_1076.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1078",
    title: "活动记录 029",
    category: "event",
    src: "/images/activity-log-web/DSC_1078.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1082",
    title: "活动记录 030",
    category: "event",
    src: "/images/activity-log-web/DSC_1082.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1083",
    title: "活动记录 031",
    category: "event",
    src: "/images/activity-log-web/DSC_1083.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1084",
    title: "活动记录 032",
    category: "event",
    src: "/images/activity-log-web/DSC_1084.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1086",
    title: "活动记录 033",
    category: "event",
    src: "/images/activity-log-web/DSC_1086.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1088",
    title: "活动记录 034",
    category: "event",
    src: "/images/activity-log-web/DSC_1088.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1089",
    title: "活动记录 035",
    category: "event",
    src: "/images/activity-log-web/DSC_1089.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1090",
    title: "活动记录 036",
    category: "event",
    src: "/images/activity-log-web/DSC_1090.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1091",
    title: "活动记录 037",
    category: "event",
    src: "/images/activity-log-web/DSC_1091.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1093",
    title: "活动记录 038",
    category: "event",
    src: "/images/activity-log-web/DSC_1093.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1094-1",
    title: "活动记录 039",
    category: "event",
    src: "/images/activity-log-web/DSC_1094_1.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1095",
    title: "活动记录 040",
    category: "event",
    src: "/images/activity-log-web/DSC_1095.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1102",
    title: "活动记录 041",
    category: "event",
    src: "/images/activity-log-web/DSC_1102.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "竖图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1104",
    title: "活动记录 042",
    category: "event",
    src: "/images/activity-log-web/DSC_1104.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1105",
    title: "活动记录 043",
    category: "event",
    src: "/images/activity-log-web/DSC_1105.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1106",
    title: "活动记录 044",
    category: "event",
    src: "/images/activity-log-web/DSC_1106.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1110",
    title: "活动记录 045",
    category: "event",
    src: "/images/activity-log-web/DSC_1110.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1111",
    title: "活动记录 046",
    category: "event",
    src: "/images/activity-log-web/DSC_1111.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1112",
    title: "活动记录 047",
    category: "event",
    src: "/images/activity-log-web/DSC_1112.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1113",
    title: "活动记录 048",
    category: "event",
    src: "/images/activity-log-web/DSC_1113.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1115",
    title: "活动记录 049",
    category: "event",
    src: "/images/activity-log-web/DSC_1115.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1116",
    title: "活动记录 050",
    category: "event",
    src: "/images/activity-log-web/DSC_1116.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1119",
    title: "活动记录 051",
    category: "event",
    src: "/images/activity-log-web/DSC_1119.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1121",
    title: "活动记录 052",
    category: "event",
    src: "/images/activity-log-web/DSC_1121.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1125",
    title: "活动记录 053",
    category: "event",
    src: "/images/activity-log-web/DSC_1125.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1126",
    title: "活动记录 054",
    category: "event",
    src: "/images/activity-log-web/DSC_1126.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1128",
    title: "活动记录 055",
    category: "event",
    src: "/images/activity-log-web/DSC_1128.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "方图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1131",
    title: "活动记录 056",
    category: "event",
    src: "/images/activity-log-web/DSC_1131.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "方图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1134",
    title: "活动记录 057",
    category: "event",
    src: "/images/activity-log-web/DSC_1134.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1135",
    title: "活动记录 058",
    category: "event",
    src: "/images/activity-log-web/DSC_1135.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1138",
    title: "活动记录 059",
    category: "event",
    src: "/images/activity-log-web/DSC_1138.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1142",
    title: "活动记录 060",
    category: "event",
    src: "/images/activity-log-web/DSC_1142.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1143",
    title: "活动记录 061",
    category: "event",
    src: "/images/activity-log-web/DSC_1143.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "竖图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1144",
    title: "活动记录 062",
    category: "event",
    src: "/images/activity-log-web/DSC_1144.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "竖图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1148",
    title: "活动记录 063",
    category: "event",
    src: "/images/activity-log-web/DSC_1148.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "方图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1152",
    title: "活动记录 064",
    category: "event",
    src: "/images/activity-log-web/DSC_1152.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "竖图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1158",
    title: "活动记录 065",
    category: "event",
    src: "/images/activity-log-web/DSC_1158.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "竖图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1161",
    title: "活动记录 066",
    category: "event",
    src: "/images/activity-log-web/DSC_1161.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1163",
    title: "活动记录 067",
    category: "event",
    src: "/images/activity-log-web/DSC_1163.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "竖图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1164",
    title: "活动记录 068",
    category: "event",
    src: "/images/activity-log-web/DSC_1164.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "方图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1169",
    title: "活动记录 069",
    category: "event",
    src: "/images/activity-log-web/DSC_1169.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "方图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1170",
    title: "活动记录 070",
    category: "event",
    src: "/images/activity-log-web/DSC_1170.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "方图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1177",
    title: "活动记录 071",
    category: "event",
    src: "/images/activity-log-web/DSC_1177.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1178",
    title: "活动记录 072",
    category: "event",
    src: "/images/activity-log-web/DSC_1178.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1184",
    title: "活动记录 073",
    category: "event",
    src: "/images/activity-log-web/DSC_1184.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1189",
    title: "活动记录 074",
    category: "event",
    src: "/images/activity-log-web/DSC_1189.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1193",
    title: "活动记录 075",
    category: "event",
    src: "/images/activity-log-web/DSC_1193.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1200",
    title: "活动记录 076",
    category: "event",
    src: "/images/activity-log-web/DSC_1200.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1204",
    title: "活动记录 077",
    category: "event",
    src: "/images/activity-log-web/DSC_1204.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1206",
    title: "活动记录 078",
    category: "event",
    src: "/images/activity-log-web/DSC_1206.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1210",
    title: "活动记录 079",
    category: "event",
    src: "/images/activity-log-web/DSC_1210.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1214",
    title: "活动记录 080",
    category: "event",
    src: "/images/activity-log-web/DSC_1214.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1226",
    title: "活动记录 081",
    category: "event",
    src: "/images/activity-log-web/DSC_1226.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1227",
    title: "活动记录 082",
    category: "event",
    src: "/images/activity-log-web/DSC_1227.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1230",
    title: "活动记录 083",
    category: "event",
    src: "/images/activity-log-web/DSC_1230.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1231",
    title: "活动记录 084",
    category: "event",
    src: "/images/activity-log-web/DSC_1231.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1235",
    title: "活动记录 085",
    category: "event",
    src: "/images/activity-log-web/DSC_1235.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1248",
    title: "活动记录 086",
    category: "event",
    src: "/images/activity-log-web/DSC_1248.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1250",
    title: "活动记录 087",
    category: "event",
    src: "/images/activity-log-web/DSC_1250.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1251",
    title: "活动记录 088",
    category: "event",
    src: "/images/activity-log-web/DSC_1251.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1252",
    title: "活动记录 089",
    category: "event",
    src: "/images/activity-log-web/DSC_1252.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1253",
    title: "活动记录 090",
    category: "event",
    src: "/images/activity-log-web/DSC_1253.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1255",
    title: "活动记录 091",
    category: "event",
    src: "/images/activity-log-web/DSC_1255.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1261",
    title: "活动记录 092",
    category: "event",
    src: "/images/activity-log-web/DSC_1261.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1265",
    title: "活动记录 093",
    category: "event",
    src: "/images/activity-log-web/DSC_1265.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1267",
    title: "活动记录 094",
    category: "event",
    src: "/images/activity-log-web/DSC_1267.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1283",
    title: "活动记录 095",
    category: "event",
    src: "/images/activity-log-web/DSC_1283.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1284",
    title: "活动记录 096",
    category: "event",
    src: "/images/activity-log-web/DSC_1284.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1286",
    title: "活动记录 097",
    category: "event",
    src: "/images/activity-log-web/DSC_1286.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1289",
    title: "活动记录 098",
    category: "event",
    src: "/images/activity-log-web/DSC_1289.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1291",
    title: "活动记录 099",
    category: "event",
    src: "/images/activity-log-web/DSC_1291.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1292",
    title: "活动记录 100",
    category: "event",
    src: "/images/activity-log-web/DSC_1292.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1293",
    title: "活动记录 101",
    category: "event",
    src: "/images/activity-log-web/DSC_1293.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1297",
    title: "活动记录 102",
    category: "event",
    src: "/images/activity-log-web/DSC_1297.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1300",
    title: "活动记录 103",
    category: "event",
    src: "/images/activity-log-web/DSC_1300.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1316",
    title: "活动记录 104",
    category: "event",
    src: "/images/activity-log-web/DSC_1316.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1317",
    title: "活动记录 105",
    category: "event",
    src: "/images/activity-log-web/DSC_1317.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1318",
    title: "活动记录 106",
    category: "event",
    src: "/images/activity-log-web/DSC_1318.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1319",
    title: "活动记录 107",
    category: "event",
    src: "/images/activity-log-web/DSC_1319.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1320",
    title: "活动记录 108",
    category: "event",
    src: "/images/activity-log-web/DSC_1320.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1380",
    title: "活动记录 109",
    category: "event",
    src: "/images/activity-log-web/DSC_1380.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1382",
    title: "活动记录 110",
    category: "event",
    src: "/images/activity-log-web/DSC_1382.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1415",
    title: "活动记录 111",
    category: "event",
    src: "/images/activity-log-web/DSC_1415.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1418",
    title: "活动记录 112",
    category: "event",
    src: "/images/activity-log-web/DSC_1418.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1422",
    title: "活动记录 113",
    category: "event",
    src: "/images/activity-log-web/DSC_1422.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1436",
    title: "活动记录 114",
    category: "event",
    src: "/images/activity-log-web/DSC_1436.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1438",
    title: "活动记录 115",
    category: "event",
    src: "/images/activity-log-web/DSC_1438.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1441",
    title: "活动记录 116",
    category: "event",
    src: "/images/activity-log-web/DSC_1441.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "竖图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1452",
    title: "活动记录 117",
    category: "event",
    src: "/images/activity-log-web/DSC_1452.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1453",
    title: "活动记录 118",
    category: "event",
    src: "/images/activity-log-web/DSC_1453.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "竖图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1464",
    title: "活动记录 119",
    category: "event",
    src: "/images/activity-log-web/DSC_1464.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1476",
    title: "活动记录 120",
    category: "event",
    src: "/images/activity-log-web/DSC_1476.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1483",
    title: "活动记录 121",
    category: "event",
    src: "/images/activity-log-web/DSC_1483.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1490",
    title: "活动记录 122",
    category: "event",
    src: "/images/activity-log-web/DSC_1490.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1502",
    title: "活动记录 123",
    category: "event",
    src: "/images/activity-log-web/DSC_1502.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "横图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "activity-dsc-1536",
    title: "活动记录 124",
    category: "event",
    src: "/images/activity-log-web/DSC_1536.webp",
    visible: false,
    alt: "季宏宇拍摄的活动记录作品",
    location: "学校",
    date: "2026-06",
    camera: "Nikon",
    lens: "未填写",
    description: "活动现场记录作品。",
    featured: false,
    orientation: "竖图",
    tags: [
      "活动",
      "纪实",
      "现场"
    ]
  },
  {
    id: "photo-img-0110",
    title: "晚霞经过田野",
    category: "landscape",
    src: "/images/IMG_0110.JPG",
    visible: true,
    alt: "季宏宇拍摄的风光摄影作品《晚霞经过田野》",
    location: "苏州市-双凤镇",
    date: "2025-06-28",
    camera: "iPhone 16 Pro",
    lens: "iPhone 16 Pro back triple camera 6.765mm f/1.78",
    description: "晚霞落在田野上，远处的树影慢慢安静下来。那一刻，风很轻，天很温柔。",
    featured: true,
    orientation: "横图",
    tags: [
      "风光",
      "黄昏",
      "光影"
    ]
  },
  {
    id: "photo-img-0159",
    title: "《云隙里的金色黄昏》",
    category: "landscape",
    src: "/images/IMG_0159.JPG",
    visible: true,
    alt: "季宏宇拍摄的风光摄影作品《云隙里的金色黄昏》",
    location: "苏州市-双凤镇",
    date: "2025-07-20",
    camera: "iPhone 16 Pro",
    lens: "iPhone 16 Pro back triple camera 6.765mm f/1.78",
    description: "云层遮住了太阳，却遮不住黄昏的光。村庄安静下来，金色从天边慢慢铺开，像一天最后的回信。",
    featured: true,
    orientation: "横图",
    tags: [
      "风光",
      "黄昏",
      "光影"
    ]
  },
  {
    id: "photo-img-0160",
    title: "《云隙里的金色黄昏》",
    category: "landscape",
    src: "/images/IMG_0160.JPG",
    visible: true,
    alt: "季宏宇拍摄的风光摄影作品",
    location: "苏州市-双凤镇",
    date: "2025-07-20",
    camera: "iPhone 16 Pro",
    lens: "iPhone 16 Pro back triple camera 6.765mm f/1.78",
    description: "苏州市-双凤镇的黄昏光影记录，捕捉天空、地景与暖色光线交汇的瞬间。",
    featured: false,
    orientation: "横图",
    tags: [
      "风光",
      "黄昏",
      "光影"
    ]
  },
  {
    id: "photo-img-2999",
    title: "重庆 01",
    category: "travel",
    src: "/images/IMG_2999.JPG",
    visible: true,
    alt: "季宏宇拍摄的旅行记录作品",
    location: "重庆市-南岸区",
    date: "2024-08-05",
    camera: "iPhone 13",
    lens: "广角摄像头",
    description: "重庆市-南岸区偶遇的彩虹瞬间，让城市天际线多了一层轻盈的色彩。",
    featured: false,
    orientation: "横图",
    tags: [
      "旅游",
      "彩虹",
      "重庆"
    ]
  },
  {
    id: "photo-img-3183",
    title: "黄龙风景区之行 01",
    category: "travel",
    src: "/images/IMG_3183.JPG",
    visible: true,
    alt: "季宏宇拍摄的旅行记录作品",
    location: "黄龙国家级风景名胜区",
    date: "2024-08-11",
    camera: "iPhone 13",
    lens: "广角摄像头",
    description: "黄龙国家级风景名胜区的山水风景记录，呈现自然景观的层次、色彩与空间感。",
    featured: false,
    orientation: "横图",
    tags: [
      "旅游",
      "风景",
      "山水"
    ]
  },
  {
    id: "photo-img-3196",
    title: "黄龙风景区之行 02",
    category: "travel",
    src: "/images/IMG_3196.JPG",
    visible: true,
    alt: "季宏宇拍摄的旅行记录作品",
    location: "黄龙国家级风景名胜区",
    date: "2024-08-11",
    camera: "iPhone 13",
    lens: "广角摄像头",
    description: "黄龙国家级风景名胜区的山水风景记录，呈现自然景观的层次、色彩与空间感。",
    featured: false,
    orientation: "横图",
    tags: [
      "旅游",
      "风景",
      "山水"
    ]
  },
  {
    id: "photo-img-3210",
    title: "黄龙风景区之行 03",
    category: "travel",
    src: "/images/IMG_3210.JPG",
    visible: true,
    alt: "季宏宇拍摄的旅行记录作品",
    location: "黄龙国家级风景名胜区",
    date: "2024-08-11",
    camera: "iPhone 13",
    lens: "广角摄像头",
    description: "黄龙国家级风景名胜区的山水风景记录，呈现自然景观的层次、色彩与空间感。",
    featured: false,
    orientation: "横图",
    tags: [
      "旅游",
      "风景",
      "山水"
    ]
  },
  {
    id: "photo-img-3275",
    title: "九寨沟之行 01",
    category: "travel",
    src: "/images/IMG_3275.JPG",
    visible: true,
    alt: "季宏宇拍摄的旅行记录作品",
    location: "九寨沟",
    date: "2024-08-12",
    camera: "iPhone 13",
    lens: "广角摄像头",
    description: "九寨沟的山水风景记录，呈现自然景观的层次、色彩与空间感。",
    featured: false,
    orientation: "横图",
    tags: [
      "旅游",
      "风景",
      "山水"
    ]
  },
  {
    id: "photo-img-3370",
    title: "九寨沟之行 02",
    category: "travel",
    src: "/images/IMG_3370.JPG",
    visible: true,
    alt: "季宏宇拍摄的旅行记录作品",
    location: "九寨沟",
    date: "2024-08-12",
    camera: "iPhone 13",
    lens: "广角摄像头",
    description: "九寨沟的山水风景记录，呈现自然景观的层次、色彩与空间感。",
    featured: false,
    orientation: "横图",
    tags: [
      "旅游",
      "风景",
      "山水"
    ]
  },
  {
    id: "photo-img-3373",
    title: "九寨沟之行 03",
    category: "travel",
    src: "/images/IMG_3373.JPG",
    visible: true,
    alt: "季宏宇拍摄的旅行记录作品",
    location: "九寨沟",
    date: "2024-08-12",
    camera: "iPhone 13",
    lens: "广角摄像头",
    description: "九寨沟的山水风景记录，呈现自然景观的层次、色彩与空间感。",
    featured: false,
    orientation: "横图",
    tags: [
      "旅游",
      "风景",
      "山水"
    ]
  },
  {
    id: "photo-img-3417",
    title: "九寨沟之行 04",
    category: "travel",
    src: "/images/IMG_3417.JPG",
    visible: true,
    alt: "季宏宇拍摄的旅行记录作品",
    location: "九寨沟",
    date: "2024-08-12",
    camera: "iPhone 13",
    lens: "广角摄像头",
    description: "九寨沟的山水风景记录，呈现自然景观的层次、色彩与空间感。",
    featured: false,
    orientation: "横图",
    tags: [
      "旅游",
      "风景",
      "山水"
    ]
  },
  {
    id: "photo-dsc-0034",
    title: "顾村樱花 001",
    category: "nature",
    src: "/images/natural/DSC_0034.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0037",
    title: "顾村樱花 002",
    category: "nature",
    src: "/images/natural/DSC_0037.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0048",
    title: "顾村樱花 003",
    category: "nature",
    src: "/images/natural/DSC_0048.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0059",
    title: "顾村樱花 004",
    category: "nature",
    src: "/images/natural/DSC_0059.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0068",
    title: "顾村花 001",
    category: "nature",
    src: "/images/natural/DSC_0068.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0072",
    title: "顾村樱花 005",
    category: "nature",
    src: "/images/natural/DSC_0072.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0080",
    title: "顾村樱花 006",
    category: "nature",
    src: "/images/natural/DSC_0080.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0082",
    title: "顾村樱花 007",
    category: "nature",
    src: "/images/natural/DSC_0082.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0086",
    title: "顾村樱花 008",
    category: "nature",
    src: "/images/natural/DSC_0086.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0099",
    title: "顾村樱花 009",
    category: "nature",
    src: "/images/natural/DSC_0099.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0100",
    title: "顾村樱花 010",
    category: "nature",
    src: "/images/natural/DSC_0100.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园里的樱花记录，保留花枝、光线与季节气息之间的安静层次。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "樱花",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0167",
    title: "小区花卉 001",
    category: "nature",
    src: "/images/natural/DSC_0167.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "太仓市-西景瑞翡翠湾",
    date: "2026-03-21",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "太仓市-西景瑞翡翠湾中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "小区"
    ]
  },
  {
    id: "photo-dsc-0226",
    title: "田野间的花卉 001",
    category: "nature",
    src: "/images/natural/DSC_0226.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "苏州市-双凤镇",
    date: "2026-03-22",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "苏州市-双凤镇中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "竖图",
    tags: [
      "自然",
      "花卉",
      "田野"
    ]
  },
  {
    id: "photo-dsc-0329",
    title: "罗溪公园花卉 001",
    category: "nature",
    src: "/images/natural/DSC_0329.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-罗溪公园",
    date: "2026-03-28",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 50mm f/1.8 S",
    description: "上海市-罗溪公园中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0330",
    title: "罗溪公园花卉 002",
    category: "nature",
    src: "/images/natural/DSC_0330.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-罗溪公园",
    date: "2026-03-28",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 50mm f/1.8 S",
    description: "上海市-罗溪公园中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0352",
    title: "罗溪公园花卉 003",
    category: "nature",
    src: "/images/natural/DSC_0352.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-罗溪公园",
    date: "2026-03-28",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 50mm f/1.8 S",
    description: "上海市-罗溪公园中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0444",
    title: "大宁公园花卉 001",
    category: "nature",
    src: "/images/natural/DSC_0444.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-大宁公园",
    date: "2026-04-25",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-大宁公园中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0466",
    title: "大宁公园花卉 002",
    category: "nature",
    src: "/images/natural/DSC_0466.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-大宁公园",
    date: "2026-04-25",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-大宁公园中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0477",
    title: "大宁公园花卉 003",
    category: "nature",
    src: "/images/natural/DSC_0477.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-大宁公园",
    date: "2026-04-25",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-大宁公园中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "公园"
    ]
  },
  {
    id: "photo-dsc-0500",
    title: "海运堤花卉 001",
    category: "nature",
    src: "/images/natural/DSC_0500.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "太仓市-海运堤风情水街",
    date: "2026-05-01",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "太仓市-海运堤风情水街中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "街景"
    ]
  },
  {
    id: "photo-dsc-0501",
    title: "海运堤花卉 002",
    category: "nature",
    src: "/images/natural/DSC_0501.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "太仓市-海运堤风情水街",
    date: "2026-05-01",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "太仓市-海运堤风情水街中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "自然",
      "花卉",
      "街景"
    ]
  },
  {
    id: "photo-dsc-0093",
    title: "顾村的日落 001",
    category: "landscape",
    src: "/images/landscape/DSC_0093.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园的黄昏光影记录，捕捉天空、地景与暖色光线交汇的瞬间。",
    featured: false,
    orientation: "横图",
    tags: [
      "风光",
      "落日",
      "光影"
    ]
  },
  {
    id: "photo-dsc-0094",
    title: "顾村的日落 002",
    category: "landscape",
    src: "/images/landscape/DSC_0094.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园的黄昏光影记录，捕捉天空、地景与暖色光线交汇的瞬间。",
    featured: false,
    orientation: "横图",
    tags: [
      "风光",
      "落日",
      "光影"
    ]
  },
  {
    id: "photo-dsc-0095",
    title: "顾村的日落 003",
    category: "landscape",
    src: "/images/landscape/DSC_0095.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-顾村公园",
    date: "2026-03-14",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "上海市-顾村公园的黄昏光影记录，捕捉天空、地景与暖色光线交汇的瞬间。",
    featured: false,
    orientation: "横图",
    tags: [
      "风光",
      "落日",
      "光影"
    ]
  },
  {
    id: "photo-dsc-0245",
    title: "枯藤老树昏鸦",
    category: "landscape",
    src: "/images/landscape/DSC_0245.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "苏州市-双凤镇",
    date: "2026-03-22",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "黄昏把天空染暖，一只飞鸟从光里经过。那一瞬间，像是白天写给夜晚的告别。",
    featured: false,
    orientation: "横图",
    tags: [
      "风光",
      "黄昏",
      "光影"
    ]
  },
  {
    id: "photo-dsc-0553",
    title: "海运堤日落 001",
    category: "landscape",
    src: "/images/landscape/DSC_0553.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "太仓市-海运堤风情水街",
    date: "2026-05-01",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "太仓市-海运堤风情水街的黄昏光影记录，捕捉天空、地景与暖色光线交汇的瞬间。",
    featured: false,
    orientation: "横图",
    tags: [
      "风光",
      "落日",
      "光影"
    ]
  },
  {
    id: "photo-dsc-0565",
    title: "海运堤日落 002",
    category: "landscape",
    src: "/images/landscape/DSC_0565.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "太仓市-海运堤风情水街",
    date: "2026-05-01",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "太仓市-海运堤风情水街的黄昏光影记录，捕捉天空、地景与暖色光线交汇的瞬间。",
    featured: false,
    orientation: "横图",
    tags: [
      "风光",
      "落日",
      "光影"
    ]
  },
  {
    id: "photo-dsc-0198-natural-color",
    title: "油菜花间的童年 001",
    category: "portrait",
    src: "/images/portrait/DSC_0198_natural_color.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "苏州市-双凤镇",
    date: "2026-03-22",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "苏州市-双凤镇中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "人像",
      "花卉",
      "田野"
    ]
  },
  {
    id: "photo-dsc-0240",
    title: "油菜花间的童年 002",
    category: "portrait",
    src: "/images/portrait/DSC_0240.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "苏州市-双凤镇",
    date: "2026-03-22",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "苏州市-双凤镇中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "竖图",
    tags: [
      "人像",
      "花卉",
      "田野"
    ]
  },
  {
    id: "photo-dsc-0268",
    title: "油菜花间的童年 003",
    category: "portrait",
    src: "/images/portrait/DSC_0268.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "苏州市-双凤镇",
    date: "2026-03-22",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 24-200mm f/4-6.3 VR",
    description: "苏州市-双凤镇中的花卉细节，记录植物在自然光下的色彩与姿态。",
    featured: false,
    orientation: "横图",
    tags: [
      "人像",
      "花卉",
      "田野"
    ]
  },
  {
    id: "photo-dsc-0351",
    title: "叶影间的相遇 001",
    category: "portrait",
    src: "/images/portrait/DSC_0351.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-罗溪公园",
    date: "2026-03-28",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 50mm f/1.8 S",
    description: "上海市-罗溪公园中的人像尝试，记录人物状态与周围环境之间的自然关系。",
    featured: false,
    orientation: "竖图",
    tags: [
      "人像",
      "公园",
      "抓拍"
    ]
  },
  {
    id: "photo-ea4b065843cf8a1d7286db2292f9c968",
    title: "叶影间的相遇 002",
    category: "portrait",
    src: "/images/portrait/EA4B065843CF8A1D7286DB2292F9C968.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-罗溪公园",
    date: "2026-03-28",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 50mm f/1.8 S",
    description: "上海市-罗溪公园中的人像尝试，记录人物状态与周围环境之间的自然关系。",
    featured: false,
    orientation: "竖图",
    tags: [
      "人像",
      "公园",
      "抓拍"
    ]
  },
  {
    id: "photo-dsc-0350",
    title: "金鸡独立",
    category: "street",
    src: "/images/street/DSC_0350.webp",
    visible: true,
    alt: "季宏宇拍摄的摄影作品",
    location: "上海市-罗溪公园",
    date: "2026-03-28",
    camera: "NIKON Z5_2",
    lens: "NIKKOR Z 50mm f/1.8 S",
    description: "万众瞩目的金鸡",
    featured: false,
    orientation: "横图",
    tags: [
      "建筑",
      "公园",
      "街景"
    ]
  },
];

function normalizePhoto(photo, index) {
  const normalizedPhoto = {
    ...photoDefaults,
    id: `photo-${index + 1}`,
    ...photo,
  };
  const description =
    normalizedPhoto.description &&
    !normalizedPhoto.description.includes('这张作品的信息还没有完善')
      ? normalizedPhoto.description
      : createPhotoDescription(normalizedPhoto);

  return {
    ...normalizedPhoto,
    description,
    tags: Array.isArray(normalizedPhoto.tags) ? normalizedPhoto.tags : [],
  };
}

function createPhotoDescription(photo) {
  const tags = Array.isArray(photo.tags) ? photo.tags : [];
  const location = photo.location && photo.location !== '未填写' ? photo.location : '';

  if (tags.includes('樱花')) {
    return `${location || '春日公园'}里的樱花记录，保留花枝、光线与季节气息之间的安静层次。`;
  }

  if (tags.includes('花卉')) {
    return `${location || '自然环境'}中的花卉细节，记录植物在自然光下的色彩与姿态。`;
  }

  if (tags.includes('落日') || tags.includes('黄昏')) {
    return `${location || '日落时分'}的黄昏光影记录，捕捉天空、地景与暖色光线交汇的瞬间。`;
  }

  if (tags.includes('山水') || photo.title.includes('九寨沟') || photo.title.includes('黄龙')) {
    return `${location || '旅途中'}的山水风景记录，呈现自然景观的层次、色彩与空间感。`;
  }

  if (tags.includes('彩虹')) {
    return `${location || '城市旅途中'}偶遇的彩虹瞬间，让城市天际线多了一层轻盈的色彩。`;
  }

  if (tags.includes('人像')) {
    return `${location || '自然光环境'}中的人像尝试，记录人物状态与周围环境之间的自然关系。`;
  }

  if (tags.includes('街景')) {
    return `${location || '城市街头'}的街景观察，记录日常空间里的结构、光线与生活气息。`;
  }

  return `${location ? `${location}的` : ''}${getCategoryLabel(photo.category)}作品，记录一次值得保留下来的光线与现场。`;
}

// 页面实际读取的是 photos。
// 如果某条数据漏写 src，visible 不是 true，或 hidden 写成 true，会被自动跳过。
export const photos = editablePhotos
  .map(normalizePhoto)
  .filter((photo) => photo.src && !photo.hidden && photo.visible === true);

export function getCategoryLabel(category) {
  return categoryLabels[category] || category;
}

export function getPhotoAltText(photo) {
  if (!photo) {
    return '季宏宇摄影作品';
  }

  const genericAltTexts = new Set([
    photoDefaults.alt,
    '季宏宇拍摄的摄影作品',
  ]);
  const hasSpecificAlt = photo.alt && !genericAltTexts.has(photo.alt);

  if (hasSpecificAlt) {
    return photo.alt;
  }

  const categoryLabel = getCategoryLabel(photo.category);
  const titleText = photo.title ? `《${photo.title}》` : '';
  const locationText =
    photo.location && photo.location !== '未填写'
      ? `，拍摄于${photo.location}`
      : '';

  return `季宏宇拍摄的${categoryLabel}作品${titleText}${locationText}`;
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
