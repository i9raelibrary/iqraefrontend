import React from 'react';
import { useTranslation } from 'react-i18next';
import CompleteNavbar from '../../components/CompleteNavbar/CompleteNavbar';
import BottomInscription from '../../components/BottomInscription/BottomInscription';

const TermsConditions = () => {
    const { t } = useTranslation();

    return (
        <>
            <CompleteNavbar />
            <div style={{ maxWidth: "1000px", margin: "2rem auto" }}>
                <div className="terms-conditions bg-gray-50 p-4 text-gray-800">
                    <center>
                        <h1 className="text-3xl font-bold mb-3">{t('terms.title')}</h1>
                    </center>
                    <section className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{t('terms.use_of_website.title')}</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{t('terms.use_of_website.point_1')}</li>
                            <li>{t('terms.use_of_website.point_2')}</li>
                            <li>{t('terms.use_of_website.point_3')}</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{t('terms.rules.title')}</h2>
                        <ul className="list-decimal list-inside space-y-2">
                            <li>{t('terms.rules.point_1')}</li>
                            <li>{t('terms.rules.point_2')}</li>
                            <li>{t('terms.rules.point_3')}</li>
                            <li>{t('terms.rules.point_4')}</li>
                            <li>{t('terms.rules.point_5')}</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{t('terms.admin.title')}</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{t('terms.admin.point_1')}</li>
                            <li>{t('terms.admin.point_2')}</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{t('terms.delivery.title')}</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{t('terms.delivery.point_1')}</li>
                            <li>{t('terms.delivery.point_2')}</li>
                            <li>{t('terms.delivery.point_3')}</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{t('terms.liability.title')}</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{t('terms.liability.point_1')}</li>
                            <li>{t('terms.liability.point_2')}</li>
                            <li>{t('terms.liability.point_3')}</li>
                        </ul>
                    </section>

                    <h1 className="text-3xl font-bold mb-3">{t('privacy.title')}</h1>

                    <section className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{t('privacy.data_collection.title')}</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{t('privacy.data_collection.point_1')}</li>
                            <li>{t('privacy.data_collection.point_2')}</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{t('privacy.data_usage.title')}</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{t('privacy.data_usage.point_1')}</li>
                            <li>{t('privacy.data_usage.point_2')}</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{t('privacy.users_rights.title')}</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{t('privacy.users_rights.point_1')}</li>
                            <li>{t('privacy.users_rights.point_2')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">{t('privacy.security.title')}</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{t('privacy.security.point_1')}</li>
                            <li>{t('privacy.security.point_2')}</li>
                        </ul>
                    </section>
                </div>
            </div>

            <BottomInscription />
        </>
    );
};

export default TermsConditions;
