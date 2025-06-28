import Link from "next/link"
import Image from "next/image"

import './navbar.css'

const Navbar = () => {
  return (
    <div className="nav-inner flex">
      <div className="nav-left flex">
        <div className="nav-logo">
          <p>Rank Junkie</p>
        </div>
        <ul className="nav-links flex">
          <li><Link href="#">Home</Link></li>
          <li><Link href="#">How It Works</Link></li>
          <li><Link href="#">Rankings</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>
      </div>
      <div className="nav-right">
        <div className="burger flex-center">
          <div className="line line1"></div>
          <div className="line line2"></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar