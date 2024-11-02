import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as StoreLogin } from '../store/authSlice';
import { Button, Input } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData){
          dispatch(StoreLogin(userData));
        } 
        alert('Log In Successful');
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
      {error && alert("Invalid Credentials")}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo">
      <svg version="1.1" viewBox="0 0 2048 646" width="155" xmlns="http://www.w3.org/2000/svg">
          <path transform="translate(431,185)" d="m0 0h79l19 28 39 57 15 22 12 18-1 4-8 12-26 38-9 13 2 5 8 11 8 12 26 38 19 28 4 7h-330l-13-19-11-16-2-4 199-1 8-11 8-12 45-66 13-19 12-18-2-5-26-38-15-22-13-19-2-3-32-1-8-11-17-25zm95 228-8 11-9 13v2h35l-5-9-12-17z" />
          <path transform="translate(259,234)" d="m0 0h47l-5 9-16 23-16 24-14 20-8 12-30 44-7 10 1 5 15 22 26 38 30 44 19 28 110 1 2-5 13-19 2-2h46l-2 5-16 24-10 14-8 12-7 10h-151l-8-12-30-44-12-18-137-1 7-11 19-28 60-88 13-19 17-25 45-66zm-75 179-15 22-2 4h36l-7-11-10-14z" />
          <path transform="translate(355,93)" d="m0 0 5 5 12 18 75 110 13 19 30 44 13 19 15 22 2 3-1 5-10 14-11 16-2 1-12-18-75-110-11-16h-176l-10 15-34 50-14 21 7 11 8 12-5 9-10 14-8 12-4-4-17-25-13-19-6-9 2-5 14-20 10-15 34-50 11-16 13-19 2-2 91-1 8-12 45-66zm0 69-14 21v2h30l-5-9-8-11z" />
          <path transform="translate(355,226)" d="m0 0 4 4 8 12 75 110 13 19 17 25 4 7h-241l7-11 16-24 10-14 10-15 13-19 60-88zm0 70-8 11-30 44-8 12v1h93l-2-4-14-21-26-38z" />
          <path transform="translate(1577,229)" d="m0 0h17l36 2 5 3 3 8 5 17 12 31 15 38 22 56 2 3 5-1 24-50 14-29 11-23 12-25 6-25 2-3 37-2h16l1 5-5 4-23 9-4 5v51l3 54 3 48 3 10 6 5 10 4 11 3 3 2-1 4-1 1h-83l-2-2 1-4 8-3 10-3 4-5 2-7v-47l-2-51-1-26-4 2-15 30-11 23-14 28-11 23-22 44-5-1-17-48-20-51-17-41-4-9-3-1-2 19-5 41-2 27v35l5 10 8 6 14 4 2 2v4l-2 1h-71l-2-1 1-5 8-3 9-3 7-8 3-9 6-45 5-47 2-26v-30l-2-7-9-6-13-4-8-3-2-2 1-5z" />
          <path transform="translate(782,228)" d="m0 0 26 1 17 3 12 4 10 7 7 8 4 10 1 6v15l-4 13-6 10-10 8-12 6 1 2 16 6 10 6 5 4 8 11 4 11 1 7v12l-2 13-5 12-8 10-14 9-13 6-21 5-9 1h-90l-2-1 1-5 8-3 13-4 6-4 4-6 1-4v-151l-3-9-5-4-5-2-14-3-3-3 1-4 1-1 50-1zm-5 10-7 3-3 4-1 4v59l3 6 5 3h19l16-4 12-6 7-8 3-7 1-5v-17l-4-12-6-9-7-6-11-4-6-1zm2 88-8 3-4 4-1 3v68l3 9 5 5 8 3h18l13-4 9-5 10-9 6-9 4-11v-20l-4-11-6-8-5-5-5-4-10-5-11-3-8-1z" />
          <path transform="translate(1178,303)" d="m0 0 16 2 20 6 6 1h28l2 2-1 7-3 3-14 1-4 1-2 7-1 16-4 16-7 13-9 10-11 8-13 4h-11l-12-2-6 4-3 1-2 5 1 7 6 4 15 4 31 3 15 3 14 5 8 6 5 8 1 4v12l-4 13-5 10-8 10-5 5-9 8-14 8-11 4-6 1h-19l-16-3-14-6-10-9-4-8-2-13 2-11 6-9 16-13 10-8h2v-2l-8-1-12-6-5-6-2-10 4-8 14-11 5-4-1-4-10-8-7-10-4-10-1-4v-13l4-13 5-8 8-9 13-8 13-4zm-8 10-8 4-7 7-6 12-1 4v19l4 12 7 10 8 6 6 2h9l8-4 8-9 4-8 3-14v-9l-3-12-5-9-9-8-7-3zm-6 130-11 8-8 9-4 9-1 4v14l5 10 9 8 10 4 12 2 14-1 10-3 10-6 8-10 5-12 1-5v-11l-3-6-7-6-12-4-22-3z" />
          <path transform="translate(1416,213)" d="m0 0h13l14 3 9 6 3 6v9l-3 5-4 2h-6l-10-8-8-6-9-3h-13l-10 4-5 4-6 9-4 12-2 17v35h42l3 1 1 6-3 8-43 1v90l2 5 4 3 18 4 3 3-1 4-2 1h-12l-14-1h-16l-11 1h-11l-3-2 1-4 2-2 12-4 4-4 1-5 1-89h-15l-5-3-1-4 20-11 1-18 3-17 5-15 9-16 11-12 10-7 14-6z" />
          <path transform="translate(1030,304)" d="m0 0h16l16 4 13 7 10 9 8 10 6 12 3 13v16l-3 15-5 12-7 11-5 6-12 9-13 6-15 3h-20l-15-4-12-7-10-9-6-8-6-12-3-13v-18l3-13 8-16 7-9 4-5 10-8 16-8zm-6 10-11 4-5 4-7 10-4 12-2 17v10l2 15 4 12 5 10 9 11 9 6 9 3h12l13-4 8-6 6-10 4-16v-30l-4-15-7-14-8-10-9-6-8-3z" />
          <path transform="translate(1427,307)" d="m0 0h54l3 2-1 4-4 3-8 4-1 2v9l11 28 15 37 1 4 2-1 22-59 2-7v-7l-2-5-12-8v-5l2-1h49l1 5-5 3-6 3-4 4h-2l-10 20-17 40-18 43-19 46-16 38-6 8-8 4h-13l-6-3-3-4v-11l3-5 3-3h10l7 1 5-3 10-18 9-19 7-18 1-8-2-11-36-90-6-9-6-4-7-3-1-5z" />
          <path transform="translate(1897,304)" d="m0 0h13l12 3 10 6 8 8 5 11 1 4v11l-2 4-4 2-72 1-3 2-1 4v9l3 15 7 14 8 9 11 7 9 3h18l11-4 9-7 4-4h3l1 4-3 9-9 10-10 7-15 5-12 1-14-2-12-5-11-8-8-10-7-15-3-13-1-10v-10l3-16 5-12 9-13 7-7 12-8 12-4zm-3 9-10 4-10 8-5 8-1 9 1 1h47l7-1 2-2v-11l-5-8-9-6-7-2z" />
          <path transform="translate(930,214)" d="m0 0 5 1-2 33v166l2 6 8 4 9 4 1 4-3 2h-11l-11-1h-13l-11 1h-11l-3-2 1-4 9-4 8-4 2-4v-162l-2-10-4-6-10-5v-6l26-9z" />
          <path transform="translate(1297,298)" d="m0 0h4l-1 19-1 13v87l5 5 13 5 2 4-1 2-3 1h-10l-11-1h-13l-11 1h-11l-3-2 1-5 16-6 2-3v-80l-3-8-4-4-8-3-1-5 3-3 15-5 10-5z" />
          <path transform="translate(1282,241)" d="m0 0h9l6 3 5 6 1 3v7l-4 8-7 4h-10l-6-4-4-5-1-8 2-7 7-6z" />
        </svg>
      </div>
      <div className='content'>
        <h4>Log In Here</h4>
        <form onSubmit={handleSubmit(login)}>
          <div className="input-wrapper">

            <Input
              label="Email"
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email Address Must Be Valid",
                },
              })}
            />
          </div>

          <div className="input-wrapper">
            <Input
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <Button>Log In</Button>
        </form><br />

        <div className='line'></div>

        <p>Don't Have An Account?</p>

        <Link to="/signup" className='signup'>Create New Account</Link>

        <div className="spinner-div">
        {loading && <div className="spinner"></div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
