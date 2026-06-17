import React, { useMemo, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter.jsx';
import FeaturedMosaic from '../components/FeaturedMosaic.jsx';
import PhotoDetailModal from '../components/PhotoDetailModal.jsx';
import PhotoGrid from '../components/PhotoGrid.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import { categories, getPhotosByCategory, photos } from '../data/photos.js';

const CATEGORY_ORDER_STORAGE_KEY = 'jihongyu-photo-category-order';

function sortCategoriesBySavedOrder(baseCategories, savedOrder) {
  const categoryMap = new Map(baseCategories.map((category) => [category.id, category]));
  const normalizedSavedOrder = savedOrder.includes('all')
    ? savedOrder
    : ['all', ...savedOrder];
  const savedCategories = normalizedSavedOrder
    .map((categoryId) => categoryMap.get(categoryId))
    .filter(Boolean);
  const savedCategoryIds = new Set(savedCategories.map((category) => category.id));
  const newCategories = baseCategories.filter((category) => !savedCategoryIds.has(category.id));

  return [...savedCategories, ...newCategories];
}

function getInitialCategories() {
  if (typeof window === 'undefined') {
    return categories;
  }

  try {
    const savedOrder = JSON.parse(
      window.localStorage.getItem(CATEGORY_ORDER_STORAGE_KEY) || '[]',
    );

    if (Array.isArray(savedOrder) && savedOrder.length > 0) {
      return sortCategoriesBySavedOrder(categories, savedOrder);
    }
  } catch {
    return categories;
  }

  return categories;
}

const equipmentItems = [
  {
    label: 'Camera',
    title: '全画幅 / 便携机身',
    text: '用于风光、旅行、活动和日常记录，重视低光表现与画面宽容度。',
  },
  {
    label: 'Lens',
    title: '广角 / 标准定焦',
    text: '广角负责空间感，定焦负责安静的人像、街头和细节观察。',
  },
  {
    label: 'Direction',
    title: '风光、旅行、人像、活动',
    text: '偏向真实光线、克制色彩和电影感叙事，让照片自己说话。',
  },
];

const contactItems = [
  { label: 'Email', value: 'jihongyu@example.com', href: 'mailto:jihongyu@example.com' },
  { label: 'WeChat', value: 'JiHongyu' },
  { label: 'Social', value: '@jihongyu.photo' },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [orderedCategories, setOrderedCategories] = useState(getInitialCategories);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const featuredPhotos = useMemo(
    () => photos.filter((photo) => photo.featured).slice(0, 6),
    [],
  );
  const heroPhoto = featuredPhotos[0] || photos[0];
  const heroStyle = heroPhoto
    ? { '--hero-image': `url(${JSON.stringify(heroPhoto.src)})` }
    : undefined;

  const visiblePhotos = useMemo(
    () => getPhotosByCategory(activeCategory),
    [activeCategory],
  );

  function handleCategoryReorder(sourceCategoryId, targetCategoryId) {
    setOrderedCategories((currentCategories) => {
      const sourceIndex = currentCategories.findIndex(
        (category) => category.id === sourceCategoryId,
      );
      const targetIndex = currentCategories.findIndex(
        (category) => category.id === targetCategoryId,
      );

      if (sourceIndex < 0 || targetIndex < 0) {
        return currentCategories;
      }

      const nextCategories = [...currentCategories];
      const [movedCategory] = nextCategories.splice(sourceIndex, 1);
      nextCategories.splice(targetIndex, 0, movedCategory);

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(
            CATEGORY_ORDER_STORAGE_KEY,
            JSON.stringify(nextCategories.map((category) => category.id)),
          );
        } catch {
          // 拖动排序本身仍然生效；只是当前浏览器没有保存顺序。
        }
      }

      return nextCategories;
    });
  }

  return (
    <div id="top" className="app-shell">
      <SiteHeader />

      <main>
        <section className="hero" aria-labelledby="hero-title" style={heroStyle}>
          <div className="hero__shade" />
          <div className="hero__content">
            <p className="eyebrow">Personal Photography Portfolio</p>
            <h1 id="hero-title">季宏宇 Photography</h1>
            <p>
              以风光、旅行记录和活动纪实为主，也在持续尝试安静克制的人像表达。
              这里收集我想长期保留下来的影像瞬间。
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#featured">
                进入作品
              </a>
              <a className="button button--ghost" href="#contact">
                联系我
              </a>
            </div>
          </div>
          <aside className="hero__note" aria-label="作品集信息">
            <span>Selected frames</span>
            <strong>2025 - 2026</strong>
            <p>Landscape / Travel / Portrait / Event</p>
          </aside>
        </section>

        <section id="featured" className="section section--featured" aria-labelledby="featured-title">
          <div className="section__heading">
            <p className="eyebrow">Selected Works</p>
            <h2 id="featured-title">精选作品</h2>
            <p>
              这里自动展示 `photos.js` 中标记为 `featured: true` 的作品，
              适合放置最能代表个人风格的 4-6 张照片。
            </p>
          </div>
          <FeaturedMosaic photos={featuredPhotos} onPhotoSelect={setSelectedPhoto} />
        </section>

        <section id="archive" className="section section--archive" aria-labelledby="archive-title">
          <div className="section__heading section__heading--split">
            <div>
              <p className="eyebrow">Archive</p>
              <h2 id="archive-title">分类作品</h2>
            </div>
            <p>
              分类按钮会根据照片数据自动生成。以后新增分类时，先在照片里使用新的
              `category`，再按需补充分类中文名即可。
            </p>
          </div>
          <CategoryFilter
            activeCategory={activeCategory}
            categories={orderedCategories}
            onChange={setActiveCategory}
            onReorder={handleCategoryReorder}
          />
          <PhotoGrid photos={visiblePhotos} onPhotoSelect={setSelectedPhoto} />
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="about-section__intro">
            <p className="eyebrow">About</p>
            <h2 id="about-title">关于我</h2>
          </div>
          <div className="about-section__copy">
            <p>
              我喜欢拍摄那些不急着被解释的画面：夜空下的山脊、清晨的雾气、
              旅途中短暂停留的路口，以及自然光里安静的人像。
            </p>
            <p>
              这个作品集会持续整理我的风光摄影、旅行记录、活动纪实和人像尝试。
              视觉上尽量克制，把注意力留给照片本身。
            </p>
          </div>
        </section>

        <section className="section section--gear" aria-labelledby="gear-title">
          <div className="section__heading">
            <p className="eyebrow">Gear & Direction</p>
            <h2 id="gear-title">设备与拍摄方向</h2>
          </div>
          <div className="info-grid">
            {equipmentItems.map((item) => (
              <article className="info-card" key={item.label}>
                <p>{item.label}</p>
                <h3>{item.title}</h3>
                <span>{item.text}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">联系方式</h2>
            <p>欢迎交流作品、课程展示、简历评估或拍摄合作。</p>
          </div>
          <div className="contact-list">
            {contactItems.map((item) => (
              <a
                className="contact-link"
                href={item.href || '#contact'}
                key={item.label}
                onClick={(event) => {
                  if (!item.href) {
                    event.preventDefault();
                  }
                }}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            ))}
          </div>
        </section>
      </main>

      <PhotoDetailModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
