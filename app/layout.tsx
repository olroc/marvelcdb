import './globals.css'

import Header from './components/organisms/header/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-cover w-full bg-no-repeat bg-[url('/img/background.jpg')]">
        <Header />

        <section className="flex justify-center py-36">{children}</section>
      </body>
    </html>
  )
}
