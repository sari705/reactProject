// import { useForm } from "react-hook-form";
// import { useDispatch } from 'react-redux';
// import { useNavigate } from "react-router-dom";

// import { signUp } from '../api/userService.js';
// import { userIn } from "../features/userSlice";
// import { useEffect } from "react";


// function SignUp() {


//     let { register, handleSubmit, formState: { errors } } = useForm();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

  

//     async function save(data) {
//         try {
//             console.log("data: ", data);
//             const user = await signUp(data);

//             console.log("user after sign up: ", user);
//             localStorage.setItem("currentUser", JSON.stringify(user));//הוספתי את ה-currentUser ל -localStorage

            
//             dispatch(userIn({ username: user.username, email: user.email }));
//             navigate("/products")
//         }
//         catch (e) {
//             alert(e.message);
//             console.log(e);
//         }
//     }

//     return (<>
//         <h2>SignUp</h2>
//         <form onSubmit={handleSubmit(save)}>


//             <input type="text" placeholder="name"
//                 {...register("username", { required: 'שדה שם הוא שדה חובה' })}></input>
//             {errors.username && <div className="error">{errors.username.message} </div>}


//             <input type="email" placeholder="email" {...register("email", {
//                 required: 'שדה אימייל הוא שדה חובה',
//                 pattern: {
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                     message: 'פורמט אימייל לא נכון'
//                 }
//             })
//             }></input>
//             {errors.email && <div className="error">{errors.email.message}</div>}

//             <input type="password" placeholder="סיסמא"{...register("password", {
//                 required: 'שדה סיסמא הוא שדה חובה',
//                 pattern: {
//                     value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/,
//                     message: " הסיסמה לא חזקה, נא להזין סיסמה עם אותיות ומספרים בין 7-15 תווים"
//                 }
//             })}></input>
//             {errors.password && <div className="error">{errors.password.message}</div>}

//             <button type="submit">signUp</button>
//         </form>

//     </>);
// }

// export default SignUp; 

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
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signUp } from '../api/userService.js';
import { userIn } from "../features/userSlice";
import Swal from 'sweetalert2'


// 🎨 התאמת צבעים
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

const SignUpContainer = styled(Stack)(() => ({
  height: '110vh',
  minHeight: '100%',
  padding: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState("");

  async function save(data) {
    setServerError(null)
    try {
      console.log("data: ", data);
      const user = await signUp(data);
      console.log("user after sign up: ", user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      dispatch(userIn({ username: user.username, email: user.email }));
      Swal.fire({
        title: "ברוכים הבאים",
        text: "נרשמת בהצלחה, גלישה מהנה",
        icon: "success"
      });
      navigate("/products"); // מעבר לעמוד מוצרים אחרי הרשמה
    } catch (e) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: e.response.data.message,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
      setServerError(e.message);
      console.log(e);      
    }
  }

  return (
    <SignUpContainer>
      <CssBaseline />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: themeColors.textPrimary, textAlign: 'center', fontWeight: 'bold' }}
        >
          הרשם
        </Typography>

        {serverError && <Alert severity="error">{serverError}</Alert>}

        <Box component="form" onSubmit={handleSubmit(save)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <FormLabel sx={{ color: themeColors.textPrimary }}>שם מלא</FormLabel>
            <TextField
              {...register("username", { required: "שדה שם הוא חובה" })}
              autoComplete="name"
              required
              fullWidth
              id="name"
              placeholder="השם שלך"
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{
                bgcolor: themeColors.inputBg,
                borderRadius: 2,
                input: { color: themeColors.inputText },
              }}
            />
          </FormControl>

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
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                bgcolor: themeColors.inputBg,
                borderRadius: 2,
                input: { color: themeColors.inputText },
              }}
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" sx={{ color: themeColors.textPrimary }} />}
            label="אני רוצה לקבל עדכונים במייל"
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
            הרשם
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
          >
            הירשם עם Google
          </Button>
        </Stack>

        <Typography sx={{ textAlign: 'center', mt: 2, color: themeColors.textPrimary }}>
          כבר יש לך חשבון?{' '}
          <Link href="/login" sx={{ color: themeColors.linkColor }}>
            התחבר כאן
          </Link>
        </Typography>
      </Card>
    </SignUpContainer>
  );
}
