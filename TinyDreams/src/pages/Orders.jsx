// import { useEffect, useState } from "react";
// import { getAllOrders } from "../api/orderService";
// import OneOrderForManager from "../components/OneOrderForManager";
// import { useSelector } from "react-redux";


// const Orders = () => {

//     const [orders, setOrders] = useState([])
//     const [error, setError] = useState({})
//     const token = localStorage.getItem("token")

//     const getOrders = async () => {
//         try {        
//             if(token){
//                 const response = await getAllOrders(token)
//                 console.log(response.data.orders);
                
//                 if (response) {
//                     setOrders(response.data.orders)
//                 }
//             }  
//             else{
//                 alert("login first")
//             }            
//         }
//         catch (error) {
//             setError({ title: "Server error", message: error.message })
//         }

//     }

//     useEffect(() => {
//         getOrders()
//     }, [])

//     return (
//         <>
//             {orders.length==0 ? <h1>no orders</h1>:orders.length?<ul>
//                 {orders.map((order) => (
//                     <li>
//                         <OneOrderForManager order={order}></OneOrderForManager>
//                     </li>
//                 ))}
//             </ul> :
//                 <div>
//                     <h1>{error.title}</h1>
//                     <h2>{error.message}</h2>
//                 </div>
//             }
//         </>
//     );
// }

// export default Orders;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Alert, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

import { getAllOrders } from "../api/orderService";
import OneOrderForManager from "../components/OneOrderForManager";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const getOrders = async () => {
        try {
            if (token) {
                const response = await getAllOrders(token);
                if (response) {
                    setOrders(response.data.orders);
                }
            } else {
                alert("Login first");
            }
        } catch (error) {
            setError({ title: "Server error", message: error.message });
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className="bg-[#F8F9FA] min-h-screen py-10 px-5 flex flex-col items-center">
            <Typography variant="h3" sx={{ color: "#590202", fontWeight: "bold", marginBottom: "24px" }}>
                רשימת הזמנות
            </Typography>

            {error ? (
                <Alert severity="error" sx={{ backgroundColor: "#590202", color: "white", padding: "16px", borderRadius: "8px" }}>
                    <Typography variant="h6">{error.title}</Typography>
                    <Typography>{error.message}</Typography>
                </Alert>
            ) : (
                <TableContainer component={Paper} sx={{ maxWidth: "90%", boxShadow: 3, borderRadius: "12px" }}>
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
                            {orders.length > 0 ? (
                                orders.map((order) => <OneOrderForManager key={order._id} order={order} />)
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h6" sx={{ color: "gray" }}>אין הזמנות להצגה</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default Orders;
