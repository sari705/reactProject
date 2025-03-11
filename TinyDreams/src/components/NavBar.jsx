import * as React from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userOut } from '../features/userSlice';
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

import "./css/navBar.css"; // קובץ ה-CSS

function ResponsiveAppBar() {
    const role = useSelector(state => state.user.currentUser?.role);
    const isManager = role === "MANAGER";

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const userName = useSelector(state => state.user.currentUser?.name);
    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const disp = useDispatch();
    const navigate = useNavigate();
    const amountInCart = useSelector((state)=>state.cart.amountInCart)

    // דפים לפי הרשאות
    const pages = [
        { name: 'דף הבית', path: '/home' },
        { name: 'מוצרים', path: '/products' },
        { name: 'סל הקניות', path: '/cart' },
        { name: 'התחבר', path: '/login' },
        { name: 'הרשם', path: '/signup' },
        { name: 'כל ההזמנות שלי', path: '/userorders' },
        ...(isManager ? [
            { name: 'הוסף מוצר', path: '/add-product' },
            { name: 'עדכן מוצר', path: '/update-product' }
        ] : [])
    ];

    const settings = [{ name: 'Profile', path: '' },
    { name: 'Logout ↪️', path: '/logout' }];

    return (
        <>
            <AppBar position="fixed" className="navBar" sx={{ backgroundColor: "#c17c74" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* אייקון הלוגו */}
                        <AdbIcon className="logoIcon" />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/home"
                            className="logoText"
                        >
                            <img src="/logo/logo2.png" alt="Logo" className="logoImage" />
                        </Typography>


                        {/* תפריט רספונסיבי */}
                        <Box className="menuIcon">
                            <IconButton
                                size="large"
                                aria-label="open navigation"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{ display: { xs: 'flex', md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                className="mobileMenu"
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {/* {pages.map((page) => (
                                    page.name == 'סל הקניות' &&
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography component={Link} to={page.path} className="menuLink">
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                ))} */}

                            </Menu>
                            <IconButton component={Link} to="/cart">
                                <CartBadge badgeContent={amountInCart} color="primary" overlap="circular">
                                    <ShoppingCartIcon fontSize="small" />
                                </CartBadge>
                            </IconButton>
                        </Box>

                        {/* תפריט ניווט ראשי - מחולק שווה ברוחב */}
                        <Box className="menuButtons" sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button key={page.name} component={Link} to={page.path} className="menuButton">
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {/* תפריט משתמש */}
                        <Box className="userMenu">
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} className="avatarButton">
                                    <Avatar alt={userName} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorElUser}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                className="settingsMenu"
                            >
                                <MenuItem key="Profile" onClick={() => { navigate("/profile"); handleCloseUserMenu(); }}>
                                    <Typography className="menuItem">Profile</Typography>
                                </MenuItem>
                                <MenuItem key="Logout ↪️" onClick={() => { disp(userOut()); handleCloseUserMenu() }}>
                                    <Typography className="menuItem">Logout ↪️</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* גוף הדף - מוסיפים padding-top כדי שהתוכן לא יוסתר מתחת ל-NavBar */}
            <div className="bodyContent">
                {/* התוכן של הדף יבוא כאן */}
            </div>
        </>
    );
}

export default ResponsiveAppBar;
