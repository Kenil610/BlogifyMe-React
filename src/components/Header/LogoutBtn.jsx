import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice'; // Add curly braces for named export
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authService.logout().then(() => {
            const confirmLogout = window.confirm('Do you want to Log Out ?');
            if(confirmLogout) {
                dispatch(logout());
                navigate('/login');
            }
            else{
                return null;
            }
        });
    };

    return (
        <div>
            <button onClick={logoutHandler} className='logout-btn'>
                <p>Logout</p>
                <svg
                    version="1.1"
                    viewBox="0 0 2048 2048"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path transform="translate(46)" d="m0 0h19l-5 5-6 4-15 12-8 7-9 9-2 4 9-10 12-10 22-14 5-3 2-4h1479l18 8 14 8 20 15 11 8 4 6 2 10v5 2l2 4 2 32 1 54v140l-2 97-3 39-2 7-4-1-14-14-19-28-8-11-8-9-12-7-6-13-1-8-2-67-2-126-2-79-34-2-40-1-70-1h-1192l-114 2h-17v12l-1 11-1 35-2 200v1368l1 144 1 57v48l77 4 30 1 231 1h949l88-1 62-2 20-1h13v-53l3-154 1-64 2-13 4-8 5-5 11-12 12-14 13-16 9-10 12-10 5-3h3l1 2 2 38 1 75v116l-2 85-2 40-2 13-3 1h-2l3 1v7l-4 13-4 7-6 3h-15l-10 6-8 2v4l-24 3h-10l-1 1 38-1 5 2 1 3-3 1-9-1-26 1v4l9-3 7-1h9l6 3 1 2 1 31-1 5h-4l-1-5-2-1-1 6h-1491l3-12v-18l-3-5-1-1-10-2-6-2h-8l-4-6-12-5-10-4 4-6-1-3-1 3h-2l-2 5-6-1-5-4-6-11v-5l5-1 11 4-5-4-11-7v-2l-2 1v-1908l7-9h2l2-4 13-13 2-3-8 7-8 8-7 8-2 1 2-5 9-11 15-15 7-8zm6 1-1 2 3-1zm-5 4m-1 1m-1 1m-2 1-16 15h3l15-14zm-26 35-11 12-4 5-1 5 7-6 8-12 2-4zm1582 2m1 1 2 4 11 9h3l-10-10-4-3zm14 1548m-1607 363m-1 1-2 2 3 1zm1554 36m-4 1 4 1zm-1483 14v3z" fill="#FEFEFE" />
                    <path transform="translate(1534,518)" d="m0 0h8l13 4 11 7 11 10 11 9 11 10 8 7 13 12 8 7v2l4 2 17 17 8 7 15 16 41 41 7 8 10 9 18 18v2l3 1 7 8 7 6v2l4 2 19 19 7 8 18 18 8 7 9 10 88 88 7 8 34 34 7 8 7 7 9 11 12 13 14 16 4 3h4l2 2 11-7 8-2 9 1 2 1v79l-10-1-15-6h-8l-5 5h-2l-2 4-12 13-7 8-15 16-46 46h-2l-1 3-8 7-14 15-78 78-1 2h-2l-2 4-219 219-8 7-13 12-13 10-8 4-9 3-6 1h-18l-12-3-5-6-3-10v-33l4-11 6-9 12-14 15-16 26-26 7-8 4-2v-2l8-7 59-59h2v-2l6-5 116-116 7-8 53-53 8-7 16-15 8-7 10-9 7-7 6-9-2-1-39-2-30-1-48-1-115-1h-370l-405 1h-155l-77-1-1-1v-18l1-58 1-3h1080l132-2 32-1-7-8-7-7-8-7-19-19-8-7-63-63v-2h-2l-7-8-63-63-7-6v-2h-2l-5-6-8-7-61-61-3-2v-2l-4-2-26-26-8-7-47-47-7-8-11-13-7-11-2-7v-25l5-16 9-10 10-5z" fill="#FEFEFE" />
                    <path transform="translate(70,2013)" d="m0 0 4 2 1 7v12l-3 8-4-1 2 7h-21l-6-2-7-3-2-3-1-6v-13l16-4 15-3zm-22 10 2 4 2 1-2-4z" fill="#FEFEFE" />
                    <path transform="translate(26,2008)" d="m0 0 3 1v2l-3 1z" fill="#FEFEFE" />
                    <path transform="translate(103,100)" d="m0 0 1 4h-2z" fill="#FEFEFE" />
                    <path transform="translate(37,2046)" d="m0 0 2 2h-2z" fill="#FEFEFE" />
                    <path transform="translate(100,1916)" d="m0 0 2 1z" fill="#FEFEFE" />
                </svg>
            </button>

        </div>
    );
}

export default LogoutBtn;
