import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loding = () => {
  return (
    <Box sx={{ display: 'flex' ,  height: '300px', alignItems:'center', justifyContent: 'center'}}>
      <CircularProgress />
    </Box>
  )
}

export default Loding
