import React from 'react'
import './HeroBoutic.css';
import { useTranslation } from 'react-i18next';

const HeroBoutic = () => {
    const { t } = useTranslation();

    return (
        <>
            <div class="hero-boutic-container">
                <div class="hero-boutic-content">
                    <h1>{t('articles.title1')}</h1>
                    <p>{t('articles.text')}</p>
                </div>
                <div className="bg-tran-black"></div>
            </div>
        </>
    )
}

export default HeroBoutic