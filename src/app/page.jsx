import Image from "next/image";

import '@/app/home.css'
import PlayerSlider from "@/app/components/home/PlayerSlider";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex video">
      <div className="video-wrapper">
        <video autoPlay muted loop playsInline src="https://ik.imagekit.io/al6vo6yqt/Untitled%20video%20-%20Made%20with%20Clipchamp.mp4?updatedAt=1755197145894"></video>
      </div>
        <div className="header-info">
        <h1 className="knewave">The <span className="blue">Fantasy</span> App for Draft <span className="blue">Fanatics</span></h1>
        <p>The ultimate tool for fantasy football fanatics obsessed with rankings and draft domination.</p>
        <div className="header-btn flex-center">
          <Link href="/create" className='home btn main'>Get started</Link>
          <Link href="#" className='home btn alt'>How it works?</Link>
        </div>
        </div>
      </header>
      <section id="stats" className="flex">
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
      <section id="draft">
        <div className="draft-wrapper">
          <div className="draft-intro">
            <h2 className="section-title">Draft With Your Rankings</h2>
            <p className="section-desc">Turn your rankings into your ultimate draft weapon. Enter the war room knowing who’s your best pick at every turn. Hit Draft Mode in your rankings to check off drafted players and always keep your board one step ahead of the competition.</p>
          </div>
          <div className="section-bottom draft-img">
            <Image src="/images/draft.webp" width={800} height={400}/>
          </div>
        </div>
      </section>
      <section id="community">
        <div className="community-wrapper">
          <div className="community-intro">
            <h2 className="section-title">Post Your Rankings</h2>
            <p className="section-desc">Join the conversation. Post your rankings and see how other people are stacking their boards for fantasy domination.</p>
          </div>
        </div>
      </section>
    </>
  );
}
