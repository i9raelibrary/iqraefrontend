import React from 'react'
import './BottomInscription.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const BottomInscription = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="signup-container">
                <div className="signup-content">
                    <h1>{t('home.signService')}</h1>
                    <div className="signup-form">
                        <input type="email" placeholder="Email address" />
                        <button>{t('home.signupEmail')}</button>
                    </div>
                </div>
                <div className="bg-tran-black"></div>
            </div>

            <div className="line-bottom"></div>

            <footer className='footer-bottom'>
                {t('footer.wish')} {" "}
                <Link to="/termsconditions" className='text-blue-500' >terms & conditions</Link>
            </footer>
        </>
    )
}

export default BottomInscription