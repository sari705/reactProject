import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOrderByUser } from '../api/orderService.js'
import OneOrder from '../components/OneOrderForUser.jsx';
import ForUserOneOrderForUser from '../components/OneOrderForUser.jsx';

function UserOrders() {
    // let params = useParams();

    // let {_id} = params;
    let _id = useSelector(state => state.user.currentUser._id);
    let [orders, setOrders] = useState([]);

    async function getOrdersByUserId() {

        try {
            let response = await getOrderByUser(_id);
            setOrders(response.data);

        } catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
        getOrdersByUserId();
    }, [])


    return (<>
        return (
        <>
            {orders && orders.length > 0 ? (
                orders.map((ord) => (<ForUserOneOrderForUser key={ord._id} order={ord} />))
            ) : (
                <p>No orders found.</p>
            )}
        </>
        );
    </>);
 }

export default UserOrders;
// 0768074011/33 מרכנתיל י. הנשיא