
function OneOrderForUser({order}) {

    const isBeforeToday = order.deadLine < new Date();



    return (<div>

        <h2></h2>
        {order.isSetOff && <h3>order is on way!</h3>}

        {order.deadLine && isBeforeToday && (<h3>order will arrive until: {order.deadLine.toString()}</h3>)}
        <h2>toAdress: {toAdress}</h2>
        <h3>final price: {order.finalPrice}</h3>

    </div>);
}

export default ForUserOneOrderForUser;
// date:Date,
// deadline: Date,
// address: String,
// userId: {type: ObjectId, ref: "user"},
// minimalProduct:[{productName:String, amount:Number}],
// isSetOff:Boolean,
// shippingPrice:Number,
// finalPrice:Number, 
