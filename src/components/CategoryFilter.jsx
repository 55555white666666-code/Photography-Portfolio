import React, { useState } from 'react';

export default function CategoryFilter({
  categories,
  activeCategory,
  onChange,
  onReorder,
}) {
  const [draggedCategoryId, setDraggedCategoryId] = useState(null);

  function handleDragStart(event, categoryId) {
    setDraggedCategoryId(categoryId);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', categoryId);
  }

  function handleDrop(event, targetCategoryId) {
    event.preventDefault();
    const sourceCategoryId =
      draggedCategoryId || event.dataTransfer.getData('text/plain');

    if (!sourceCategoryId || sourceCategoryId === targetCategoryId) {
      return;
    }

    onReorder(sourceCategoryId, targetCategoryId);
    setDraggedCategoryId(null);
  }

  return (
    <div className="category-filter" aria-label="作品分类筛选">
      {categories.map((category) => (
        <button
          aria-pressed={category.id === activeCategory}
          className={[
            category.id === activeCategory ? 'is-active' : '',
            category.id === draggedCategoryId ? 'is-dragging' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          draggable
          key={category.id}
          title="拖动调整分类顺序"
          type="button"
          onClick={() => onChange(category.id)}
          onDragEnd={() => setDraggedCategoryId(null)}
          onDragOver={(event) => event.preventDefault()}
          onDragStart={(event) => handleDragStart(event, category.id)}
          onDrop={(event) => handleDrop(event, category.id)}
        >
          <span className="category-filter__grip" aria-hidden="true">
            ::
          </span>
          {category.label}
        </button>
      ))}
    </div>
  );
}
