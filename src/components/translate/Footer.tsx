import Image from 'next/image'
import Link from 'next/link'
import logo from 'public/noves-logo-black.svg'

const Footer = () => {
  return(
    <footer className="grid grid-cols-2 gap-2 pt-2 pb-2 bg-white relative">
      <div className="flex items-center justify-end">
        <p className="text-gray-500">Powered by</p>
      </div>

      <div className="text-left w-16 flex items-center justify-beginning cursor-pointer">
        <Link href={'https://noves.fi'} target="_blank" className="w-full">
          <Image className="w-full" src={logo} alt="Noves Translate" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer