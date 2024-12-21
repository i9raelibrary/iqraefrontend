import React from "react";
import { useState } from "react";
import "./Decouvrir.css";
import { useFetchPRODUCTSRandomllyQuery } from "../../services/articleApi";
import CardBout from "./cardMelleur/cardMell";
import { LodingCircular } from "../index";
import { useTranslation } from "react-i18next";

const Decouvrir = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isFetching, refetch } = useFetchPRODUCTSRandomllyQuery();

  const goToPrevious = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? data?.length - 1 : currentIndex - 1
    );
    refetch();
  };

  // if (isFetching) { return <LodingCircular /> }

  const goToNext = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === data?.length - 5 ? 0 : currentIndex + 1
    );
    refetch();
  };

  return (
    <>
      <div className="background-d">
        <p>{t("home.collections")}</p>
      </div>
      <br />
      <div className="slider-container">
        <div className="slider">
          <button onClick={goToPrevious} className="slider-button left">
            ❮
          </button>
          <div
            style={{ transform: `translateX(-${currentIndex * 0}px)` }}
            className={`slider-track ${isFetching ? "fetchProductList" : ""}`}
          >
            {data &&
              data.data &&
              data.data?.map((product) => (
                <CardBout
                  key={product.id}
                  name={product.nom}
                  price={product.puv}
                  image={product.image}
                />
              ))}
            {isFetching && (
              <CardBout key={0} name="Loading..." price="Loading..." image="" />
            )}
          </div>
          <button
            onClick={goToNext}
            className="slider-button right"
            disabled={isFetching}
          >
            ❯
          </button>
        </div>
      </div>
    </>
  );
};

export default Decouvrir;
