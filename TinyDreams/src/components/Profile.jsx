// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../api/userService';
// import { userIn } from '../features/userSlice';

// const Profile = () => {
//     const user = useSelector((state) => state.user.currentUser)
//     const [formData, setFormData] = useState({ username: user.username, email: user.email });
//     const [success, setSuccess] = useState('');
//     const [error, setError] = useState('');
//     const disp = useDispatch()
//     const token = user.token
//     const id = user._id;

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             console.log(formData);
            
//             const response = await updateUser(id, formData, token);
//             console.log(response);
            
//             if (response) {
//                 disp(userIn(response.data))
//                 setSuccess('Profile updated successfully!');
//                 setError('');
//             }
//         } catch (err) {
//             setSuccess('');
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <h3>פרופיל משתמש</h3>
//             </div>
//             <div>
//                 {error && <div>{error}</div>}
//                 {success && <div>{success}</div>}
//                 <div>
//                     <p><strong>שם:</strong> {user.username}</p>
//                     <p><strong>מייל:</strong> {user.email}</p>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <h5>עדכון פרטים</h5>
//                     <div>
//                         <label htmlFor="name" >שם חדש</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             placeholder="הזן שם חדש"
//                             className="form-control"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email">אימייל חדש</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="הזן אימייל חדש"
//                             className="form-control"
//                         />
//                     </div>
//                     <button type="submit">עדכן פרופיל</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Profile;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container, Paper, Alert } from '@mui/material';
import { updateUser } from '../api/userService';
import { userIn } from '../features/userSlice';

const Profile = () => {
    const user = useSelector((state) => state.user.currentUser);
    const [formData, setFormData] = useState({ username: user.username, email: user.email });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const token = user.token;
    const id = user._id;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(id, formData, token);
            if (response) {
                dispatch(userIn(response.data));
                setSuccess('Profile updated successfully!');
                setError('');
            }
        } catch (err) {
            setSuccess('');
            setError('Error updating profile. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', mt: 5 }}>
                <Typography variant="h4" gutterBottom>פרופיל משתמש</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <Typography variant="h6" sx={{ mt: 2 }}>שם: {user.username}</Typography>
                <Typography variant="h6">מייל: {user.email}</Typography>
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <TextField
                        fullWidth
                        label="שם חדש"
                        variant="outlined"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="אימייל חדש"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        עדכן פרופיל
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Profile;