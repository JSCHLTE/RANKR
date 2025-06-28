import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <header>
      <h1>The Fantasy App for Draft Junkies</h1>
      <p>The ultimate tool for fantasy football fanatics obsessed with rankings and draft domination.</p>
      <div className="header-buttons">
        <Link href="#">Get Started</Link>
        <Link href="#">How It Works?</Link>
      </div>
    </header>
  );
}
