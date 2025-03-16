import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOrderByUser } from '../api/orderService.js'

import ForUserOneOrderForUser from '../components/OneOrderForUser.jsx';

function UserOrders() {
    // let params = useParams();

    // let {_id} = params;
    const _id = useSelector(state => state.user.currentUser._id);
    const token = useSelector(state => state.user.currentUser.token);
    let [orders, setOrders] = useState([]);
    let [errors, setErros] = useState([]);
    const [status, setStatus] = useState("init");

    async function getOrdersByUserId() {
        setStatus("pending");
        try {
            console.log("token", token);

            let response = await getOrderByUser(_id, token);
            setOrders(response?.data.data);
            console.log(response.data);
            setStatus("complete");

        }
        catch (err) {
            setErros({ title: err.title, message: err.message });
            console.log(err);
        }
    }
    useEffect(() => {
        getOrdersByUserId();
    }, [])


    return (<>

        {status == "pending" ? <h1>loading...</h1> : status == "complete" && orders?.length != 0?( 
            orders.map((ord) => <ForUserOneOrderForUser key={ord._id} order={ord} />)
        ) : (
        <p>No orders found.</p>
        )}
    </>
    );
}
export default UserOrders;
// 0768074011/33 מרכנתיל י. הנשיא
// date:Date,
// deadline: Date,
// address: String,
// userId: {type: ObjectId, ref: "user"},
// minimalProduct:[{productName:String, amount:Number}],
// isSetOff:Boolean,
// shippingPrice:Number,
// finalPrice:Number, 
