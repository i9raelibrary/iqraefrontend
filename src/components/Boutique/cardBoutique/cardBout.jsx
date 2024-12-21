import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../services/localData';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import Article from '../../Article/Article'; // Import du composant Article
import './CardMell.css';

const CardBout = ({ id, name, price, image, stock, createdAt }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddProduct = () => {
    const newProduct = { id, name, price, image, stock, createdAt };
    dispatch(addProduct(newProduct));
    setOpenModal(true);
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src={image} alt={name} />
        </div>
        <div className="product-details-one">
          <div className="product-name">{name}</div>
          <div className="product-price">{price} DH</div>
        </div>
        <div className="btn-con">
          <button onClick={handleAddProduct} className="buttonHeroCard buy-button">
            <span className='svgShape pluss'>+</span> <span className='AddText'>{t('home.addButton')}</span>
          </button>
        </div>
      </div>

      {/* Modal pour afficher le composant Article */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            m: 2,
          },
        }}
      >
        <Article
          product={{ id, name, price, image, stock, createdAt }}
        />
      </Dialog>
    </>
  );
};

export default CardBout;
