import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userIn } from "../features/userSlice";
import { getUserByToken } from "../api/userService";
import Swal from 'sweetalert2';

export async function fetchGoogleUser(dispatch, navigate, tokenFromUrl) {
    try {
        if (tokenFromUrl) {
            localStorage.setItem("token", tokenFromUrl);
        }

        const token = localStorage.getItem("token");

        if (token) {
            let response = await getUserByToken(token);
            console.log("response", response.data);

            if (!response) {
                throw new Error("Failed to fetch user data");
            }

            localStorage.setItem("currentUser", JSON.stringify(response.data));
            dispatch(userIn({ ...response.data, token: token }));

            Swal.fire({
                title: "ברוכים הבאים",
                text: "נרשמת בהצלחה, גלישה מהנה",
                icon: "success"
            });

            navigate("/products");
        }
    } catch (error) {
        console.log("Error fetching Google user data:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response?.data?.message || "שגיאה בלתי צפויה",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}
