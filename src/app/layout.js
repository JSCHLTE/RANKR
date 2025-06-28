import "./globals.css";

import Navbar from "@/app/components/navbar/Navbar";

export const metadata = {
  title: "Rank Junkie",
  description: "Fantasy rankings app by Jordan Schulte",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Navbar />
        </nav>
        <div className="content-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
