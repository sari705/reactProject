import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Badge as CartBadge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "./css/navBar.css";
import LogOut from '../pages/LogOut';

function ResponsiveAppBar() {
    const role = useSelector(state => state.user.currentUser?.role);
    const isManager = role === "MANAGER";
    const isUser = role === "USER";
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const userName = useSelector(state => state.user.currentUser?.name);
    const disp = useDispatch();
    const navigate = useNavigate();
    const amountInCart = useSelector((state) => state.cart.amountInCart);

    const pages = [
        { name: 'דף הבית', path: '/home' },
        { name: 'מוצרים', path: '/products' },
        { name: 'סל הקניות', path: '/cart' },
        { name: 'התחבר', path: '/login' },
        ...(!role ? [
        { name: 'הרשם', path: '/signup' }] : [{ name: 'כל ההזמנות שלי', path: '/userorders' }]),
        ...(isManager ? [
            { name: 'הוסף מוצר', path: '/add-product' },
            { name: 'הזמנות', path: '/orders' },
            { name: 'משתמשים', path: '/users' }
        ] : [])
    ];

    return (
        <>
            <AppBar
                position="fixed"
                className="navBar" 
                sx={{
                    backgroundColor: "#BF7069",
                    transition: "background-color 0.3s ease-in-out",
               }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/home"
                            className="logoText"
                        >
                            <img src="/logo/logo2.png" alt="Logo" className="logoImage" />
                        </Typography>

                        <Box className="menuIcon">
                            <IconButton
                                size="large"
                                aria-label="open navigation"
                                onClick={(e) => setAnchorElNav(e.currentTarget)}
                                sx={{ display: { xs: 'flex', md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={() => setAnchorElNav(null)}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} component={Link} to={page.path} onClick={() => setAnchorElNav(null)}>
                                        {page.name}
                                    </MenuItem>
                                ))}
                            </Menu>

                            <IconButton component={Link} to="/cart">
                                <CartBadge badgeContent={amountInCart} color="primary" overlap="circular">
                                    <ShoppingCartIcon fontSize="small" />
                                </CartBadge>
                            </IconButton>
                        </Box>

                        <Box className="menuButtons" sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button key={page.name} component={Link} to={page.path} className="menuButton">
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box className="userMenu">
                            <Tooltip title="Open settings">
                                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} className="avatarButton">
                                    <Avatar alt={userName} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            <MenuItem key="Profile" onClick={() => { navigate("/profile"); setAnchorElUser(null); }}>
                                <Typography className="menuItem">Profile</Typography>
                            </MenuItem>
                            <LogOut/>
                        </Menu>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar >

            <div className="bodyContent">
                {/* התוכן של הדף יבוא כאן */}
            </div>
        </>
    );
}

export default ResponsiveAppBar;