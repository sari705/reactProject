import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getAllOrders } from "../api/orderService";
import OneOrderForManager from "../components/OneOrderForManager";


const Orders = () => {

    const [orders, setOrders] = useState([])
    const [error, setError] = useState({})
    const token = localStorage.getItem("token")

    const getOrders = async () => {
        try {        
            if(token){
                const response = await getAllOrders(token)
                console.log(response.data.orders);
                
                if (response) {
                    setOrders(response.data.orders)
                }
            }  
            else{
                alert("login first")
            }            
        }
        catch (error) {
            setError({ title: "Server error", message: error.message })
        }

    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <>
            {orders.length==0 ? <h1>no orders</h1>:orders.length?<ul>
                {orders.map((order) => (
                    <li>
                        <OneOrderForManager order={order}></OneOrderForManager>
                    </li>
                ))}
            </ul> :
                <div>
                    <h1>{error.title}</h1>
                    <h2>{error.message}</h2>
                </div>
            }
        </>
    );
}

export default Orders;