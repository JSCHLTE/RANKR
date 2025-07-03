"use client"

import { useState } from "react";

const LoginForm = () => {

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
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
            Email or Username:
            <input type='text' placeholder="Email or Username..." name="email" onChange={handleInput} value={userInfo.email}/>
        </label>
        <label className="flex">
            Password:
            <input type="password" placeholder="Password" name="password" onChange={handleInput} value={userInfo.password}/>
        </label>
        <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm