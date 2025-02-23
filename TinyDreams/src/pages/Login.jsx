import { useForm } from "react-hook-form";
import { logIn } from "../api/userService";
import { useDispatch, useSelector } from "react-redux";
import { userIn } from "../features/userSlice";
import { useNavigate } from "react-router-dom";


function Login() {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const disp = useDispatch();
    const navigate = useNavigate();
    console.log("user in redux: "+useSelector((state) => state.user.currentUser));

    async function submit(user) {
        console.log("in submit");
        

        try {
            let response = await logIn(user);
            console.log("res: ", response);
            disp(userIn(response.data.dataWithoutPassword.username));
            alert("loged in");            
            navigate("/products")
        }
        catch (error) {
            console.log(error);            
            alert(error.response.data.title);
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(submit)} className="login-form">
                {/* שדה אימייל */}
                <label>Email:</label>
                <input
                    type="email"
                    {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Email is not correct" }
                    })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

                {/* שדה סיסמה */}
                <label>Password:</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                        pattern: { value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/, message: "password is not correct" },
                    })}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}


                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;