import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <nav>
      <Link href="/">
        <Image
          width={150}
          height={62}
          src="/img/logo.webp"
          className="mx-3 py-3 w-auto h-auto"
          alt="Marvel CDB logo"
          priority
        />
      </Link>
    </nav>
  )
}
