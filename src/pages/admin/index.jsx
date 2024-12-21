import React, { useEffect, useState } from 'react'
import SideBar from '../../Admin/components/sideBar/SideBar'
import Dashboard from '../../Admin/components/Dashboard/Dashboard'
import Clients from '../../Admin/components/Clients/Clients'
import Profile from '../../Admin/components/Profile/Profile'
import Orders from '../../Admin/components/Orders/Orders'
import Insert from '../../Admin/components/Insert/Insert'
import Categories from '../../Admin/components/categores/Categories'
import Products from '../../Admin/components/Products/Products'
import Notifications from '../../Admin/components/Notifications/Notifications'
import Package from '../../Admin/components/package/Package'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../Admin/assets/css/material-dashboard.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import StoreManager from '../../Admin/components/StoreManager/StoreManager'

const Admin = ({ isAdmin }) => {

  if (isAdmin) {

    return (
      <div className="admin-conatainer g-sidenav-show  bg-gray-100">
        <ToastContainer />
        <SideBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Clients" element={<Clients />} />
          <Route path="/Insert" element={<Insert />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Package" element={<Package />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/notifications" element={<Notifications />} />

          <Route path='/storemanager'element={<StoreManager />} />
         </Routes>
      </div>
    )
  }
}

export default Admin
