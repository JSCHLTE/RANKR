import "./globals.css";

import Navbar from "@/app/components/navbar/Navbar";
import { AuthProvider } from "./providers/AuthProvider";
import Script from "next/script";

export const metadata = {
  title: "RANKR",
  description: "Fantasy rankings app by Jordan Schulte",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet" />
      <Script src="https://kit.fontawesome.com/ad03dfc62c.js" crossorigin="anonymous" strategy="lazyOnload"></Script>
      <link rel="icon" href="/images/lion-blue.svg" />
    </head>
      <body>
      <div className="content-wrapper">
        <AuthProvider>
          <nav>
            <Navbar />
          </nav>
            {children}
        </AuthProvider>
        </div>
      </body>
    </html>
  );
}
