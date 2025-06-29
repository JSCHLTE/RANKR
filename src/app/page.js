import Image from "next/image";
import Link from "next/link";

import '@/app/home.css'
import PlayerSlider from "@/app/components/home/PlayerSlider";

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
        <div className="section-item">
          <div className="section-inner">
          <div className="section-top">
              <h2 className="section-title">Choose Your 1.01</h2>
              <p className="section-desc">Think ADP’s got it wrong? Build your own rankings and prove who really knows ball.</p>
            </div>
            <div className="section-bottom">
              <PlayerSlider />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
