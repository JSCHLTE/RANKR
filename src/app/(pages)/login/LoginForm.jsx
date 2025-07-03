"use client"

import { useState } from "react";
import { login } from "@/app/providers/signin/signin";

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

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const userCredential = await login(userInfo.email, userInfo.password);
    console.log("User logged in:", userCredential.user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  return (
    <form id='loginForm' className="flex" onSubmit={handleSubmit}>
        <label className="flex">
            Email:
            <input type='email' placeholder="Email..." name="email" onChange={handleInput} value={userInfo.email}/>
        </label>
        <label className="flex">
            Password:
            <input type="password" placeholder="Password..." name="password" onChange={handleInput} value={userInfo.password}/>
        </label>
        <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm