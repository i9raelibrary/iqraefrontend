import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'material-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './SideBare.css';

const SideBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [notifications, setNotifications] = useState(1);

  const logoutUser = () => {
    localStorage.removeItem('ClientToken');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleResize = () => {
      if (mediaQuery.matches) {
        setIsMenuOpen(false);
      }
    };
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const routes = [
    { path: '/client', name: t('sidebar.dashboard'), icon: 'dashboard' },
    { path: '/client/profile', name: t('sidebar.profile'), icon: 'person' },
    { path: '/client/orders', name: t('sidebar.orders'), icon: 'receipt_long' },
    { path: '/client/package', name: t('sidebar.package'), icon: 'inventory_2' },
    // { path: '/client/clients', name: t('sidebar.clients'), icon: 'group' },
  ];

  return (
    <>
      <button
        className={`d-flex btn btn-dark d-xl-none d-block ${isMenuOpen ? 'd-none d-xl-block' : 'show'}`}
        onClick={toggleMenu}
        style={{ position: 'fixed', top: '19px', left: '10px', zIndex: 1000 }}
      >
        <i className="material-icons">menu</i>
      </button>

      <aside
        className={`z-3 navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 bg-white my-2 ${isMenuOpen ? 'show' : 'sidenav d-none d-xl-block'
          }`}
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <button
            className="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-xl-none"
            aria-hidden="true"
            onClick={toggleMenu}
          ></button>
          <Link
            className="headNavbar px-4 py-3 m-0"
            to="/"
          >
            <span className="ms-1 text-sm text-dark">{t('sidebar.welcomeMessage')}</span>
          </Link>
        </div>
        <hr className="horizontal dark mt-0 mb-2" />
        <div className="navbar-collapse w-auto" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            {routes.map((route) => (
              <li className="nav-item position-relative" key={route.path}>
                <Link
                  className={
                    location.pathname === route.path
                      ? 'nav-link active bg-gradient-dark text-white'
                      : 'nav-link text-dark'
                  }
                  to={route.path}
                >
                  <i className="material-icons opacity-5">{route.icon}</i>
                  <span className="nav-link-text ms-1">{route.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidenav-footer position-absolute w-100 bottom-0">
          <div className="mx-3">
            <Link
              className="btn btn-outline-dark mt-4 w-100"
              to="/"
              rel="noopener noreferrer"
            >
              {t('sidebar.back')}
            </Link>
            <Link
              className="btn bg-gradient-dark w-100"
              to="/"
              onClick={logoutUser}
              rel="noopener noreferrer"
            >
              {t('sidebar.logout')}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
