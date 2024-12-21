import React, { useEffect, useState } from "react";
import { CardBout, LodingCircular } from "../index";
import { useFetchAllQuery } from "../../services/articleApi";
import "./filtered.css";

function FilteredProducts({ categsFiltered }) {
  const { data, isFetching } = useFetchAllQuery();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  // const { appel, setAppel } = propAppel || {};
  const { categsForFilter, setCategsForFilter } = categsFiltered || {};

  useEffect(() => {
    if (data) {
      setArticles(data);
      setFilteredArticles(data);
    }
  }, [data]);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getProductsByCategorie = (categorie, articles) => {
    let products = [];

    const recursiveFetch = (currentCategorie) => {
      if (currentCategorie.children && currentCategorie.children.length > 0) {
        currentCategorie.children.forEach((child) => {
          recursiveFetch(child); // Appel récursif
        });
      } else {
        const prods = articles.filter(
          (arti) => arti.categorie_id === currentCategorie.id
        );
        products = products.concat(prods);
      }
    };

    recursiveFetch(categorie);
    return products;
  };

  useEffect(() => {
    if (categsForFilter && categsForFilter.length > 0 && articles.length > 0) {
      const filteredProducts = getProductsByCategorie(
        categsForFilter[categsForFilter.length - 1],
        articles
      );
      setFilteredArticles(filteredProducts);
    }
  }, [categsForFilter, articles]);

  const pageSize = 8; // Number of items per page

  // Calculate paginated data
  const totalItems = filteredArticles?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredArticles?.slice(
    startIndex,
    startIndex + pageSize
  );

  if (isFetching) {
    return <LodingCircular />;
  }

  function replaceUnderscoresWithSpaces(name) {
    // Remplacer les underscores par des espaces
    const replaced = name.replace(/_/g, " ");

    // Mettre en majuscule la première lettre
    return replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase();
  }

  console.log(paginatedData);
  return (
    <>
      <div className="boutique-title">
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
          Éspace{" "}
          {categsForFilter[categsForFilter.length - 1] &&
            replaceUnderscoresWithSpaces(
              categsForFilter[categsForFilter.length - 1].nom_categorie
            )}
        </div>
      </div>

      <div className="boutique">
        {paginatedData.length > 0 ? (
          paginatedData.map((product) => (
            <CardBout
              key={product.id}
              name={product.nom}
              price={product.puv}
              stock={product.stock}
              createdAt={product.createdAt}
              image={`http://localhost:3306/images/${product.image}`}
            />
          ))
        ) : (
          <div
            style={{
              border: "1px solid pink",
              padding: "10px",
              borderRadius: "20px",
              backgroundColor: "pink",
              color: "white",
              fontWeight: "600",
            }}
          >
            {" "}
            Aucun Produit dans cette Catégorie{" "}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span>
          {currentPage} - {totalPages == 0 ? 1 : totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === totalPages || currentPage === totalPages + 1
          }
        >
          {">"}
        </button>
      </div>
    </>
  );
}

export default FilteredProducts;
