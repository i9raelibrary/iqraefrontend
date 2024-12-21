import React from 'react';
import iqraeimage from '../../../Assets/iqraelocation.jpg';
import './MapGPS.css';
import { useTranslation } from 'react-i18next';

const MapGPS = () => {
    const mapURL = "https://maps.app.goo.gl/FYLDcTbyzqofX7c66";
    const { t } = useTranslation();
    return (
        <div className="map-gps-container">
            <h4 className="map-gps-title">{t('home.location')}</h4>
            <div className="map-gps-content">
                {/* Google Maps iframe */}
                <div className="map-iframe-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d321.32786061456414!2d-5.0188742!3d34.0199576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b64a70c62cb%3A0x445a669b9f26c000!2z2YXZg9iq2KjYqSDZiNix2KfZgtipINin2YLYsdij!5e1!3m2!1sen!2sma!4v1732309737328!5m2!1sen!2sma"
                        width="600"
                        height="450"
                        style={{ border: '0' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="google-map-iframe"
                        title="Iqrae Location"
                    />
                </div>

                {/* Image Section */}
                <div className="map-image-container">
                    <img src={iqraeimage} alt="Iqrae Location" className="map-image" />
                </div>
            </div>
        </div>
    );
};

export default MapGPS;
