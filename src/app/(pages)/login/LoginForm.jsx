"use client"

import { useState } from "react";
import { login } from "@/app/providers/signin/signin";
import { useRouter } from "next/navigation";

const LoginForm = () => {

  const router = useRouter();

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
      router.push("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <form id='loginForm' className="flex" onSubmit={handleSubmit}>
      <input type='email' placeholder="Email" name="email" onChange={handleInput} value={userInfo.email} />
      <input type="password" placeholder="Password" name="password" onChange={handleInput} value={userInfo.password} />
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm