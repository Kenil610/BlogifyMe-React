import React, { useState } from 'react';
import { Profile } from '../components';
import { NavLink } from 'react-router-dom';

const ProfilePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <div onClick={toggleModal} style={{ cursor: 'pointer' }} >
                <div className='profile-a'>Profile</div>
            </div>
            {isModalOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <Profile />
                        <button className="close-button" onClick={toggleModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
