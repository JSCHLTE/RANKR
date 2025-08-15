"use client"

import Link from "next/link"
import Image from "next/image"

import './navbar.css'
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/app/providers/AuthProvider"
import { getUser } from "@/app/providers/getUser/getUser"

const Navbar = () => {

  const pathname = usePathname();
  const [nav, setNav] = useState(false);
  const [username, setUsername] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    setNav(false)
  }, [pathname])

  useEffect(() => {
    
    const userId = user?.uid;

    const fetchUser = async() => {
      const data = await getUser(userId);
      if(data) {
        setUsername(data.username)
      } else {
        setUsername(null)
      }
    }

    fetchUser();
  }, [user])

  return (
    <div className="nav-inner flex">
      <div className="nav-left flex">
        <div className="nav-logo">
          <Link href="/"><Image src='/images/blue-long.svg' width='175' height='80' alt="SVG Graphic of a lion with a crown on the top of his head"/></Link>
        </div>
        <ul className={`nav-links ${nav ? "active" : ""}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/rankings">Rankings</Link></li>
          <li><Link href="/create">Create</Link></li>
          <li><Link href="/players">Players</Link></li>
          {user ?
          <>
            <li><Link href={`/users/${username}`}>My Profile</Link></li>
            <li onClick={logout}><Link href="/">Logout</Link></li>
          </>
          : <>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/signup">Signup</Link></li>
          </>}
        </ul>
      </div>
      <div className="nav-right">
        <div className={`burger flex-center ${nav ? "active" : ""}`} onClick={() => setNav(prev => !prev)}>
          <div className="line line1"></div>
          <div className="line line2"></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar