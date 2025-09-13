import Link from "next/link"

export default function Navbar(){
    return(
        <>
        <nav className="bg-green-600 flex justify-center gap-6 py-3">
        <Link href="#home" className="text-white font-semibold hover:underline">
          Home
        </Link>
        <Link href="#products" className="text-white font-semibold hover:underline">
          Plants
        </Link>
        <Link href="#guidance" className="text-white font-semibold hover:underline">
          Guidance
        </Link>
        <Link href="#contact" className="text-white font-semibold hover:underline">
          Contact
        </Link>
    
      </nav>

        </>
    )
}