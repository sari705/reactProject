import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addOrder } from "../api/orderService.js";


function CheckOut() {
    // name: String,
    // description: String,
    // images: { type: [String], default: [] },
    // stock: Number,
    // price: Number,
    // categories: {
    //     type: String,
    //     enum: Categories // הגדרה כ-enum מתוך הערכים של Categories
    // },
    // sizes: [String],
    // colors: [String],
    // tag: {
    //     type: [String],
    //     enum: TagsEnum // הגדרה כ-enum מתוך TagsEnum
    // }
    // date:Date,
    // deadline: Date,
    // address: String,
    // userId: {type: ObjectId, ref: "user"},
    // minimalProduct:[{productName:String, amount:Number}],
    // isSetOff:Boolean,
    // shippingPrice:Number,
    // finalPrice:Number,
    const { register, handleSubmit, formState: { errors } } = useForm();
    let [error, setError] = useState(null);
    const user = useSelector(state => state.user.currentUser);
    const products = useSelector(state => state.cart.products);

    let minimalProduct = products.map(product => (
        {_id:product._id, productName: product.name, price: product.price, amount: product.amount ?? 1  }));//לשנות את הנוד לפי האובייקטים האלו

    const onSubmit = async (data) => {

        console.log("Form Data:", data);
        const {address} = data;
        // { _id: user._id, minimalProduct, token: user.token }
        const order = {minimalProduct, address, userId:user._id }
        console.log("order: ",order);

        try {
            const response = await addOrder(order);

            if (response) {
                console.log("response: ", response.data);
                alert("added order succesfully")  
            }
        } catch (err) {
            alert(err);
            console.log(err);
            
        }

    };

return (<>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4">טופס הרשמה</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block font-medium">שם פרטי</label>
                <input {...register("firstName", { required: "שדה חובה" })} className="w-full p-2 border rounded" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>

            <div>
                <label className="block font-medium">שם משפחה</label>
                <input {...register("lastName", { required: "שדה חובה" })} className="w-full p-2 border rounded" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>

            <div>
                <label className="block font-medium">מדינה</label>
                <input {...register("country", { required: "שדה חובה" })} className="w-full p-2 border rounded" />
                {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
            </div>

            <div>
                <label className="block font-medium">כתובת</label>
                <input {...register("address", { required: "שדה חובה" })} className="w-full p-2 border rounded" />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>

            <div>
                <label className="block font-medium">מיקוד</label>
                <input {...register("zip", { required: "שדה חובה" })} className="w-full p-2 border rounded" />
                {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
            </div>

            <div>
                <label className="block font-medium">טלפון</label>
                <input
                    {...register("phone", {
                        required: "שדה חובה",
                        pattern: {
                            value: /^\d{9,10}$/,
                            message: "מספר טלפון לא תקין",
                        },
                    })}
                    className="w-full p-2 border rounded"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                שלח
            </button>
        </form>
    </div>
    </>);

}
export default CheckOut;

///////////////////////////////////////////


// const handleOrder = async () => {
//     try {
//         if (!user?._id || !user?.token) {
//             console.log(user);

//         }


//         alert("!הזמנתך נשמרה בהצלחה");
//         console.log("Response:", response);
//     }
//     catch (err) {
//         console.log("Error:", err);

//         // אם מדובר בשגיאת שרת, הצגת ההודעה המתאימה
//         if (err.response?.data?.message) {
//             alert(err.response.data.message);
//         } else {
//             alert("שגיאה כללית, אנא נסה שוב.");
//         }
//     }
// };

// return (
//     <>
//         <input type="button" value="הוסף הזמנה" onClick={handleOrder} />
//     </>
// );
