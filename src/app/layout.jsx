import "./globals.css";

import Navbar from "@/app/components/navbar/Navbar";
import { AuthProvider } from "./providers/AuthProvider";

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
    </head>
      <body>
        <AuthProvider>
          <nav>
            <Navbar />
          </nav>
          <div className="content-wrapper">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
