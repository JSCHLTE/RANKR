import SignupForm from "./SignupForm"
import Link from "next/link"
import "../login/login.css"

const Signup = () => {
  return (
    <main className='login-wrapper'>
        <h1 className="knewave">Signup</h1>
        <SignupForm />
        <p>Already have an account? <Link href="/login">Login</Link>.</p>
    </main>
  )
}

export default Signup