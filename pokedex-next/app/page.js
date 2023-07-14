import Image from "next/image";
import Link from "next/link";
import pokedexLogo from "../public/img/pokedex.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-black text-3xl text-center font-bold">Acesse sua Pokedex</h1>
        <Image src={pokedexLogo} alt="pokedex" width={500} height={500} className="my-10"/>
        <Link href="pokedex" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
          Abrir Pokedex
        </Link>
    </main>
  )
}
