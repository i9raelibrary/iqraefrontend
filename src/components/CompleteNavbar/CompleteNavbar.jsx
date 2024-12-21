
import React from 'react';
import HeaderNav from './HeaderNav/HeaderNav';
import { Box } from '@mui/material';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import { useMediaQuery } from "@mui/material";

const CompleteNavbar = () => {
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
        </>
    )
}

export default CompleteNavbar