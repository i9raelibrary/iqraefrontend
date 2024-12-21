import React from "react";
import { check, validationResult } from 'express-validator';
import { useFetchNestedCategoriesQuery } from "../../../services/CategorieApi";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { header } from "express-validator";

const Navbar = () => {
  const { data, isFetchingNested } = useFetchNestedCategoriesQuery();

  // Filter categories with parent_id null
  const rootCategories = data?.filter(
    (category) => category.parent_id === null
  );

  const renderNestedMenu = (categories) => {
    return (
      <ul className="dropdown-menu">
        {categories.map((category) => (
          <Link
            to={`/categories/subcategories/${category.id}`}
            key={category.id}
          >
            <li className="dropdown-item"  style={{padding:'10px'}}>
              {category.nom_categorie && replaceUnderscoresWithSpaces(category.nom_categorie)}
              {category.children.length > 0 &&
                renderNestedMenu(category.children)}
            </li>
          </Link>
        ))}
      </ul>
    );
  };

  function replaceUnderscoresWithSpaces(name) {
    // Remplacer les underscores par des espaces
    const replaced = name.replace(/_/g, " ");

    // Mettre en majuscule la première lettre
    return replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase();
  }

  if (isFetchingNested) {
    return <div>Loading...</div>;
  }

  return (
    <header style={{ backgroundColor: "#f0f6ff", boxShadow: '0 5px 5px #00000074', zIndex: 100 }}>
      <nav className="iq-nav">
        <ul className="menu">
          {rootCategories?.map((category) => (
            <li key={category.id} className="menu-item">
              <Link style={{color: "black", fontWeight: "500"}}
                to={`/categories/subcategories/${category.id}`}
                key={category.id}
              >
                {category.nom_categorie && replaceUnderscoresWithSpaces(category.nom_categorie)}
              </Link>
              {category.children.length > 0 &&
                renderNestedMenu(category.children)}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
