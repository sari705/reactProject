import { useSelector } from "react-redux";
import { addOrder } from "../api/orderService.js";

function OrderCompletion() {
    const user = useSelector(state => state.user.currentUser);
    const products = useSelector(state => state.cart.products);

    const handleOrder = async () => {
        try {
            if (!user?._id || !user?.token) {
                throw new Error("משתמש לא מחובר או חסרים פרטים");
            }

            const response = await addOrder(user._id, products, user.token);

            alert("!הזמנתך נשמרה בהצלחה");
            console.log("Response:", response);
        } 
        catch (err) {
            console.error("Error:", err);

            // אם מדובר בשגיאת שרת, הצגת ההודעה המתאימה
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("שגיאה כללית, אנא נסה שוב.");
            }
        }
    };

    return (
        <>
            <input type="button" value="הוסף הזמנה" onClick={handleOrder} />
        </>
    );
}

export default OrderCompletion;
