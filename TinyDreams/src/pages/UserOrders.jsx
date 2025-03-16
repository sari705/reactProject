// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { getOrderByUser } from '../api/orderService.js'

// import ForUserOneOrderForUser from '../components/OneOrderForUser.jsx';

// function UserOrders() {
  
//     const _id = useSelector(state => state.user.currentUser._id);
//     const token = useSelector(state => state.user.currentUser.token);
//     let [orders, setOrders] = useState([]);
//     let [errors, setErros] = useState([]);
//     const [status, setStatus] = useState("init");

//     async function getOrdersByUserId() {
//         setStatus("pending");
//         try {
//             console.log("token", token);

//             let response = await getOrderByUser(_id, token);
//             setOrders(response?.data.data);
//             console.log(response.data);
//             setStatus("complete");
//         }
//         catch (err) {
//             setErros({ title: err.title, message: err.message });
//             console.log(err);
//         }
//     }
//     useEffect(() => {
//         getOrdersByUserId();
//     }, [])


//     return (<>
   
//         {status == "pending" ? <h1>loading...</h1> : status == "complete" && orders?.length != 0?( 
//             orders.map((ord) => <ForUserOneOrderForUser key={ord._id} order={ord} />)
//         ) : (
//         <p>No orders found.</p>
//         )}
//     </>
//     );
// }
// export default UserOrders;
// // 0768074011/33 מרכנתיל י. הנשיא
// // date:Date,
// // deadline: Date,
// // address: String,
// // userId: {type: ObjectId, ref: "user"},
// // minimalProduct:[{productName:String, amount:Number}],
// // isSetOff:Boolean,
// // shippingPrice:Number,
// // finalPrice:Number, 
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Alert, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

import { getOrderByUser } from "../api/orderService.js";
import OneOrderForUser from "../components/OneOrderForUser.jsx";

function UserOrders() {
    const _id = useSelector((state) => state.user.currentUser._id);
    const token = useSelector((state) => state.user.currentUser.token);
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
        <div className="bg-[#F8F9FA] min-h-screen py-10 px-5 flex flex-col items-center">
            <Typography variant="h3" sx={{ color: "#590202", fontWeight: "bold", marginBottom: "24px" }}>
                ההזמנות שלי
            </Typography>

            {status === "pending" ? (
                <Typography variant="h6" sx={{ color: "gray" }}>טוען נתונים...</Typography>
            ) : error ? (
                <Alert severity="error" sx={{ backgroundColor: "#590202", color: "white", padding: "16px", borderRadius: "8px" }}>
                    <Typography variant="h6">{error.title}</Typography>
                    <Typography>{error.message}</Typography>
                </Alert>
            ) : orders.length > 0 ? (
                <TableContainer component={Paper} sx={{ maxWidth: "90%", boxShadow: 3, borderRadius: "12px" }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#D9B1A3" }}>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}> to adress</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>num products </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>final price </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>will arrive by </TableCell>
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
        </div>
    );
}

export default UserOrders;

