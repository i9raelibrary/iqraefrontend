import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./PopularProducts.css";
import { useFetchAllPRODUCTSQuery } from "../../services/articleApi";
import { useTranslation } from "react-i18next";
import PopularCard from "../PopularCard/PopularCard";
import { LodingCircular } from "../index";

const PopularProducts = () => {
    const { t } = useTranslation();
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);
  const { data, isFetching, refetch } = useFetchAllPRODUCTSQuery({
    start,
    limit,
  });
  // console.log("data", data);
  const pageSize = 4; // Number of items per page
  // Calculate paginated data
  useEffect(() => {
    setTotalItems(data && data.paginatedProducts?.length || 0);
    setTotalPages(Math.ceil(totalItems / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    setPaginatedData(data && data.paginatedProducts);
  }, [start, limit, data]);

  if (isFetching) return <LodingCircular />;

  const goToPrevious = (newPage) => {
    setStart((prevValue) => prevValue - 4);
    setLimit((prevLimit) => prevLimit - 4);
    setCurrentPage(newPage);
    refetch();
  };

  const goToNext = (newPage) => {
    setStart(limit);
    setLimit((prevLimit) => prevLimit + 4);
    setCurrentPage(newPage);
    refetch();
  };
  return (
    <div className="mygradient position-relative d-flex justify-content-center">
      <div className="whiteBcgr"></div>
      <div className="background w-90">
        <p className="titreDeco" >{t("home.titre1")}</p>
      </div>
      <div className="containerPop w-90 mt-8">
        {/* 
        {isFetching &&
          <div style={{ maxWidth: '1000px', margin: 'auto' }} >
            <LodingCircular />
          </div>
        } */}
        <div className="slider">
        <button
          className="slider-button left"
          onClick={() => goToPrevious(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

          {/* Slider Track */}
          <div className="d-flex" >
            { data && Array.isArray(data.paginatedProducts) &&
              data.paginatedProducts?.map((product, index) => (
                <PopularCard
                  key={product.id}
                  id={product.id}
                  name={product.nom}
                  price={product.puv}
                  stock={product.stock}
                  createdAt={product.createdAt}
                  category={product.categorieName}
                  image={`http://localhost:3306/images/${product.image}`}
                />
              ))}
          </div>

          <button
          className="slider-button right"
          onClick={() => goToNext(currentPage + 1)}
          disabled={isFetching || (paginatedData && data.ProductsNb - 1 < limit)}
        >
          {">"}
        </button>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
