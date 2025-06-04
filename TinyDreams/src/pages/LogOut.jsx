import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";

import { userOut } from "../features/userSlice.js";
import useScrollToTop from "../hooks/useScrollToTop";


function LogOut() {

    useScrollToTop();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogOut() {
        try {

            localStorage.removeItem("currentUser");
            localStorage.removeItem("cart");
            localStorage.removeItem("token");

            dispatch(userOut());
            Swal.fire({
                title: "הושלם",
                icon: "success",
                text: "התנתקת בהצלחה",             
                timer: "3000",
                allowOutsideClick: true,
            });
            navigate("/login");
        } catch (err) {
            alert(err.message);
        }
    }
    useEffect(() => {

    }, [dispatch, navigate]);
    return (<>
        <MenuItem key="Logout ↪️" onClick={() => { handleLogOut(); }}>
            <Typography className="menuItem">Logout ↪</Typography>
        </MenuItem>
    </>);
}

export default LogOut;