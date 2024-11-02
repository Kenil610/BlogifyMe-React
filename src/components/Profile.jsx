import React, { useState, useEffect } from 'react';
import { Button, Input } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

const Profile = () => {
    const [formData, setFormData] = useState({ name: '', email: '', newPassword: '', confirmPassword: '', currentPassword: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const userData = useSelector((state) => state.auth?.userData || {});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = userData.$id;

    useEffect(() => {
        console.log("Updated userData:", userData);
        resetFormData();
    }, [userData]);
    
    

    const resetFormData = () => {
        setFormData({
            name: userData.name || '',
            email: userData.email || '',
            newPassword: '',
            confirmPassword: '',
            currentPassword: ''
        });
    };
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        try {
            if (!formData.currentPassword) {
                alert("Please enter your current password to update your Details.");
                return;
            }

            let updatedName = formData.name;
            let updatedEmail = formData.email;

            if (formData.email !== userData.email) {
                await appwriteService.updateUserEmail(formData.email, formData.currentPassword);
                updatedEmail = formData.email;
            }

            if (formData.name !== userData.name) {
                await appwriteService.updateUserName(formData.name);
                updatedName = formData.name;
            }
            
            // Update local state to reflect the changes immediately
            setFormData((prevState) => ({
                ...prevState,
                name: updatedName,
                email: updatedEmail,
            }));

            dispatch(login({ name: updatedName, email: updatedEmail }));
            alert("Profile updated successfully!");

            // Reset form data after successful update
            resetFormData();
            setIsEditing(false); 
        } catch (error) {
            console.error("Error updating user details:", error);
            if (error.code === 401) {
                alert("Invalid credentials. Please check your current password and try again.");
            } else {
                alert("Failed to update profile. Please try again.");
            }
        }
    };

    const handleUpdatePassword = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!formData.currentPassword) {
            alert("Please enter your current password to update your password.");
            return;
        }

        try {
            await appwriteService.updatePassword(formData.newPassword, formData.currentPassword);
            alert("Password updated successfully!");

            // Reset password fields after successful update
            setFormData((prevState) => ({
                ...prevState,
                newPassword: '',
                confirmPassword: '',
                currentPassword: '',
            }));

            setIsUpdatingPassword(false);
        } catch (error) {
            console.error("Error updating password:", error);
            if (error.code === 401) {
                alert("Invalid credentials. Please check your current password and try again.");
            } else {
                alert("Failed to update password. Please try again.");
            }
        }
    };

    const toggleEditProfile = () => {
        setIsEditing(true);
        setIsUpdatingPassword(false); // Close password update form
    };

    const toggleUpdatePassword = () => {
        setIsUpdatingPassword(true);
        setIsEditing(false); // Close profile edit form
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {isEditing ? (
                <div className="edit-profile">
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <Input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Current Password"
                    />
                    <Button onClick={handleUpdateProfile}>Save</Button>
                    <Button onClick={() => { setIsEditing(false); resetFormData(); }}>Cancel</Button>
                </div>
            ) : (
                <div className="profile-details">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <Button onClick={toggleEditProfile}>Edit Profile</Button>
                </div>
            )}

            {/* Password Update Section */}
            <div className="update-password">
                {isUpdatingPassword ? (
                    <div>
                        <Input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Current Password"
                        />
                        <Input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="New Password"
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm New Password"
                        />
                        <Button onClick={handleUpdatePassword}>Update Password</Button>
                        <Button onClick={() => setIsUpdatingPassword(false)}>Cancel</Button>
                    </div>
                ) : (
                    <Button onClick={toggleUpdatePassword}>Change Password</Button>
                )}
            </div>
        </div>
    );
};

export default Profile;
