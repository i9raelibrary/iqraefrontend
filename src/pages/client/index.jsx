import React, { useEffect, useState } from 'react'
import SideBar from '../../Client/components/sideBar/SideBar'
import Dashboard from '../../Client/components/Dashboard/Dashboard'
import Profile from '../../Client/components/Profile/Profile'
import Orders from '../../Client/components/Orders/Orders'

import Package from '../../Client/components/Package/Package'
import Clients from '../../Client/components/Clients/Clients'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../Client/assets/css/material-dashboard.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import { LanguageSwitcher } from '../../components/LanguageSwi/LanguageSwi';


const Client = () => {


    return (

      <div className="admin-conatainer g-sidenav-show  bg-gray-100">
        <LanguageSwitcher />
        <ToastContainer />
        <SideBar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/package" element={<Package />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </div>
    )
}

export default Client
