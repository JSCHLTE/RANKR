// app/layout.jsx
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";
import Script from "next/script";
import ClientNavbar from "./components/navbar/ClientNavbar";

export const metadata = {
  title: "RANKR",
  description: "Fantasy rankings app by Jordan Schulte",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Knewave&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://kit.fontawesome.com/ad03dfc62c.js"
          crossorigin="anonymous"
          strategy="lazyOnload"
        />
        <link rel="icon" href="/images/lion-blue.svg" />
      </head>
      <body>
        <div className="content-wrapper">
          <AuthProvider>
            <ClientNavbar /> {/* ← This is now safe */}
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}