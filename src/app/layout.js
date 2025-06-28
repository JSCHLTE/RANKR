import "./globals.css";

export const metadata = {
  title: "Rank Junkie",
  description: "Fantasy rankings app by Jordan Schulte",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
