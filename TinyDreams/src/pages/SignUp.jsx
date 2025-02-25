import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { signUp } from '../api/userService.js';
import { userIn } from "../features/userSlice";


function SignUp() {


    let { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function save(data) {
        try {
            const user = await signUp(data);
            dispatch(userIn({ username: user.username, email: user.email }));
            navigate("/ProductList")
            alert("You have successfully registered");
        }
        catch (e) {
            alert(e.message);
        }
    }

    return (<>
        <h2>SignUp</h2>
        <form onSubmit={handleSubmit(save)}>


            <input type="text" placeholder="name"
                {...register("username", { required: 'שדה שם הוא שדה חובה' })}></input>
            {errors.username && <div className="error">{errors.username.message} </div>}


            <input type="email" placeholder="email" {...register("email", {
                required: 'שדה אימייל הוא שדה חובה',
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'פורמט אימייל לא נכון'
                }
            })
            }></input>
            {errors.email&&<div className="error">{errors.email.message}</div>}

            <input type="password" placeholder="סיסמא"{...register("password", {
                required: 'שדה סיסמא הוא שדה חובה',
                pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/,
                    message: " הסיסמה לא חזקה, נא להזין סיסמה עם אותיות ומספרים בין 7-15 תווים"
                }
            })}></input>
                        {errors.password&&<div className="error">{errors.password.message}</div>}


        </form>

    </>);
}

export default SignUp; 
