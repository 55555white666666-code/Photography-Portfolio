import React from 'react';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="返回首页">
        <span>季宏宇</span>
        <span>Photography</span>
      </a>
      <nav className="site-nav" aria-label="主导航">
        <a href="#featured">精选</a>
        <a href="#archive">分类</a>
        <a href="#about">关于</a>
        <a href="#contact">联系</a>
      </nav>
    </header>
  );
}
