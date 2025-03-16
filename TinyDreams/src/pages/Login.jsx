import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // אייקוני הצגת סיסמה

import { logIn } from "../api/userService";
import { userIn } from "../features/userSlice";
import FetchGoogleUser from "../components/FetchGoogleUser";
import "./css/Login.css"; // קובץ ה-CSS

// function Login() {
//     const { register, formState: { errors }, handleSubmit } = useForm();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);

//     console.log("user in redux: ", useSelector((state) => state.user.currentUser));

//     async function submit(user) {
//         console.log("in submit");
//         try {
//             let response = await logIn(user);
//             console.log("res in login: ", response);

//             localStorage.setItem("currentUser", JSON.stringify({
//                 ...response.data.data,
//                 token: response.data.token
//             }));//הוספתי את ה-currentUser ל -localStorage

//             alert("Logged in successfully!");
//             dispatch(userIn({ ...response.data.data, token: response.data.token }));
//             navigate("/products");
//         } catch (error) {
//             console.log(error);
//             alert(error.response.data.title);
//         }
//     }

//     return (
//         <div className="login-container">
//             <h2 className="login-title">Welcome Back!</h2>
//             <FetchGoogleUser />
//             <form onSubmit={handleSubmit(submit)} className="login-form">

//                 {/* שדה אימייל */}
//                 <div className="input-group">
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         {...register("email", {
//                             required: { value: true, message: "Email is required" },
//                             pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" }
//                         })}
//                     />
//                     {errors.email && <p className="error">{errors.email.message}</p>}
//                 </div>

//                 {/* שדה סיסמה עם אפשרות הצגה */}
//                 <div className="input-group password-group">
//                     <label>Password:</label>
//                     <div className="password-wrapper">
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             {...register("password", {
//                                 required: "Password is required",
//                                 pattern: { value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/, message: "Password must be 7-15 characters, and include letters & numbers" }
//                             })}
//                         />
//                         <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                     {errors.password && <p className="error">{errors.password.message}</p>}
//                 </div>

//                 <button type="submit" className="login-button">Login</button>

//                 <button
//                     type="button"
//                     className="google-login-button"
//                     onClick={() => {
//                         window.location.href = "https://nodeproject-gd82.onrender.com/api/user/google";
//                     }}
//                 >
//                     Login with Google 🟢
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default Login;



// 🎨 התאמת צבעים כמו בדף ההרשמה
const themeColors = {
    background: "#E9ECF2",
    cardBg: "#FFFFFF",
    inputBg: "#F7F7F7",
    inputText: "#333333",
    textPrimary: "#590202",
    buttonBg: "#BF7069",
    buttonHover: "#D9B1A3",
    linkColor: "#84B1D9",
    border: "#D9B1A3",
};

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  backgroundColor: themeColors.cardBg,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 15px, rgba(0, 0, 0, 0.1) 0px 15px 35px -5px',
  borderRadius: '16px',
  [theme.breakpoints.up('sm')]: {
    width: '500px',
  },
}));

const LoginContainer = styled(Stack)(() => ({
  height: '100vh',
  minHeight: '100%',
  padding: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    console.log("user in redux: ", useSelector((state) => state.user.currentUser));

    async function submit(user) {
        console.log("in submit");
        try {
            let response = await logIn(user);
            console.log("res in login: ", response);

            localStorage.setItem("currentUser", JSON.stringify({
                ...response.data.data,
                token: response.data.token
            }));
            Swal.fire({
                title: "ברוכים הבאים",
                text: "התחברת בהצלחה, גלישה מהנה",
                icon: "success"
              });
            dispatch(userIn({ ...response.data.data, token: response.data.token }));
            navigate("/products");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: e.response.data.message,
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            setServerError(error.response.data.title);
        }
    }

    return (
        <LoginContainer>
            <CssBaseline />
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ color: themeColors.textPrimary, textAlign: 'center', fontWeight: 'bold' }}
                >
                    התחבר
                </Typography>
                <FetchGoogleUser />

                {serverError && <Alert severity="error">{serverError}</Alert>}

                <Box component="form" onSubmit={handleSubmit(submit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl>
                        <FormLabel sx={{ color: themeColors.textPrimary }}>מייל</FormLabel>
                        <TextField
                            {...register("email", {
                                required: "שדה אימייל הוא חובה",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "פורמט אימייל לא תקין",
                                },
                            })}
                            required
                            fullWidth
                            id="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{
                                bgcolor: themeColors.inputBg,
                                borderRadius: 2,
                                input: { color: themeColors.inputText },
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={{ color: themeColors.textPrimary }}>סיסמה</FormLabel>
                        <Box sx={{ position: "relative" }}>
                            <TextField
                                {...register("password", {
                                    required: "שדה סיסמה הוא חובה",
                                    pattern: {
                                        value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/,
                                        message: "הסיסמה חייבת להיות בין 7-15 תווים ולכלול אותיות ומספרים",
                                    },
                                })}
                                required
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                sx={{
                                    bgcolor: themeColors.inputBg,
                                    borderRadius: 2,
                                    input: { color: themeColors.inputText },
                                }}
                            />
                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                                sx={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    minWidth: "30px",
                                    bgcolor: "transparent",
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </Box>
                    </FormControl>

                    <FormControlLabel
                        control={<Checkbox value="rememberMe" sx={{ color: themeColors.textPrimary }} />}
                        label="זכור אותי"
                        sx={{ color: themeColors.textPrimary }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: themeColors.buttonBg,
                            py: 1.5,
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            borderRadius: "30px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                            "&:hover": {
                                bgcolor: themeColors.buttonHover,
                            },
                        }}
                    >
                        התחבר
                    </Button>
                </Box>

                <Divider>
                    <Typography sx={{ color: 'gray' }}>או</Typography>
                </Divider>

                <Stack spacing={2}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon sx={{ fontSize: 24, marginLeft: "8px" }}/>}
                        sx={{
                            color: themeColors.linkColor,
                            borderColor: themeColors.border,
                            "&:hover": { borderColor: themeColors.linkColor },
                        }}
                        onClick={() => {
                            window.location.href = "https://nodeproject-gd82.onrender.com/api/user/google";
                        }}
                    >
                        התחבר עם Google
                    </Button>
                </Stack>

                <Typography sx={{ textAlign: 'center', mt: 2, color: themeColors.textPrimary }}>
                    אין לך חשבון?{' '}
                    <Link href="/signup" sx={{ color: themeColors.linkColor }}>
                        הירשם כאן
                    </Link>
                </Typography>
            </Card>
        </LoginContainer>
    );
}
