import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { userOut } from "../features/userSlice.js";


function LogOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogOut(){
        try {

            localStorage.removeItem("currentUser"); // מחיקת המשתמש מה-LocalStorage
            localStorage.removeItem("cart"); // מחיקת סל הקניות מה-LocalStorage
            localStorage.removeItem("token");

            dispatch(userOut()); // עדכון Redux
            // alert("LogOut!////////////////////");
            toast.success("logout succesfully!", {
                position: "top-center", autoClose: 3000,
                style: {
                    backgroundColor: "#E9ECF2",
                    color: "#590202 ",            // צבע טקסט לבן
                    borderRadius: "8px",         // פינות מעוגלות
                    padding: "10px 20px",        // ריפוד פנימי להודעה
                    fontSize: "16px",   // גודל גופן
                    border: "#590202 2px solid"
                }
            });
            navigate("/login"); // ניווט לדף ההתחברות
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }
    useEffect(() => {
       
    }, [dispatch, navigate]);
    return (<>
        <MenuItem key="Logout ↪️" onClick={() => { handleLogOut();  }}>
            <Typography className="menuItem">Logout ↪</Typography>
        </MenuItem>
    </>);
}

export default LogOut;