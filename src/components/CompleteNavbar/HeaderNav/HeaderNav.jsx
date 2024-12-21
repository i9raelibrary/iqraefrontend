import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTiktok, FaShoppingCart } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LanguageSwitcher } from '../../LanguageSwi/LanguageSwi';
import './HeaderNav.css';
import { useTranslation } from 'react-i18next';

const HeaderNav = () => {
     const { t } = useTranslation();
     const [BascketItems, SetBascketItems] = useState(null);
     const [dropDown, setDropDown] = useState(false);
     const navigate = useNavigate();
     const clientToken = localStorage.getItem('ClientToken');
     const adminToken = localStorage.getItem('AdminToken');
     useEffect(() => {
          SetBascketItems(localStorage.getItem('basket'));
     }, [BascketItems])


     const logoutUser = () => {
          if (adminToken) {
               localStorage.removeItem('AdminToken');
          } else if (clientToken) {
               localStorage.removeItem('ClientToken');
          }
          setDropDown(false); // Close dropdown after logout
     };

     const toggleDropDown = () => setDropDown(!dropDown);

     return (
          <header className='main-header'>
               <div className='header-container'>
                    {/* Social Media Links */}
                    <div className='social-media'>
                         <a href='#'><FaFacebook /></a>
                         <a href='#'><FaSquareInstagram /></a>
                         <a href='#' onClick={() => navigate('/parametre')}><BsTelephoneForwardFill /></a>
                    </div>

                    {/* Search Bar */}
                    <div className='search-container'>
                         <div className="search">
                              <input type="text" placeholder={t('nav.search')} />
                              <FiSearch />
                         </div>
                    </div>
                    {/* Connection and Cart */}
                    <div className='connexion-cart'>
                         <div className="cart text-bold">
                              <Link className='navLincks' to='/'>
                                   {t('nav.home')}
                              </Link>
                         </div>
                         <div className="cart text-bold">
                              <Link className='navLincks' to='/articles'>
                                   {t('nav.articles')}
                              </Link>
                         </div>
                         <div className="cart text-bold">
                              <Link className='navLincks' to='/About'>
                                   {t('nav.about').replace(/_/g, ' ')}
                              </Link>
                         </div>
                         <div className="cart">
                              <Link to='/order'>
                                   <FaShoppingCart style={{ fontSize: '1.5rem', color: 'white' }} />
                              </Link>
                              <div className={BascketItems ? "dot" : ""}></div>
                         </div>

                         {clientToken || adminToken ? (
                              <div className="drop-container">
                                   <button onClick={toggleDropDown} className="dropdown-btn">
                                        <AccountCircleIcon
                                             sx={{
                                                  fontSize: "35px",
                                                  "&:hover": {
                                                       color: "#efefef",
                                                       cursor: "pointer"
                                                  }
                                             }}
                                        />

                                   </button>

                                   {dropDown && (
                                        <div className='drop-down-container'>
                                             <div className='drop-down-menu'>
                                                  <Link sx={{ color: '#ffffff}' }} className='link' to={adminToken ? "/dashboard/profile" : "/client/profile"} onClick={() => setDropDown(false)}>
                                                       {t('nav.profile')}
                                                  </Link>
                                                  <Link className='link' to={adminToken ? "/dashboard/orders" : "/client/orders"} onClick={() => setDropDown(false)}>
                                                       {t('nav.orders')}
                                                  </Link>
                                                  <Link className='link' to={adminToken ? "/dashboard" : "/client"} onClick={() => setDropDown(false)}>
                                                       {t('nav.dashboard')}
                                                  </Link>
                                                  <Link className='link' to="/" onClick={logoutUser}>
                                                       {t('nav.logout')}
                                                  </Link>
                                             </div>
                                        </div>
                                   )}
                              </div>
                         ) : (
                              <div className="connexion">
                                   <Link to="/Login">{t('nav.connect')}</Link>
                              </div>
                         )}
                    </div>
                    <LanguageSwitcher />
               </div>
          </header>
     );
};

export default HeaderNav;
