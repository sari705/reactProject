import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../api/userService';
import { userIn } from '../features/userSlice';

const Profile = () => {
    const user = useSelector((state) => state.user.currentUser)
    const [formData, setFormData] = useState({ username: user.username, email: user.email });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const disp = useDispatch()
    const token = user.token
    const id = user._id;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            
            const response = await updateUser(id, formData, token);
            console.log(response);
            
            if (response) {
                disp(userIn(response.data))
                setSuccess('Profile updated successfully!');
                setError('');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile');
            setSuccess('');
        }
    };

    return (
        <div>
            <div>
                <h3>פרופיל משתמש</h3>
            </div>
            <div>
                {error && <div>{error}</div>}
                {success && <div>{success}</div>}
                <div>
                    <p><strong>שם:</strong> {user.username}</p>
                    <p><strong>מייל:</strong> {user.email}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <h5>עדכון פרטים</h5>
                    <div>
                        <label htmlFor="name" >שם חדש</label>
                        <input
                            type="text"
                            id="name"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="הזן שם חדש"
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">אימייל חדש</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="הזן אימייל חדש"
                            className="form-control"
                        />
                    </div>
                    <button type="submit">עדכן פרופיל</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
