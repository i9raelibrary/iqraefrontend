import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'material-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './SideBare.css';

const SideBar = () => {
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
    { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
    { path: '/dashboard/Clients', name: 'Clients', icon: 'group' },
    { path: '/dashboard/Insert', name: 'Insert', icon: 'add_circle' },
    { path: '/dashboard/Categories', name: 'Categories', icon: 'category' },
    { path: '/dashboard/Package', name: 'Package', icon: 'inventory_2' },
    { path: '/dashboard/orders', name: 'orders', icon: 'receipt_long' },
    { path: '/dashboard/Products', name: 'Products', icon: 'view_in_ar' },
    { path: '/dashboard/arabe', name: 'arabe', icon: 'format_textdirection_r_to_l' },
    { path: '/dashboard/notifications', name: 'Notifications', icon: 'notifications' },
    { path: '/dashboard/profile', name: 'Profile', icon: 'person' },
    { path: '/dashboard/storemanager', name: 'Store manager', icon: 'person' },
  ];

  return (
    <>
      <button
        className={`d-flex btn btn-dark d-xl-none d-block ${
          isMenuOpen ? 'd-none d-xl-block' : 'show'
        }`}
        onClick={toggleMenu}
        style={{ position: 'fixed', top: '19px', left: '10px', zIndex: 1000 }}
      >
        <i className="material-icons">menu</i>
      </button>

      <aside
        className={`z-3 navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 bg-white my-2 ${
          isMenuOpen ? 'show' : 'sidenav d-none d-xl-block'
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
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ms-1 text-sm text-dark">Iqrae Admin</span>
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
                {route.name === 'Notifications' && notifications > 0 && (
                  <span
                    className="position-absolute badge-notification"
                    style={{
                      backgroundColor: '#6CD96D',
                      borderRadius: '50%',
                      width: '8px',
                      height: '8px',
                      top: '50%',
                      right: '20px',
                      transform: 'translateY(-50%)',
                    }}
                  ></span>
                )}
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
              retourne
            </Link>
            <Link
              className="btn bg-gradient-dark w-100"
              to="/"
              onClick={logoutUser}
              rel="noopener noreferrer"
            >
              Log out
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
