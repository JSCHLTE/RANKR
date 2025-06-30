"use client"

import Link from "next/link"
import Image from "next/image"

import './navbar.css'
import { useState } from "react"

const Navbar = () => {

  const [nav, setNav] = useState(false);

  return (
    <div className="nav-inner flex">
      <div className="nav-left flex">
        <div className="nav-logo">
          <p>Rank Junkie</p>
        </div>
        <ul className={`nav-links ${nav ? "active" : ""}`}>
          <li><Link href="#">Home</Link></li>
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