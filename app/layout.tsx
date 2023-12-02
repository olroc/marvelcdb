import "./globals.css";

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cover w-full bg-no-repeat bg-[url('/img/background.jpg')]">
        <nav className="flex">
          <Link href="/">
            <img src="/img/logo.webp" className="px-3 py-3 h-[80px]" />
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
