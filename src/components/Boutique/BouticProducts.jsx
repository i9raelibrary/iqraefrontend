import React, { useEffect, useState } from "react";
import { CardBout, LodingCircular } from "../index";
import { useFetchAllPRODUCTSQuery } from "../../services/articleApi";
import "./Boutique.css";
import { useTranslation } from "react-i18next";
import { Avatar } from "@mui/material";

const BouticProducts = () => {
  const { t } = useTranslation();
  console.log(import.meta.env.REACT_APP_API_URL);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);
  const { data, isFetching, refetch } = useFetchAllPRODUCTSQuery({
    start,
    limit,
  });
  // console.log("data", data);
  const pageSize = 8; // Number of items per page
  // Calculate paginated data
  useEffect(() => {
    setTotalItems(data && data.paginatedProducts?.length || 0);
    setTotalPages(Math.ceil(totalItems / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    setPaginatedData(data && data.paginatedProducts);
  }, [start, limit, data]);

  if (isFetching) return <LodingCircular />;

  const goToPrevious = (newPage) => {
    setStart((prevValue) => prevValue - 8);
    setLimit((prevLimit) => prevLimit - 8);
    setCurrentPage(newPage);
    refetch();
  };

  const goToNext = (newPage) => {
    setStart(limit);
    setLimit((prevLimit) => prevLimit + 8);
    setCurrentPage(newPage);
    refetch();
  };

  return (
    <>
      <center>
        <h4>{t("articles.title2")}</h4>
      </center>
      <div className="boutique">
        {data.paginatedProducts?.map((product) => (
          <CardBout
            key={product.id}
            id={product.id}
            name={product.nom}
            price={product.puv}
            stock={product.stock}
            createdAt={product.createdAt}
            image={`http://localhost:3306/images/${product.image}`}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => goToPrevious(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <button
          onClick={() => goToNext(currentPage + 1)}
          disabled={isFetching || (paginatedData && data.ProductsNb - 1 < limit)}
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default BouticProducts;
