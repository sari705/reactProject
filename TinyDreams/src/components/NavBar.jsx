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

import { userOut } from '../features/userSlice';
import "./css/navBar.css";

function ResponsiveAppBar() {
    const role = useSelector(state => state.user.currentUser?.role);
    const isManager = role === "MANAGER";

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [scrolling, setScrolling] = React.useState(false); // מצב שקיפות

    const userName = useSelector(state => state.user.currentUser?.name);
    const disp = useDispatch();
    const navigate = useNavigate();
    const amountInCart = useSelector((state) => state.cart.amountInCart);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogOut = () => {
        try {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("cart");
            localStorage.removeItem("token");
            disp(userOut());
            alert("LogOut!");
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    const pages = [
        { name: 'דף הבית', path: '/home' },
        { name: 'מוצרים', path: '/products' },
        { name: 'סל הקניות', path: '/cart' },
        { name: 'התחבר', path: '/login' },
        { name: 'הרשם', path: '/signup' },
        { name: 'כל ההזמנות שלי', path: '/userorders' },
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
                    backgroundColor: scrolling ? "rgba(191, 112, 105, 0.8)" : "#BF7069",
                    transition: "background-color 0.3s ease-in-out"
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
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
                                <MenuItem key="Logout ↪️" onClick={() => { handleLogOut(); setAnchorElUser(null) }}>
                                    <Typography className="menuItem">Logout ↪️</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <div className="bodyContent">
                {/* התוכן של הדף יבוא כאן */}
            </div>
        </>
    );
}

export default ResponsiveAppBar;
