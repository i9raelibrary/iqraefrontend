import React from 'react'
import './Home.css'
import Hero from '../../components/Hero/Hero.jsx'
import PopularProducts from '../../components/PopularProducts/PopularProducts.jsx'
import { HeaderNav, Category, Navbar, Sidebar, Decouvrir, BottomInscription, MapGPS } from '../../components/index.jsx'
import WhatsIconFix from '../../components/WhatsIconFix/WhatsIconFix.jsx';
import StatsSection from '../../components/stats/StatsSection.jsx';
import MotivationSection from '../../components/motivation/MotivationSection.jsx'
import CommentSection from '../../components/comments/CommentSection.jsx'
import PackagesSection from '../../components/PackagesSection/PackagesSection.jsx'
import NewCard from '../../components/NewCard/NewCard'
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import PopularCardAnimation from '../../components/PopularCardAnimation/PopularCardAnimation.jsx'
import PackageSlider from '../../components/Packages/PackageSlider.jsx'


const Home = () => {
    const isAbove690px = useMediaQuery("(min-width: 690px)");
    return (
        <>
            <HeaderNav />
            <Box>
                {isAbove690px ? (
                    <Box>
                        <Navbar />
                    </Box>
                ) : (
                    <Box>
                        <Sidebar />
                    </Box>
                )}
            </Box>
            <Hero />
            <PopularProducts />
            <PopularCardAnimation />
            <PackageSlider />
            <PackagesSection />
            <Decouvrir />
            <NewCard />
            <Category />
            <StatsSection />
            <MotivationSection />
            <CommentSection />
            <MapGPS />
            <BottomInscription />
            <WhatsIconFix />
        </>
    )
}

export default Home;