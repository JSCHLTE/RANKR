import React from 'react'

const SignupForm = () => {
  return (
    <form id='loginForm' className="flex">
    <label className="flex">
        Email:
        <input type='email' placeholder="Email..."/>
    </label>
    <label className="flex">
        Username:
        <input type='text' placeholder="Username..."/>
    </label>
    <label className="flex">
        Password:
        <input type="password" placeholder="Password..."/>
    </label>
    <label className="flex">
        Confirm Password:
        <input type="password" placeholder="Confirm Password..."/>
    </label>
    <button type='submit'>Signup</button>
</form>
  )
}

export default SignupForm