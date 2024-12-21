import React from 'react';
import { useTranslation } from 'react-i18next';
import './Category.css';

const Category = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="categories-title">
        <h1>{t('home.title2')}</h1>
      </section>
      <section className="categories-section">
        <a href="/categories/subcategories/1" className="category-card" id='books-img'>
          <div className="category-overlay">
            <h3>{t('home.books')}</h3>
          </div>
        </a>
        <a href="/categories/subcategories/2" className="category-card" id='fournitures'>
          <div className="category-overlay">
            <h3>{t('home.supplies')}</h3>
          </div>
        </a>
        <a href="/categories/subcategories/3" className="category-card" id='arts-et-jouets'>
          <div className="category-overlay">
            <h3>{t('home.artsAndToys')}</h3>
          </div>
        </a>
        <a href="/categories/subcategories/4" className="category-card" id='services'>
          <div className="category-overlay">
            <h3>{t('home.services')}</h3>
          </div>
        </a>
        <a href="/categories/subcategories/5" className="category-card" id='school'>
          <div className="category-overlay">
            <h3>{t('home.school')}</h3>
          </div>
        </a>
        <a href="/categories/subcategories/6" className="category-card" id='quran'>
          <div className="category-overlay">
            <h3>القران وكتب دينية</h3>
          </div>
        </a>
      </section>
    </>
  )
}

export default Category