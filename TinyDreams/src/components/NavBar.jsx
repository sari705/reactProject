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


    const pages = [
        { name: 'דף הבית', path: '/home' },
        { name: 'מוצרים', path: '/products' },
        { name: 'סל הקניות', path: '/cart' },
        ...(!role ? [{ name: 'התחבר', path: '/login' },
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
                    backgroundColor: scrolling ? "rgba(191, 112, 105, 0.8)" : "#BF7069",
                    transition: "background-color 0.3s ease-in-out",
                    
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

                            {/* <MenuItem key="Logout ↪️" onClick={() => { handleLogOut(); setAnchorElUser(null); }}>
                                <Typography className="menuItem">Logout ↪️</Typography>
                            </MenuItem> */}
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
//הנב בבאר הבא לא השתנה הרבה לבדוק מה קורה עם זה
// import * as React from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { Badge as CartBadge } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// import "./css/navBar.css";
// import LogOut from '../pages/LogOut';

// function ResponsiveAppBar() {
//     const role = useSelector(state => state.user.currentUser?.role);
//     const isManager = role === "MANAGER";
//     const userName = useSelector(state => state.user.currentUser?.name);
//     const navigate = useNavigate();
//     const amountInCart = useSelector((state) => state.cart.amountInCart);

//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);
//     const [scrolling, setScrolling] = React.useState(false);

//     React.useEffect(() => {
//         const handleScroll = () => {
//             setScrolling(window.scrollY > 50);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const pages = [
//         { name: 'דף הבית', path: '/home' },
//         { name: 'מוצרים', path: '/products' },
//         { name: 'סל הקניות', path: '/cart' },
//         ...(!role ? [{ name: 'התחבר', path: '/login' }, { name: 'הרשם', path: '/signup' }] : [{ name: 'הזמנות שלי', path: '/userorders' }]),
//         ...(isManager ? [
//             { name: 'הוסף מוצר', path: '/add-product' },
//             { name: 'הזמנות', path: '/orders' },
//             { name: 'משתמשים', path: '/users' }
//         ] : [])
//     ];

//     return (
//         <AppBar position="fixed" sx={{ backgroundColor: scrolling ? "rgba(191, 112, 105, 0.8)" : "#BF7069", transition: "background-color 0.3s ease-in-out" }}>
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     {/* לוגו רספונסיבי */}
//                     <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
//                         <Link to="/home" style={{ textDecoration: "none" }}>
//                             <Box component="img" src="/logo/logo2.png" alt="Logo" sx={{ height: { xs: 40, md: 60 }, width: "auto" }} />
//                         </Link>
//                     </Box>
                    
//                     {/* תפריט כפתור במסכים קטנים */}
//                     <Box sx={{ display: { xs: "flex", md: "none" } }}>
//                         <IconButton size="large" onClick={(e) => setAnchorElNav(e.currentTarget)}>
//                             <MenuIcon />
//                         </IconButton>
//                         <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={() => setAnchorElNav(null)}>
//                             {pages.map((page) => (
//                                 <MenuItem key={page.name} component={Link} to={page.path} onClick={() => setAnchorElNav(null)}>
//                                     {page.name}
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>
                    
//                     {/* כפתורי ניווט במסכים גדולים */}
//                     <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//                         {pages.map((page) => (
//                             <Button key={page.name} component={Link} to={page.path}>
//                                 {page.name}
//                             </Button>
//                         ))}
//                     </Box>
                    
//                     {/* עגלת קניות */}
//                     <IconButton component={Link} to="/cart">
//                         <CartBadge badgeContent={amountInCart} color="primary">
//                             <ShoppingCartIcon fontSize="small" />
//                         </CartBadge>
//                     </IconButton>
                    
//                     {/* תפריט משתמש רספונסיבי */}
//                     <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
//                         <Tooltip title="Open settings">
//                             <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}>
//                                 <Avatar alt={userName} src="/static/images/avatar/2.jpg" />
//                             </IconButton>
//                         </Tooltip>
//                         <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={() => setAnchorElUser(null)}>
//                             <MenuItem onClick={() => { navigate("/profile"); setAnchorElUser(null); }}>
//                                 Profile
//                             </MenuItem>
//                             <LogOut />
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// }

// export default ResponsiveAppBar;

