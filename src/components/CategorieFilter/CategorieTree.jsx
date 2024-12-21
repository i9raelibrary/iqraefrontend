import './categFilterList.css'
import React, { useRef, useState, useEffect } from "react";

// Composant récursif pour afficher les catégories
const CategorieTree = ({ categorie, propAppel = {} }) => {
  const { appel, setAppel } = propAppel;
  // const {categsForFilter, setCategsForFilter} = categsFiltered;
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef(null); // Référence pour suivre la div
  useEffect(() => {
    // Ajoute un gestionnaire d'événements global
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Nettoie le gestionnaire d'événements global à la destruction du composant
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Vérifie si le clic est à l'extérieur du composant référencé
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsVisible(false); // Cache le composant
    }
  };


  const handleFiltringProduct = (categorie) => {
    setIsVisible(!isVisible);
    if (categorie) {
      setAppel(categorie);
    }
  }


  function replaceUnderscoresWithSpaces(name) {
    // Remplacer les underscores par des espaces
    const replaced = name.replace(/_/g, ' ');

    // Mettre en majuscule la première lettre
    return replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase();
  }

  return (
    <div ref={divRef} className='parent-child'>
      {/* Affichage de la catégorie actuelle */}
      <button onClick={() => handleFiltringProduct(categorie)} className='parent-btn'>
        {categorie.nom_categorie && replaceUnderscoresWithSpaces(categorie.nom_categorie)} <span style={{ 'fontSize': '20px' }}>&#8631;</span>
      </button>

      {/* Affichage des enfants s'il y en a */}
      {categorie.children && categorie.children.length > 0 && (
        <div>
          {categorie.children.map((child) => (
            <div key={child.id}>
              {!isVisible && <div>
                <button className='childsButton' onClick={() => { setIsVisible(!isVisible), handleFiltringProduct(child) }}>{child.nom_categorie && replaceUnderscoresWithSpaces(child.nom_categorie)}</button>
              </div>}
              {isVisible && <div >
                <CategorieTree key={child.id} categorie={child} propAppel={propAppel} />
              </div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Composant principal pour afficher l'arborescence
const CategorieDisplay = ({ categories, propAppel = {} }) => {
  const { appel, setAppel } = propAppel;
  // const { categsForFilter, setCategsForFilter } = categsFiltered;
  return (
    <div className='categ-tree'>
      {appel && <CategorieTree key={categories.id} categorie={categories} propAppel={{ appel, setAppel }} />}
    </div>
  );
};

export default CategorieDisplay