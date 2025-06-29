import Image from "next/image";
import Link from "next/link";

import './home.css'

export default function Home() {
  return (
    <>
      <header className="flex-center">
        <h1>The Fantasy App for Draft Junkies</h1>
        <p>The ultimate tool for fantasy football fanatics obsessed with rankings and draft domination.</p>
        <div className="header-btn flex-center">
          <Link href="#" className="btn main">Get Started</Link>
          <Link href="#" className="btn alt">How It Works?</Link>
        </div>
      </header>
      <section>
        <h2>Choose Your True 1.01</h2>
      </section>
    </>
  );
}
