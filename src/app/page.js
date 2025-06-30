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
      <section id="stats">
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
      <section id="community">
        <div className="community-wrapper">
          <div className="community-intro">
            <h2 className="section-title">Post Your Rankings</h2>
            <p className="section-desc">Join the conversation. Post your rankings and see how other draft junkies are stacking their boards for fantasy domination.</p>
          </div>
        </div>
      </section>
      <section id="draft">
        <div className="draft-wrapper">
          <div className="draft-intro">
            <h2 className="section-title">Draft With Your Rankings</h2>
            <p className="section-desc">Turn your rankings into your ultimate draft weapon. Enter the war room knowing who’s your best pick at every turn. Hit Draft Mode in your rankings to check off drafted players and always keep your board one step ahead of the competition.</p>
          </div>
        </div>
      </section>
    </>
  );
}
