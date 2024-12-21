import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../services/localData';
import Article from '../../Article/Article';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import './CardMell.css';
import { useTranslation } from 'react-i18next';

const cardMell = ({ id, name, price, image, stock, createdAt }) => {
  const {t}=useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    const newProduct = { id, name, price, image, stock, createdAt };
    dispatch(addProduct(newProduct));
    setSelectedProduct(newProduct);
    setOpenModal(true);
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src={`http://localhost:3306/images/${image}`} alt={name} />
        </div>
        <div className="product-details-one">
          <div className="product-name">{name}</div>
          <div className="product-price">{price} DH</div>
        </div>
        <div className="btn-con">
          <button onClick={handleAddProduct} className="buy-button">
            + {t('home.disbtn')}
          </button>
        </div>
      </div>

      {/* Modal for Article */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '900px',
            width: '100%',
            borderRadius: '12px',
            padding: '20px',
          },
        }}
      >
        {/* Close button */}
        <Button
          color="secondary"
          onClick={() => setOpenModal(false)}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            fontSize: '1.2em',
            padding: 0,
            minWidth: 'unset',
            cursor: 'pointer',
          }}
        >
          &times;
        </Button>

        {/* Article component */}
        <Article product={selectedProduct} />

        {/* Dialog Actions */}
        <DialogActions>
          <Button
            onClick={() => setOpenModal(false)}
            color="primary"
            sx={{
              fontSize: '1em',
              textTransform: 'none',
              padding: '8px 16px',
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default cardMell;
