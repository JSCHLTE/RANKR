import Link from 'next/link'
import LoginForm from './LoginForm'
import "./login.css"

const Login = () => {
  return (
    <main className='login-wrapper'>
        <h1>Login</h1>
        <LoginForm />
        <p>Don't have an account? <Link href="/signup">Create an account</Link>.</p>
    </main>
  )
}

export default Login