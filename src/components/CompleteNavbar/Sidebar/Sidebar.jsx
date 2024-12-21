import React, { useState } from 'react';
import { useFetchAllCATEGORIESQuery } from '../../../services/CategorieApi';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const { data, isFetching } = useFetchAllCATEGORIESQuery();
  const [expanded, setExpanded] = useState({}); // Track which categories are expanded
  const [isOpen, setIsOpen] = useState(false); // Track if the sidebar is open

  if (isFetching) return <p>Loading...</p>;
  if (!data || !data.categories) return <p>No categories found</p>;

  // Helper function to build a category tree
  const buildCategoryTree = (categories) => {
    const categoryMap = {};
    const tree = [];

    categories.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    });

    categories.forEach((category) => {
      if (category.parent_id) {
        categoryMap[category.parent_id].children.push(categoryMap[category.id]);
      } else {
        tree.push(categoryMap[category.id]);
      }
    });

    return tree;
  };

  const categoryTree = buildCategoryTree(data.categories);

  // Toggle the expansion state of a category
  const toggleCategory = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the current category's state
    }));
  };


  function replaceUnderscoresWithSpaces(name) {
    // Remplacer les underscores par des espaces
    const replaced = name.replace(/_/g, " ");

    // Mettre en majuscule la première lettre
    return replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase();
  }

  // Recursive function to render categories with toggleable children
// Recursive function to render categories with toggleable children
const renderCategories = (categories) => {
  return (
    <ul className="sidebar-dropdown">
      {categories.map((category) => (
        <li key={category.id} className="sidebar-item">
          <div
            className={`sidebar-link-s ${expanded[category.id] && category.children.length > 0 ? 'parent-expanded' : ''}`}
          >
            <Link to={`/categories/subcategories/${category.id}`}>
              <div className='link-to-cate'>
                {category.nom_categorie && replaceUnderscoresWithSpaces(category.nom_categorie)}
              </div>
            </Link>

            <div
              className="sidebar-link"
              onClick={() => toggleCategory(category.id)}
            >
              {category.children.length > 0 && (
                <span className="toggle-icon">
                  {expanded[category.id] ? '-' : '+'}
                </span>
              )}
            </div>
          </div>
          {expanded[category.id] && category.children.length > 0 && (
            <div className="sidebar-children">
              {renderCategories(category.children)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'X' : '☰'}
      </button>

      {/* Sidebar Container */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">Categories</h2>
        <nav className="sidebar-menu">
          {categoryTree.map((category) => (
            <div key={category.id} className="sidebar-group">
              <div className="sidebar-link-s">
                <Link to={`/categories/subcategories/${category.id}`}>
                  <div className='link-to-cate'>
                    {category.nom_categorie && replaceUnderscoresWithSpaces(category.nom_categorie)}
                  </div>
                </Link>

                <div
                  className="sidebar-link"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.children.length > 0 && (
                    <span className="toggle-icon">
                      {expanded[category.id] ? '-' : '+'}
                    </span>
                  )}
                </div>
              </div>
              {expanded[category.id] && category.children.length > 0 && (
                <div className="sidebar-children">
                  {renderCategories(category.children)}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
