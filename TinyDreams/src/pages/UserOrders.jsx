// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Typography, Alert, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

// import { getOrderByUser } from "../api/orderService.js";
// import OneOrderForUser from "../components/OneOrderForUser.jsx";
// import SwingingImage from "../components/SwingingImage.jsx";

// function UserOrders() {
//     const _id = useSelector((state) => state.user.currentUser._id);
//     const token = localStorage.getItem("token");
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState(null);
//     const [status, setStatus] = useState("init");

//     async function getOrdersByUserId() {
//         setStatus("pending");
//         try {
//             const response = await getOrderByUser(_id, token);
//             setOrders(response?.data.data);
//             setStatus("complete");
//         } catch (err) {
//             setError({ title: "Error fetching orders", message: err.message });
//             setStatus("error");
//         }
//     }

//     useEffect(() => {
//         getOrdersByUserId();
//     }, []);

//     return (
//         <div className="bg-[#F8F9FA] min-h-screen py-10 px-5 flex flex-col items-center">
//             <Typography variant="h3" sx={{ color: "#590202", fontWeight: "bold", marginBottom: "24px" }}>
//                 ההזמנות שלי
//             </Typography>

//             {status === "pending" ? (
//                 <SwingingImage></SwingingImage>
//             ) : error ? (
//                 <Alert severity="error" sx={{ backgroundColor: "#590202", color: "white", padding: "16px", borderRadius: "8px" }}>
//                     <Typography variant="h6">{error.title}</Typography>
//                     <Typography>{error.message}</Typography>
//                 </Alert>
//             ) : orders.length > 0 ? (
//                 <TableContainer component={Paper} sx={{ maxWidth: "90%", boxShadow: 3, borderRadius: "12px" }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: "#D9B1A3" }}>
//                                 <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}> to adress</TableCell>
//                                 <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>num products </TableCell>
//                                 <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>final price </TableCell>
//                                 <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>will arrive by </TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {orders.map((order) => (
//                                 <OneOrderForUser key={order._id} order={order} />
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             ) : (
//                 <Typography variant="h6" sx={{ color: "gray" }}>אין הזמנות להצגה</Typography>
//             )}
//         </div>
//     );
// }

// export default UserOrders;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Alert, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box } from "@mui/material";

import { getOrderByUser } from "../api/orderService.js";
import OneOrderForUser from "../components/OneOrderForUser.jsx";
import SwingingImage from "../components/SwingingImage.jsx";

function UserOrders() {
    const _id = useSelector((state) => state.user.currentUser._id);
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("init");

    async function getOrdersByUserId() {
        setStatus("pending");
        try {
            const response = await getOrderByUser(_id, token);
            setOrders(response?.data.data);
            setStatus("complete");
        } catch (err) {
            setError({ title: "Error fetching orders", message: err.message });
            setStatus("error");
        }
    }

    useEffect(() => {
        getOrdersByUserId();
    }, []);

    return (
        <Box sx={{marginRight: "auto", marginLeft: "auto", direction: "rtl", width: "100%"}}>
            <Typography variant="h3" sx={{ color: "#590202", fontWeight: "bold", marginBottom: "24px",marginRight: "auto", marginLeft: "auto", width:"20%"  }}>
                ההזמנות שלי
            </Typography>
            {status === "pending" ? (
                <Box sx={{marginRight: "auto", marginLeft: "auto", width: "25%"}}><SwingingImage /></Box>
                
            ) : error ? (
                <Alert severity="error" sx={{ backgroundColor: "#590202", color: "white", padding: "16px", borderRadius: "8px" }}>
                    <Typography variant="h6">{error.title}</Typography>
                    <Typography>{error.message}</Typography>
                </Alert>
            ) : orders.length > 0 ? (
                <TableContainer
                    component={Paper}
                    sx={{ width: "100%", maxWidth: "90%", boxShadow: 3, borderRadius: "12px", direction: "rtl", overflowX: "auto", marginRight: "auto", marginLeft: "auto" }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#D9B1A3" }}>
                                <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>כתובת</TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>כמות מוצרים</TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>מחיר סופי</TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>תאריך הגעה</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <OneOrderForUser key={order._id} order={order} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="h6" sx={{ color: "gray" }}>אין הזמנות להצגה</Typography>
            )}
        </Box>
    );
}

export default UserOrders;


