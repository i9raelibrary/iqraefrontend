import React, { useState } from 'react';
import { HeaderNav, BouticProducts, LodingCircular, BottomInscription } from '../index';
import { useFetchAllPRODUCTSQuery } from '../../services/articleApi';
import HeroBoutic from '../HeroBoutic/HeroBoutic';
import './Boutique.css';
import CompleteNavbar from '../CompleteNavbar/CompleteNavbar';

const Boutique = () => {
  console.log(import.meta.env.REACT_APP_API_URL);

  return (
    <>
      <CompleteNavbar />

      <HeroBoutic />

      <BouticProducts />

      {/* inscrition footer */}
      <BottomInscription />

    </>
  );
};

export default Boutique;
