import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { userIn } from "../features/userSlice";
import { getUserByToken } from "../api/userService";
import Swal from 'sweetalert2'


function FetchGoogleUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
    }

    const token = localStorage.getItem("token");

    if (token) {
      async function fetchUserData() {
        try {
          let response = await getUserByToken(token);
          console.log("response", response.data);          

          if (!response) {
            throw new Error("Failed to fetch user data");
          }
          localStorage.setItem("currentUser", JSON.stringify(response.data));
          dispatch(userIn({...response.data, token: token}));
          Swal.fire({
            title: "ברוכים הבאים",
            text: "נרשמת בהצלחה, גלישה מהנה",
            icon: "success"
          });
          navigate("/products");
        } 
        catch (error) {
          console.log("Error fetching Google user data:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: e.response.data.message,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }

      fetchUserData();
    }
  }, [location, dispatch, navigate]);

  return null;
}

export default FetchGoogleUser;
