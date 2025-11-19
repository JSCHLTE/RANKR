"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { getUserById } from "@/app/providers/getUser/getUser";

import './navbar.css';

const Navbar = () => {
  const pathname = usePathname();
  const [nav, setNav] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hide, setHide] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const prevScrollYRef = useRef(0);
  const [username, setUsername] = useState(null);
  const { user, logout } = useAuth();

  // Mount effect
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Scroll effect (only after mount)
  useEffect(() => {
    if (!hasMounted) return;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setHide(y > 300 && y > prevScrollYRef.current);
      prevScrollYRef.current = y;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMounted]);

  // Reset nav on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setNav(false);
  }, [pathname]);

  // Fetch username
  useEffect(() => {
    if (!user?.uid) {
      setUsername(null);
      return;
    }
    const fetchUser = async () => {
      try {
        const data = await getUserById(user.uid);
        setUsername(data?.username || null);
      } catch {
        setUsername(null);
      }
    };
    fetchUser();
  }, [user]);

  // If not mounted, render EXACTLY what the server rendered
  if (!hasMounted) {
    return (
      <nav className="">
        <div className="nav-inner flex">
          <div className="nav-left flex">
            <div className="nav-logo">
              <Link href="/">
                <Image
                  src="/images/blue-long.svg"
                  width={175}
                  height={80}
                  alt="Lion with crown"
                />
              </Link>
            </div>
            <ul className="nav-links">
              <li><Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link></li>
              <li><Link href="/create" className={pathname === "/create" ? "active" : ""}>Create</Link></li>
              <li><Link href="/users" className={pathname === "/users" ? "active" : ""}>Users</Link></li>
              <li><Link href="/rankings" className={pathname === "/rankings" ? "active" : ""}>Rankings</Link></li>

              {user ? (
                <>
                  <li><Link href={`/users/${username || ''}`} className={pathname === `/users/${username}` ? "active" : ""}>My Profile</Link></li>
                  <li onClick={logout}><Link href="/">Logout</Link></li>
                </>
              ) : (
                <>
                  <li><Link href="/login" className={pathname === "/login" ? "active" : ""}>Login</Link></li>
                  <li><Link href="/signup" className={pathname === "/signup" ? "active" : ""}>Signup</Link></li>
                </>
              )}
            </ul>
          </div>
          <div className="nav-right">
            <div className="burger flex-center" onClick={() => setNav(p => !p)}>
              <div className="line line1"></div>
              <div className="line line2"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // After mount: full dynamic version
  const navClass = `${scrollY > 50 ? 'active' : ''} ${hide && !nav ? 'scrolled' : ''}`;

  return (
    <nav className={`${navClass} ${nav ? 'open' : ''}`}>
      <div className="nav-inner flex">
        <div className="nav-left flex">
          <div className="nav-logo">
            <Link href="/">
              <Image
                src="/images/blue-long.svg"
                width={175}
                height={80}
                alt="Lion with crown"
              />
            </Link>
          </div>
          <ul className={`nav-links ${nav ? "active" : ""}`}>
            <li><Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link></li>
            <li><Link href="/create" className={pathname === "/create" ? "active" : ""}>Create</Link></li>
            <li><Link href="/users" className={pathname === "/users" ? "active" : ""}>Users</Link></li>
            <li><Link href="/rankings" className={pathname === "/rankings" ? "active" : ""}>Rankings</Link></li>

            {user ? (
              <>
                <li>
                  <Link
                    href={`/users/${username || ''}`}
                    className={pathname === `/users/${username}` ? "active" : ""}
                  >
                    My Profile
                  </Link>
                </li>
                <li onClick={logout}><Link href="/">Logout</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/login" className={pathname === "/login" ? "active" : ""}>Login</Link></li>
                <li><Link href="/signup" className={pathname === "/signup" ? "active" : ""}>Signup</Link></li>
              </>
            )}
          </ul>
        </div>

        <div className="nav-right">
          <div
            className={`burger flex-center ${nav ? "active" : ""}`}
            onClick={() => setNav(p => !p)}
          >
            <div className="line line1"></div>
            <div className="line line2"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;