import React, { useEffect, useState } from 'react'
import { Client, Admin, Home } from './pages/index'
import { LoginForme, SignupForm, Boutique } from './components/index'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Order from './components/Order/Order';
import Filter from './pages/FilterCategorie/Filter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useVerifyTokenMutation } from './services/AdminApi';
import AboutPage from './components/About/AboutPage';
import TermsConditions from './components/TermsConditions/TermsConditions';

const App = () => {

  const [role, setRole] = useState({ role: '' });
  const [CurrentToken, SetCurrentToken] = useState(true);
  const [isClient, SetIsClient] = useState(false);
  const [verifyToken] = useVerifyTokenMutation();


  useEffect(() => {
    const verify = async () => {
      try {
        let token = localStorage.getItem("AdminToken");
        if (!token) {
          SetCurrentToken(false);
          token = localStorage.getItem("ClientToken");
          if (token) {
            const clientResult = await verifyToken({ token });
            console.log("client", clientResult);
            if (clientResult.data.client) {
              SetIsClient(true);
            }
          }
        } else {
          const adminResult = await verifyToken({ token });
          console.log("admin", adminResult)
          if (adminResult.data.admin) {
            SetCurrentToken(adminResult.data.admin);
          } else {
            token = localStorage.getItem("ClientToken");
            if (token) {
              const clientResult = await verifyToken({ token });
              if (clientResult.data.client) {
                SetIsClient(true);
              }
            }
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
      }
    };

    verify();
  }, [CurrentToken, isClient]);


  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/categories/subcategories/:id" element={<Filter />} />
          <Route path="/dashboard/*" element={CurrentToken == true ? <Admin isAdmin={CurrentToken} /> : <Navigate to={'/'} />} />
          <Route path="/Login" element={<LoginForme />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/articles" element={<Boutique />} />
          <Route path="/order" element={<Order />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/termsconditions" element={<TermsConditions />} />

          // client's Routes
          <Route path="/client/*" element={isClient == true ? <Client /> : <Navigate to={'/'} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App