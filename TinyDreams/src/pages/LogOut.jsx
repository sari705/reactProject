import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { userOut } from "../features/userSlice.js";


function LogOut() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            localStorage.removeItem("currentUser"); // מחיקת המשתמש מה-LocalStorage
            localStorage.removeItem("cart"); // מחיקת סל הקניות מה-LocalStorage
            dispatch(userOut()); // עדכון Redux
            alert("LogOut!");
            navigate("/login"); // ניווט לדף ההתחברות
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }, [dispatch, navigate]); 




    return (<></>);
}

export default LogOut;