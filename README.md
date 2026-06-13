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

## 新增一张照片

以后新增照片只需要改两个地方：

1. 把图片放到 `public/images/`，例如：

```text
public/images/star-02.jpg
```

2. 打开 `src/data/photos.js`，复制 `photos` 数组里任意一条数据，然后修改内容：

```js
{
  id: 'star-02',
  title: '新的星空作品',
  category: 'astro',
  src: '/images/star-02.jpg',
  alt: '山顶上方的银河星空摄影作品',
  location: 'Yunnan',
  date: '2026-05',
  camera: 'Sony A7 IV',
  lens: '20mm F1.8',
  description: '这是一张关于夜空、山脊和长曝光的作品说明。',
  featured: true,
  orientation: '横图',
  tags: ['星空', '银河', '长曝光'],
}
```

注意：`src` 从 `/images/` 开始写，对应的真实文件位置是 `public/images/`。

## 照片字段说明

| 字段 | 作用 |
| --- | --- |
| `id` | 每张照片唯一名称，建议用英文和数字 |
| `title` | 作品标题 |
| `category` | 分类 id，例如 `astro`、`landscape`、`portrait` |
| `src` | 图片路径，例如 `/images/star-01.jpg` |
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

分类按钮会从 `photos` 数据中自动生成。也就是说，只要你新增一张照片并写了新的 `category`，页面就会自动出现对应分类按钮。

如果想给分类设置中文名称，在 `src/data/photos.js` 顶部的 `categoryLabels` 中补一行：

```js
export const categoryLabels = {
  astro: '星空摄影',
  landscape: '风光摄影',
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
const defaultCategoryOrder = ['landscape', 'portrait', 'travel', 'street', 'event', 'astro'];
```

目前你还没有正式的星空摄影作品，所以 `astro` 被放在最后。以后有星空作品时，可以把它移动到更靠前的位置。

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
