import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../services/localData';

import "./CardMell.css"

const CardBout = ({ id, name, price, image, stock, createdAt }) => {

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
      <div className="product-Mcard">
        <div className="product-Mimage">
          <img src={image} alt={name} />
        </div>
        <div className="product-Mdetails">
          <div className="product-Mname">{name}</div>
          <div className="product-Mprice">{price} DH</div>
        </div>
        <div><a href="#" onClick={handleAddProduct} className="buy-Mbutton">+ Ajouter</a></div>
      </div>

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
  )
}

export default CardBout