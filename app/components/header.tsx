import Image from "next/image";

export default function Header(){
    return(
        <>
            <header className="bg-green-800 text-white flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Image src="/logo/image.png" alt="GreenArray Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">GreenArray</h1>
        </div>
      </header>
        </>
    )
}