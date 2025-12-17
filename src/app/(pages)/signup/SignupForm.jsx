"use client";

import React, { useEffect, useState } from 'react'
import { signUp } from '@/app/providers/signup/signup';

const SignupForm = () => {

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [usernameCheck, setUsernameCheck] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  function validateUsername(name) {
    if (name.length === 0) {
      return ""; // No warning yet if empty
    }

    if (name.length < 3) {
      return "Username can't be less than 3 characters";
    }

    if (!/^[A-Za-z]/.test(name)) {
      return "Username must start with a letter";
    }

    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
      return "Username can only contain letters, numbers, and underscores";
    }

    return ""; // Valid
  }

  function validatePassword(password) {
    if (password.length < 7) {
      return "Password can't be less than 7 characters";
    }

    return ""
  }

  const handleInput = (event) => {

    const { name, value } = event.target;

    if (name == "username") {
      if (value.length > 16) return
      const warning = validateUsername(value);
      setUsernameCheck(warning);
    }

    if (name == "password") {
      const warning = validatePassword(value);
      setPasswordCheck(warning);
    }

    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(userInfo.email, userInfo.password, userInfo.username);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <form id='loginForm' className="flex" onSubmit={handleSubmit}>
      <input type='email' placeholder="Email" name='email' onChange={handleInput} value={userInfo.email} />
      <div className='limit-wrapper'>
        <input type='text' placeholder="Username" name='username' onChange={handleInput} value={userInfo.username} />
        <span className='charLimit'>{userInfo.username.length}/16</span>
      </div>
      {usernameCheck ? <span className='formWarning'>{usernameCheck}</span> : ''}
      <input type="password" placeholder="Password" name='password' onChange={handleInput} value={userInfo.password} />
      {passwordCheck ? <span className='formWarning'>{passwordCheck}</span> : ''}
      <input type="password" placeholder="Confirm Password" name='confirmPassword' onChange={handleInput} value={userInfo.confirmPassword} />
      <button type='submit'>Signup</button>
    </form>
  )
}

export default SignupForm