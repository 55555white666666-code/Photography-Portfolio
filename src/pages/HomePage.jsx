import React, { useEffect, useMemo, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter.jsx';
import FeaturedMosaic from '../components/FeaturedMosaic.jsx';
import PhotoDetailModal from '../components/PhotoDetailModal.jsx';
import PhotoGrid from '../components/PhotoGrid.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import { categories, getPhotoAltText, getPhotosByCategory, photos } from '../data/photos.js';

const CATEGORY_ORDER_STORAGE_KEY = 'jihongyu-photo-category-order-v3';
const DEFAULT_ARCHIVE_CATEGORY = 'all';
const ALL_PHOTOS_INITIAL_LIMIT = 12;

function sortCategoriesBySavedOrder(baseCategories, savedOrder) {
  const categoryMap = new Map(baseCategories.map((category) => [category.id, category]));
  const normalizedSavedOrder = [
    'all',
    'featured',
    ...savedOrder.filter(
      (categoryId) => categoryId !== 'all' && categoryId !== 'featured',
    ),
  ];
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
    label: '相机',
    title: '全画幅机身 / 轻量记录',
    text: '用于风光、旅行、活动与日常观察，重视低光环境下的细节和画面宽容度。',
  },
  {
    label: '镜头',
    title: '广角 / 标准定焦 / 中长焦',
    text: '广角负责空间与氛围，定焦和中长焦用于人像、街头以及更安静的细节观察。',
  },
  {
    label: '拍摄方向',
    title: '星空、风光、旅行与生活记录',
    text: '偏向真实光线、克制色彩和电影感叙事，用影像整理我看见世界的方式。',
  },
];

const contactItems = [
  { label: '邮箱', value: '656295047@qq.com', href: 'mailto:656295047@qq.com' },
  { label: '电话', value: '15250407067' },
  { label: '微信', value: 'White-_-Mao_Xiong' },
];

const heroTags = ['星空摄影', '风光摄影', '旅行记录', '生活记录'];

const aboutFacts = [
  { label: '关注方向', value: '星空 / 风光 / 旅行 / 生活记录' },
  { label: '影像风格', value: '安静、克制、重视光线与氛围' },
  { label: '作品集用途', value: '整理个人摄影作品，作为简历中的视觉展示' },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_ARCHIVE_CATEGORY);
  const [orderedCategories, setOrderedCategories] = useState(getInitialCategories);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isAllPhotosExpanded, setIsAllPhotosExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const revealTargets = Array.from(document.querySelectorAll('.reveal-on-scroll'));

    if (revealTargets.length === 0) {
      return undefined;
    }

    if (reducedMotionQuery.matches) {
      revealTargets.forEach((target) => target.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    );

    revealTargets.forEach((target, index) => {
      target.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [activeCategory, isAllPhotosExpanded]);

  const featuredPhotos = useMemo(
    () => photos.filter((photo) => photo.featured).slice(0, 6),
    [],
  );
  const heroPhoto = featuredPhotos[0] || photos[0];
  const categoryCount = new Set(photos.map((photo) => photo.category)).size;
  const heroMetaItems = [
    { label: '作品', value: heroPhoto?.title || '精选作品' },
    { label: '相机', value: heroPhoto?.camera || '待补充' },
    { label: '镜头', value: heroPhoto?.lens || '待补充' },
    { label: '地点', value: heroPhoto?.location || '个人影像归档' },
  ];
  const heroStats = [
    { label: '作品数量', value: photos.length },
    { label: '精选作品', value: featuredPhotos.length },
    { label: '拍摄方向', value: categoryCount },
  ];

  const visiblePhotos = useMemo(
    () => getPhotosByCategory(activeCategory),
    [activeCategory],
  );
  const isAllCategory = activeCategory === 'all';
  const shownPhotos =
    isAllCategory && !isAllPhotosExpanded
      ? visiblePhotos.slice(0, ALL_PHOTOS_INITIAL_LIMIT)
      : visiblePhotos;
  const hasHiddenAllPhotos =
    isAllCategory && visiblePhotos.length > ALL_PHOTOS_INITIAL_LIMIT;

  function handleCategoryChange(categoryId) {
    setActiveCategory(categoryId);
    setIsAllPhotosExpanded(false);
  }

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
      <div className="opening-mask" aria-hidden="true">
        <span>季宏宇摄影作品集</span>
      </div>
      <SiteHeader />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          {heroPhoto && (
            <img className="hero__image" src={heroPhoto.src} alt={getPhotoAltText(heroPhoto)} />
          )}
          <div className="hero__shade" />
          <div className="hero__fine-line" aria-hidden="true" />
          <div className="hero__content">
            <p className="eyebrow">季宏宇摄影作品集</p>
            <div className="mask-reveal mask-reveal--title">
              <h1 id="hero-title">季宏宇摄影作品集</h1>
            </div>
            <div className="mask-reveal mask-reveal--lead">
              <p className="hero__lead">
                记录光落下的瞬间，也记录我看见世界的方式。
              </p>
            </div>
            <p className="hero__subcopy">
              一个用于整理星空、风光、旅行与生活记录的个人摄影作品集。
              画面保持克制，把注意力留给光线、空间和真实的现场感。
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#featured">
                精选作品
              </a>
              <a className="button button--ghost" href="#archive">
                查看全部作品
              </a>
              <a className="button button--quiet" href="#about">
                关于我
              </a>
            </div>
            <div className="hero__tags" aria-label="主要拍摄方向">
              {heroTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="hero__stats" aria-label="作品集概览">
              {heroStats.map((item) => (
                <span key={item.label}>
                  <strong>{item.value}</strong>
                  <small>{item.label}</small>
                </span>
              ))}
            </div>
          </div>
          <aside className="hero__note" aria-label="当前封面照片信息">
            <span>封面作品</span>
            <strong>{heroPhoto?.title || '精选作品'}</strong>
            <dl className="hero__meta">
              {heroMetaItems.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <section id="featured" className="section section--featured" aria-labelledby="featured-title">
          <div className="section__heading">
            <p className="eyebrow">精选作品</p>
            <h2 id="featured-title">精选作品</h2>
            <p>
              从当前作品中挑出更能代表观察方式和画面控制的照片。
              它们不追求数量，而是作为作品集的第一组视觉印象。
            </p>
          </div>
          <FeaturedMosaic photos={featuredPhotos} onPhotoSelect={setSelectedPhoto} />
        </section>

        <section id="archive" className="section section--archive" aria-labelledby="archive-title">
          <div className="section__heading section__heading--split">
            <div>
              <p className="eyebrow">作品归档</p>
              <h2 id="archive-title">分类作品</h2>
            </div>
            <p>
              所有照片都来自 `src/data/photos.js`。你可以按分类快速浏览，
              也可以把“全部作品”展开成完整作品归档。
            </p>
          </div>
          <CategoryFilter
            activeCategory={activeCategory}
            categories={orderedCategories}
            onChange={handleCategoryChange}
            onReorder={handleCategoryReorder}
          />
          <PhotoGrid photos={shownPhotos} onPhotoSelect={setSelectedPhoto} />
          {hasHiddenAllPhotos && (
            <div className="archive-more">
              <button
                className="button button--ghost archive-more__button"
                type="button"
                onClick={() => setIsAllPhotosExpanded((currentValue) => !currentValue)}
              >
                {isAllPhotosExpanded
                  ? `收起到前 ${ALL_PHOTOS_INITIAL_LIMIT} 张`
                  : `查看全部 ${visiblePhotos.length} 张作品`}
              </button>
              {!isAllPhotosExpanded && (
                <p>
                  已先展示 {ALL_PHOTOS_INITIAL_LIMIT} 张，手机端可以按分类继续浏览。
                </p>
              )}
            </div>
          )}
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="about-section__intro">
            <p className="eyebrow">关于我</p>
            <h2 id="about-title">关于我</h2>
          </div>
          <div className="about-section__copy">
            <p>
              我热爱摄影，主要关注星空、风光、旅行与生活记录，也在持续尝试人像表达。
            </p>
            <p>
              对我来说，摄影是一种整理观察的方法：在光线、天气、空间和人物状态之间，
              寻找值得被保留下来的瞬间。
            </p>
            <p>
              这个网站用于整理和展示我的个人摄影作品，也作为简历中的可视化作品集，
              呈现我的审美判断、记录能力和持续创作过程。
            </p>
            <div className="about-section__facts" aria-label="作品集说明">
              {aboutFacts.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--gear" aria-labelledby="gear-title">
          <div className="section__heading">
            <p className="eyebrow">设备与方向</p>
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
            <p className="eyebrow">联系方式</p>
            <h2 id="contact-title">联系方式</h2>
            <p>适合放入简历、课程展示或作品集链接中，也欢迎交流作品与拍摄合作。</p>
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

      <footer className="site-footer">
        <div>
          <strong>White Photography</strong>
          <span>季宏宇个人摄影作品集</span>
        </div>
        <p>© 2026 季宏宇。所有照片与文字仅用于个人作品展示。</p>
        <p>联系：656295047@qq.com / 微信 White-_-Mao_Xiong</p>
      </footer>

      <PhotoDetailModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
