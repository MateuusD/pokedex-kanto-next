import Image from "next/image";

export default async function Pokedex(){
    const loadPokemons = await getPokemons();
    return(
        <main className="flex min-h-screen flex-col items-center justify-center p-24 text-black">
            <div className="grid grid-cols-3 gap-4">
                {
                    loadPokemons.map((pokemon, idx) => {
                        return(
                
                            <div className="bg-white lg:w-60 flex justify-between items-center p-3">
                                <div>
                                    <h3>{`${pokemon.name?.charAt(0).toUpperCase()}${pokemon.name?.slice(1)}`}</h3>
                                    {pokemon.types?.map((typeA) => {
                                        return(
                                            <span>
                                                {`${typeA.type?.name?.charAt(0).toUpperCase()}${typeA.type?.name?.slice(1)}`}
                                            </span>
                                        ); 
                                    })}
                                </div>
                
                                <div className="flex flex-wrap flex-col items-end ">
                                    <p>{`#${idx + 1}`}</p>
                                    <Image src={pokemon.sprites?.other?.home?.front_default} alt="pokemon img" width={100} height={100} />
                                    <p>{pokemon.forms?.length}</p>''
                                </div>
                            </div>
                
                        );
                    })
                }
            </div>
        </main>
    );
}

// SSR no Next 13 (getServerSideProps)
const getPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150');

    const responsePokemons = await res.json();

    const pokemons = await Promise.all(
        responsePokemons.results.map(async (result) => {
          try {
            const res = await fetch(result.url);
            if (!res.ok) {
              throw new Error('Fetch failed');
            }
            const pokemon = await res.json();
            return pokemon;
          } catch (error) {
            console.error('Error fetching data:', error);
            return null; // or handle the error in an appropriate way
          }
        })
    );
    
    return pokemons;
};