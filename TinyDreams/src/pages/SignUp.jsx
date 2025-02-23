import { useForm } from "react-hook-form";

import signUp from '../api/userService.js';

function SignUp() {


    let { register, handleSubmit, formState: { errors, isValid } } = useForm();


    function save(data) {
        signUp(data);
    }

    return (<>
    <h2>SignUp</h2>
        <form onSubmit={handleSubmit(save)}>


            <input type="text" placeholder="name"
                {...register("username", { required: 'שדה שם הוא שדה חובה' })}></input>
            {errors.username && <div className="error">{errors.username.message} </div>}


            <input type="email" {...register("email", {
                required: 'שדה אימייל הוא שדה חובה',
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'פורמט אימייל לא נכון'
                }
            })
            }></input>

            <input type="password" placeholder="סיסמא"{...register("password", {
                required: 'שדה סיסמא הוא שדה חובה',
                pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/,
                    message: " הסיסמה לא חזקה, נא להזין סיסמה עם אותיות ומספרים בין 7-15 תווים"
                }
            })}></input>

           </form>

    </>);
}

export default SignUp; 
