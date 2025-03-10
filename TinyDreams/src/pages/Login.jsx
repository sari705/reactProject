// import { useForm } from "react-hook-form";
// import { logIn } from "../api/userService";
// import { useDispatch, useSelector } from "react-redux";
// import { userIn } from "../features/userSlice";
// import { useNavigate } from "react-router-dom";


// function Login() {

//     const { register, formState: { errors }, handleSubmit } = useForm();
//     const disp = useDispatch();
//     const navigate = useNavigate();
//     console.log("user in redux: ", useSelector((state) => state.user.currentUser));

//     async function submit(user) {
//         console.log("in submit");
//         try {
//             let response = await logIn(user);
//             console.log("res in login: ", response);
//             alert("loged in");
//             disp(userIn({ ...response.data.data, token: response.data.token }));
//             navigate("/products")
//         }

//         catch (error) {
//             console.log(error);
//             alert(error.response.data.title);
//         }
//     }

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit(submit)} className="login-form">
//                 {/* שדה אימייל */}
//                 <label>Email:</label>
//                 <input
//                     type="email"
//                     {...register("email", {
//                         required: { value: true, message: "Email is required" },
//                         pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Email is not correct" }
//                     })}
//                 />
//                 {errors.email && <p className="error">{errors.email.message}</p>}

//                 {/* שדה סיסמה */}
//                 <label>Password:</label>
//                 <input
//                     type="password"
//                     {...register("password", {
//                         required: "Password is required",
//                         minLength: { value: 6, message: "Password must be at least 6 characters" },
//                         pattern: { value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/, message: "password is not correct" },
//                     })}
//                 />
//                 {errors.password && <p className="error">{errors.password.message}</p>}


//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;
import { useForm } from "react-hook-form";
import { useState } from "react";
import { logIn } from "../api/userService";
import { useDispatch, useSelector } from "react-redux";
import { userIn } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import "./css/login.css"; // קובץ ה-CSS
import { FaEye, FaEyeSlash } from "react-icons/fa"; // אייקוני הצגת סיסמה

function Login() {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    
    console.log("user in redux: ", useSelector((state) => state.user.currentUser));

    async function submit(user) {
        console.log("in submit");
        try {
            let response = await logIn(user);            
            console.log("res in login: ", response);

            localStorage.setItem("currentUser",  JSON.stringify(response));//הוספתי את ה-currentUser ל -localStorage

            alert("Logged in successfully!");
            dispatch(userIn({ ...response.data.data, token: response.data.token }));
            navigate("/products");
        } catch (error) {
            console.log(error);
            alert(error.response.data.title);
        }
    }

    return (
        <div className="login-container">
            <h2 className="login-title">Welcome Back!</h2>
            <form onSubmit={handleSubmit(submit)} className="login-form">
                
                {/* שדה אימייל */}
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: { value: true, message: "Email is required" },
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" }
                        })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                {/* שדה סיסמה עם אפשרות הצגה */}
                <div className="input-group password-group">
                    <label>Password:</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Must be at least 6 characters" },
                                pattern: { value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/, message: "Password must contain letters and numbers" }
                            })}
                        />
                        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>

                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
