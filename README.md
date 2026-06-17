# 季宏宇摄影作品集网站

这是季宏宇的静态摄影作品集项目，使用 Vite + React 搭建，适合部署到 Netlify、Vercel 或 GitHub Pages，也可以作为简历中的作品展示链接。

## 项目结构

```text
public/
  images/              # 存放所有照片
src/
  components/          # 可复用组件
  data/
    photos.js          # 照片数据管理中心
  pages/               # 页面组件
  styles/
    global.css         # 全局样式与响应式布局
  App.jsx
  main.jsx
```

## 启动项目

安装依赖：

```bash
npm install
```

启动本地开发服务器：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

本地预览生产构建：

```bash
npm run preview
```

自动扫描 `public/images/` 里的新照片，并追加到 `src/data/photos.js`：

```bash
npm run photos:scan
```

想先预览会追加哪些照片，可以运行：

```bash
npm run photos:scan -- --dry-run
```

现在 `npm run photos:scan` 只会追加还没写进 `photos.js` 的新照片，不会覆盖你已经认真修改过的标题、分类、地点和简介。

自动读取照片 EXIF，并补全空白的相机、镜头、拍摄日期和图片方向：

```bash
npm run photos:exif
```

想先预览会补哪些字段，可以运行：

```bash
npm run photos:exif -- --dry-run
```

`photos:exif` 只补 `camera`、`lens`、`date`、`orientation` 这些字段里空白或 `未填写` 的内容，不会覆盖你已经写好的标题、简介、分类、地点和显示开关。

## 新增一张照片

以后新增照片主要改两个地方：

1. 把图片放到 `public/images/`，或者放到它下面的分类文件夹里，例如：

```text
public/images/activity-log-web/DSC_0001.webp
```

2. 如果一次加入很多照片，可以运行：

```bash
npm run photos:scan
```

脚本会自动追加基础数据。然后打开 `src/data/photos.js`，只修改 `editablePhotos` 这个数组，把自动生成的标题、分类、地点、时间和简介改成真实信息。

如果图片保留了 EXIF 信息，可以继续运行：

```bash
npm run photos:exif
```

它会自动补全相机、镜头、拍摄日期和图片方向。

如果只加入一张照片，也可以直接复制 `editablePhotos` 里面任意一整条照片数据，然后改成你的照片信息：

```js
{
  id: 'activity-0001',
  title: '活动记录 02',
  category: 'event',
  src: '/images/activity-log-web/DSC_0001.webp',
  visible: false,
  alt: '季宏宇拍摄的活动现场记录照片',
  location: '学校',
  date: '2026-06',
  camera: 'Nikon',
  lens: '未知镜头',
  description: '活动现场记录作品。',
  featured: false,
  orientation: '横图',
  tags: ['活动', '纪实', '现场'],
}
```

注意：
- `src` 必须从 `/images/` 开始写，对应的真实文件位置是 `public/images/`。
- 如果图片在 `public/images/activity-log-web/` 里，路径就写 `/images/activity-log-web/文件名.webp`。
- `visible: true` 才会显示在网站上；`visible: false` 会隐藏。
- `featured: true` 会进入首页精选区；普通照片建议先写 `false`。如果 `visible` 不是 `true`，即使 `featured: true` 也不会显示。
- `tags` 必须写成数组，没有标签就写 `[]`。
- 如果某条数据忘记写 `src`，网站会自动跳过它，避免整页报错。

## 照片字段说明

| 字段 | 作用 |
| --- | --- |
| `id` | 每张照片唯一名称，建议用英文和数字 |
| `title` | 作品标题 |
| `category` | 分类 id，例如 `astro`、`landscape`、`nature`、`portrait` |
| `src` | 图片路径，例如 `/images/star-01.jpg` |
| `visible` | 是否在网站显示，写 `true` 显示，写 `false` 隐藏 |
| `alt` | 图片说明，用于 SEO 和无障碍访问 |
| `location` | 拍摄地点 |
| `date` | 拍摄时间 |
| `camera` | 相机 |
| `lens` | 镜头 |
| `description` | 简短作品说明 |
| `featured` | 是否出现在精选作品区，写 `true` 或 `false` |
| `orientation` | 图片方向，可写 `横图`、`竖图`、`方图` |
| `tags` | 标签数组，例如 `['星空', '旅行']` |

## 修改作品分类

分类按钮会从 `editablePhotos` 数据中自动生成。也就是说，只要你新增一张照片并写了新的 `category`，页面就会自动出现对应分类按钮。

如果想给分类设置中文名称，在 `src/data/photos.js` 顶部的 `categoryLabels` 中补一行：

```js
export const categoryLabels = {
  astro: '星空摄影',
  landscape: '风光摄影',
  nature: '自然摄影',
  portrait: '人像摄影',
  travel: '旅行记录',
  street: '城市街拍',
  event: '活动记录',
  macro: '微距摄影',
};
```

然后照片里使用同一个分类 id：

```js
category: 'macro',
```

## 修改分类按钮默认顺序

分类作品区的按钮支持拖动排序，拖动后的顺序会保存在当前浏览器中。

如果想修改所有访客第一次打开网站时看到的默认顺序，请在 `src/data/photos.js` 中调整 `defaultCategoryOrder`：

```js
const defaultCategoryOrder = ['landscape', 'nature', 'portrait', 'travel', 'street', 'event', 'astro'];
```

目前你还没有正式的星空摄影作品，所以 `astro` 被放在最后。以后有星空作品时，可以把它移动到更靠前的位置。

## 如何把网站链接放进简历

部署完成后，你会得到一个公开访问链接，例如 Netlify、Vercel 或 GitHub Pages 提供的网址。

建议在简历中这样放：

```text
个人摄影作品集：White Photography
链接：https://你的作品集网址
内容：星空、风光、旅行与生活记录等个人摄影作品
```

如果简历支持超链接，可以把文字写成：

```text
White Photography｜个人摄影作品集
```

然后把它链接到你的网站地址。这样比直接放一长串 URL 更干净，也更适合给老师、同学、面试官或客户查看。

网站的标题、分享描述和社交平台预览信息在 `index.html` 中维护。上线后，如果你有正式域名，可以把分享图和网址补得更完整：

```html
<meta property="og:image" content="https://你的域名/images/hero.png" />
<meta property="og:url" content="https://你的域名/" />
```

微信、QQ、社交平台通常会读取 `index.html` 里的 Open Graph 信息。修改后如果分享预览没有立刻更新，可能是平台缓存，可以稍等一段时间或换一个新链接测试。

## 部署到 Netlify

推荐使用 Git 连接部署：

1. 将项目推送到 GitHub、GitLab 或 Bitbucket。
2. 在 Netlify 中导入项目仓库。
3. 构建命令填写 `npm run build`。
4. 发布目录填写 `dist`。
5. 保存后触发部署。

也可以使用 Netlify CLI 手动部署：

```bash
npm run build
npx netlify deploy --dir=dist
npx netlify deploy --prod --dir=dist
```

## 部署到 Vercel

1. 将项目推送到 GitHub、GitLab 或 Bitbucket。
2. 在 Vercel 中导入项目仓库。
3. Framework Preset 选择 `Vite`。
4. 构建命令使用 `npm run build`。
5. 输出目录使用 `dist`。
6. 点击 Deploy。

## 部署到 GitHub Pages

安装 `gh-pages`：

```bash
npm install gh-pages --save-dev
```

在 `package.json` 中增加：

```json
{
  "homepage": "https://你的用户名.github.io/你的仓库名",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

如果部署到仓库子路径，还需要在 `vite.config.js` 中设置 `base`：

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/你的仓库名/',
});
```

然后运行：

```bash
npm run deploy
```
