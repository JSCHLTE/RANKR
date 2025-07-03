"use client";

import React, { useState } from 'react'

const SignupForm = () => {

    const [userInfo, setUserInfo] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleInput = (event) => {
        const { name, value } = event.target;

        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
      }

  return (
    <form id='loginForm' className="flex" onSubmit={handleSubmit}>
    <label className="flex">
        Email:
        <input type='email' placeholder="Email..." name='email' onChange={handleInput} value={userInfo.email}/>
    </label>
    <label className="flex">
        Username:
        <input type='text' placeholder="Username..." name='username' onChange={handleInput} value={userInfo.username}/>
    </label>
    <label className="flex">
        Password:
        <input type="password" placeholder="Password..." name='password' onChange={handleInput} value={userInfo.password}/>
    </label>
    <label className="flex">
        Confirm Password:
        <input type="password" placeholder="Confirm Password..." name='confirmPassword' onChange={handleInput} value={userInfo.confirmPassword}/>
    </label>
    <button type='submit'>Signup</button>
</form>
  )
}

export default SignupForm