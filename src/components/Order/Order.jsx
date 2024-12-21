import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, FormControlLabel, TextField, Button, Box, Typography } from '@mui/material';

import Empty from "./Empty.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import { HeaderNav, HeroBoutic, BouticProducts, BottomInscription, Navbar, Sidebar } from '../index';
import { useCreateCommandMutation } from '../../services/CommandeApi.js';
import { useFindCurrentClientMutation } from '../../services/ClientApi.js';
import { toast } from 'react-toastify';
import CompleteNavbar from '../CompleteNavbar/CompleteNavbar.jsx';
import { useTranslation } from 'react-i18next';

const Order = () => {
    const { t } = useTranslation();

    const [userInfo, setUserInfo] = useState({
        email: '',
        prenom: '',
        nom: '',
        telephone: '',
        address: '',
        payOnDelivery: false,
        payOnMagazine: false,
    });

    const handleCheckboxChange = (field) => () => {
        setUserInfo({
            ...userInfo,
            payOnDelivery: field === 'payOnDelivery' ? !userInfo.payOnDelivery : false,
            payOnMagazine: field === 'payOnMagazine' ? !userInfo.payOnMagazine : false,
        });
    };

    const [createCommand, { isLoading, isSuccess, isError, error }] = useCreateCommandMutation();
    const [findCurrentClient, { isLoading: loading }] = useFindCurrentClientMutation();
    const [basketItems, setBasketItems] = useState([]);


    const [total, SetTotal] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const id = localStorage.getItem("ClientToken");
                const user = await findCurrentClient({ id }).unwrap();
                if (user) {
                    setUserInfo({
                        email: user.email,
                        prenom: user.prenom,
                        nom: user.nom,
                        telephone: user.contact,
                        address: user.adresse
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserData();
    }, []);

    // for the basket
    useEffect(() => {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        setBasketItems(basket);
    }, []);

    useEffect(() => {
        if (basketItems.length > 0) {
            localStorage.setItem('basket', JSON.stringify(basketItems));
        }
    }, [basketItems]);

    const handleIncrease = (id) => {
        setBasketItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity < item.stock
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };
    const handleDecrease = (id) => {
        setBasketItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };
    const handleRemove = (id) => {
        setBasketItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== id);
            if (updatedItems.length === 0) {
                localStorage.removeItem('basket'); // Remove the basket key if no items remain
            } else {
                localStorage.setItem('basket', JSON.stringify(updatedItems)); // Update localStorage if items remain
            }
            return updatedItems;
        });
    };
    const totalQuantity = basketItems.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const handleSubmit = async () => {
        const totalPrice = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const orderData = {
            userInfo,
            basketItems: basketItems.map(item => ({
                id: item.id,
                quantity: item.quantity,
                totalPrice: item.price * item.quantity
            })),
            totalPrice
        };
        const result = await createCommand(orderData).unwrap();
        if (result) {
            basketItems.map(item => (
                handleRemove(item.id)
            ));
            toast.success("Votre commande est en attente")
        } else {
            toast.error("Votre commande a une erreur!")
        }
    };

    const clientToken = localStorage.getItem('ClientToken');
    const logoutUser = () => {
        localStorage.removeItem('ClientToken');
    }



    return (
        <>
            <CompleteNavbar />
            <HeroBoutic />
            {(!basketItems.length) ? <Empty /> :
                <div className="whole-order-container">
                    <div className="basket-container">
                        <Typography variant="h5" align="center" sx={{}}>
                            {t('order.yourProduct')} 📦
                        </Typography>
                        <div className="basket-items">
                            {basketItems.map((item) => (
                                <div key={item.id} className="basket-item">
                                    <img src={item.image} alt={item.name} className="basket-item-image" />
                                    <div className="basket-item-details">
                                        <div className='flex justify-between'>
                                            <div>
                                                <center><h3>{item.name}</h3></center>
                                                <p><strong>🏷️ {t('order.price')}:</strong> {item.price} DH</p>
                                                <p><strong>📉 {t('order.stock')}:</strong> {item.stock}</p>
                                                <p><strong>👝 {t('order.quantity')}:</strong> {item.quantity}</p>
                                                <div className="quantity-controls">
                                                    <button onClick={() => handleDecrease(item.id)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => handleIncrease(item.id)}>+</button>
                                                </div>
                                            </div>
                                            <div className='delete-article'>
                                                <button onClick={() => handleRemove(item.id)} className="remove-button">
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {clientToken ?
                        <div className='user-info-form'>
                            <Box
                                sx={{
                                    maxWidth: 500,
                                    margin: 'auto',
                                    padding: 3,
                                    backgroundColor: '#fff',
                                }}
                            >
                                <Typography variant="h5" align="center" sx={{ margin: "1rem 0" }}>
                                    {t('order.enterInfo')}
                                </Typography>
                                <form>
                                    <div className='flex-inputs-inline'>
                                        <TextField
                                            label="Prenom"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                            value={userInfo.prenom}
                                            onChange={(e) => setUserInfo({ ...userInfo, prenom: e.target.value })}
                                        />
                                        <TextField
                                            label="Nom"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                            value={userInfo.nom}
                                            onChange={(e) => setUserInfo({ ...userInfo, nom: e.target.value })}
                                        />
                                    </div>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                        value={userInfo.email}
                                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                    />
                                    <TextField
                                        label="Numero telephone"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                        value={userInfo.telephone}
                                        onChange={(e) => setUserInfo({ ...userInfo, telephone: e.target.value })}
                                    />
                                    <TextField
                                        label="Addresse"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                        value={userInfo.address}
                                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={userInfo.payOnDelivery}
                                                onChange={handleCheckboxChange('payOnDelivery')}
                                            />
                                        }
                                        label="Pay on Delivery"
                                        required
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={userInfo.payOnMagazine}
                                                onChange={handleCheckboxChange('payOnMagazine')}
                                            />
                                        }
                                        label="Pay on Magazine"
                                        required
                                    />

                                    <div className='flex justify-between'>
                                        {/* Displaying total price dynamically */}
                                        <input type="text" value={`💰 Total: ${totalPrice} DH`} readOnly />


                                        {/* Display message about free delivery */}
                                        <div className="delivery-info">
                                            {totalQuantity > 3 ? (
                                                <p style={{ color: "green" }}>{t('order.free_delivery_message')}</p>
                                            ) : (
                                                <p style={{ color: "red" }}>{t('order.delivery_message')}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{
                                            marginTop: 1,
                                            padding: '0.3rem',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            borderRadius: '30px',
                                            backgroundColor: '#005A8B'
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        {t('order.order')}
                                    </Button>
                                </form>
                            </Box>
                        </div>
                        :
                        <div className='warning-card'>
                            <p>{t('order.messege1')} <Link to="/login" style={{ color: "blue" }}>{t('order.messege2')} </Link> {t('order.messege3')} <Link to='/register' style={{ color: "blue" }}>{t('order.messege4')}</Link>.</p>
                        </div>
                    }
                </div>
            }
            <BouticProducts />

            <BottomInscription />
        </>
    );
};

export default Order;
