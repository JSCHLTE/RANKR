"use client"

import Link from "next/link"
import Image from "next/image"

import './navbar.css'
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const Navbar = () => {

  const pathname = usePathname();
  const [nav, setNav] = useState(false);

  useEffect(() => {
    setNav(false)
  }, [pathname])

  return (
    <div className="nav-inner flex">
      <div className="nav-left flex">
        <div className="nav-logo">
          <p>RankJunkie</p>
        </div>
        <ul className={`nav-links ${nav ? "active" : ""}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="#">How It Works</Link></li>
          <li><Link href="rankings">Rankings</Link></li>
          <li><Link href="#">Community</Link></li>
          <li><Link href="#">Contact</Link></li>
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