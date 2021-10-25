import React from 'react';
import Header from './Header/Header';
import Divider from '@mui/material/Divider';

const Layout = ({ children }) => {
    return (
        <>
            <Header></Header>
            <Divider></Divider>
            {children}
        </>
    )
}

export default Layout;