const LoginForm = () => {
  return (
    <form id='loginForm' className="flex">
        <label className="flex">
            Email or Username:
            <input type='text' placeholder="Email or Username..."/>
        </label>
        <label className="flex">
            Password:
            <input type="password" placeholder="Password"/>
        </label>
        <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm