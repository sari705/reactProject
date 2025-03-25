import { useEffect, useState } from "react";
import { Typography, Alert, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box } from "@mui/material";

import OneOrderForManager from "../components/OneOrderForManager";
import SwingingImage from "../components/SwingingImage";
import { getAllOrders } from "../api/orderService";
import useScrollToTop from "../hooks/useScrollToTop";


const Orders = () => {

    useScrollToTop();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const [status, setStatus] = useState("init");

    const getOrders = async () => {
        setStatus("pending");
        try {
            if (token) {
                const response = await getAllOrders(token);
                if (response) {
                    setOrders(response.data.orders);
                    setStatus("complete");
                }
            } else {
                alert("Login first");
            }
        } catch (error) {
            setError({ title: "Server error", message: error.message });
            setStatus("error");
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <Box sx={{ marginRight: "auto", marginLeft: "auto", direction: "rtl", width: "100%" }}>
            <Typography variant="h3" sx={{ marginRight: "auto", marginLeft: "auto", width: "20%", color: "#590202", fontWeight: "bold", marginBottom: "24px" }}>
                רשימת הזמנות
            </Typography>

            {status === "pending" ? (
                <Box sx={{ marginRight: "auto", marginLeft: "auto", width: "25%" }}><SwingingImage />    </Box>

            ) :
                status === "error" ? (
                    <Alert severity="error" sx={{ backgroundColor: "#590202", color: "white", padding: "16px", borderRadius: "8px" }}>
                        <Typography variant="h6">{error.title}</Typography>
                        <Typography>{error.message}</Typography>
                    </Alert>
                ) : orders.length > 0 ? (
                    <TableContainer component={Paper} sx={{ marginRight: "auto", marginLeft: "auto", width: "100%", maxWidth: "90%", boxShadow: 3, borderRadius: "12px" }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#D9B1A3" }}>
                                    <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>מזהה משתמש</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>מזהה הזמנה</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>מחיר סופי</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>תאריך הזמנה</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>סטטוס תשלום</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {orders.map((order) => <OneOrderForManager key={order._id} order={order} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (<Typography variant="h6" sx={{ color: "gray" }}>אין הזמנות להצגה</Typography>)

            }

        </Box>);

};

export default Orders;
