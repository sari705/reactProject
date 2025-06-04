// import React, { useRef } from "react";
// import { useForm } from "react-hook-form";
// import { TextField, Button, Grid, Typography } from "@mui/material";

// const AddressForm = ({ onNext, onChange, formData, setFormData }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: formData || {},
//   });

//   const inputRefs = useRef([]);

//   const onSubmit = (data) => {   
//     if (!data.address) {
//       Swal.fire({
//         icon: "error",
//         title: "שגיאה",
//         text: "יש למלא את הכתובת!",
//       });
//       return;
//     }
//     setFormData(prev => ({ ...prev, ...data }));
//     onNext(data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (onChange) {
//       onChange(name, value); // עדכון בזמן אמת
//     }
//   };

//   // פונקציה לעבור לשדה הבא בעת לחיצה על Enter
//   const handleKeyPress = (e, index) => {
//     if (e.key === "Enter" && inputRefs.current[index + 1]) {
//       inputRefs.current[index + 1].focus();  // העברת הפוקוס לשדה הבא
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Grid container spacing={2}>
//         {['firstName', 'lastName', 'phone', 'country', 'city', 'zip'].map((field, index) => (
//           <Grid item xs={12} sm={6} key={field} >
//             <TextField
//               fullWidth
//               label={field === 'firstName' ? 'שם פרטי' : field === 'lastName' ? 'שם משפחה' : field === 'phone' ? 'טלפון' : field === 'country' ? 'מדינה' : field === 'city' ? 'עיר' : 'מיקוד'}
//               {...register(field, { required: "שדה חובה" })}
//               error={!!errors[field]} helperText={errors[field]?.message}
//               onChange={handleChange}
//               onKeyDown={(e) => handleKeyPress(e, index)} // העברת פוקוס ב-Enter
//               inputRef={(ref) => inputRefs.current[index] = ref} // שמירת הפוקוס על השדה
//             />
//           </Grid>
//         ))}
//         <Grid item xs={12}> {/* שינוי כאן ל-12 כדי שהכתובת תתפוס את כל הרוחב */}
//           <TextField
//             fullWidth
//             label='כתובת'
//             {...register('address', { required: true })}
//             error={!!errors['address']} helperText={errors['address']?.message}
//             onChange={handleChange}
//             inputRef={(ref) => inputRefs.current[5] = ref} // עדכון אינדקס
//           />
//         </Grid>
//       </Grid>

//     </form>
//   );
// };

// export default AddressForm;
import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Typography } from "@mui/material";

export default function AddressForm({ defaultValues, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });

  // קריאה ל־onSubmit שנשלחה מהורה רק אם הטופס תקין
  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h6" gutterBottom sx={{ color: "#590202" }}>
        כתובת משלוח
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="שם פרטי"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="שם משפחה"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="טלפון"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="עיר"
            {...register("city", { required: "שדה חובה" })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="מיקוד"
            {...register("zip", { required: "שדה חובה" })}
            error={!!errors.zip}
            helperText={errors.zip?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="כתובת"
            {...register("address", { required: "שדה חובה" })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        {/* אפשר להוסיף כאן גם שדה "מדינה" ועוד */}
      </Grid>

      {/* כפתור 'Next' הוא כפתור Submit */}
      <Button variant="contained" type="submit" sx={{ mt: 3 }}>
        Next
      </Button>
    </form>
  );
}
