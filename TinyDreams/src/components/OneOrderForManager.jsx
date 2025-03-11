const OneOrderForManager = ({ order }) => {
    return ( 
        <div>
            <h2>{order.userId}</h2>
            <h2>{order._id}</h2>
            <h2>{order.finalPrice}</h2>
            <h2>{order.date}</h2>
            <h2>{order.isSetOff}</h2>
        </div>
    );
}

export default OneOrderForManager;