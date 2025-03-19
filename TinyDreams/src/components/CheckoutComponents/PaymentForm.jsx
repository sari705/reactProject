// import React from "react";
// import { useForm } from "react-hook-form";
// import { TextField, Grid, Typography } from "@mui/material";

// const PaymentForm = ({ onNext, onChange, formData, setFormData }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log("Form Data Before Sending:", data);
//     onNext(data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(`📝 Updating ${name}:`, value);
//     if (onChange) {
//       onChange(name, value);
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
      
//       <Typography variant="h6">פרטי תשלום</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField fullWidth label="מספר כרטיס אשראי" {...register("cardNumber"
//           , { required: "שדה חובה", pattern: { value: /^[0-9]{16}$/, message: "מספר כרטיס לא תקין" } }
//         )}
//             error={!!errors.cardNumber} helperText={errors.cardNumber?.message} onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField fullWidth label="תוקף (MM/YY)" {...register("expiry"
//           ,{ required: "שדה חובה" }
//         )} error={!!errors.expiry} helperText={errors.expiry?.message} onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField fullWidth label="CVV" {...register("cvv"
//           , { required: "שדה חובה", pattern: { value: /^[0-9]{3,4}$/, message: "CVV לא תקין" } }
//         )}
//             error={!!errors.cvv} helperText={errors.cvv?.message} onChange={handleChange}
//           />
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default PaymentForm;
import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Typography } from "@mui/material";

export default function PaymentForm({ defaultValues, onSubmit, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });

  const submitHandler = (data) => {
    onSubmit(data); 
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h6" gutterBottom>
        פרטי תשלום
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="מספר כרטיס אשראי"
            {...register("cardNumber", {
              required: "שדה חובה",
              pattern: {
                value: /^[0-9]{16}$/,
                message: "מספר כרטיס לא תקין (16 ספרות)",
              },
            })}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="תוקף (MM/YY)"
            {...register("expiry", {
              required: "שדה חובה",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: "תוקף חייב להיות בפורמט MM/YY",
              },
            })}
            error={!!errors.expiry}
            helperText={errors.expiry?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="CVV"
            {...register("cvv", {
              required: "שדה חובה",
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: "CVV לא תקין (3 או 4 ספרות)",
              },
            })}
            error={!!errors.cvv}
            helperText={errors.cvv?.message}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {/* כפתור Back רגיל (type="button" שלא שולח את הטופס) */}
        <Grid item>
          <Button variant="text" type="button" onClick={onBack}>
            Back
          </Button>
        </Grid>

        {/* כפתור Next/Submit */}
        <Grid item>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
