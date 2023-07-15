import Image from "next/image";

export default async function Pokedex(){
    const loadPokemons = await getPokemons();

    function handlePokemonTypes(type) {
        let className = "py-1 px-3 rounded-md mr-1 text-white ";

        // bg-[#COLOR]
        switch (type) {
            case "fire":
                className += "bg-[#FD6132]";
                break;

            case "grass":
                className += "bg-green-400";
                 break;

            case "poison":
                className += "bg-purple-500";
                 break;
            
            case "electric":
                className += "bg-yellow-500";
                 break;
            
            case "flying":
                className += "bg-violet-400";
                 break;
            
            case "ground": 
                className += "bg-[#AA783E]";
                break;
            
            case "water":
                className += "bg-blue-400";
                break;
            
            case "normal":
                className += "bg-[#F2F4F5]";
                break;

            case "bug":
                className += "bg-[#a5bd21]";
                break;

            case "fairy":
                className += "bg-[#FAB1FC]";
                break;

            case "fighting":
                className += "bg-[#FFA301]";
                break;

            case "ghost":
                className += "bg-[#6C4272]";
                break;

            case "rock":
                className += "bg-[#BBBA88]";
                break;

            case "steel":
                className += "bg-[#6AB0D5]";
                break;

            case "psychic":
                className += "bg-[#FC617D]";
                break;

            case "ice":
                className += "bg-[#44D6FB]";
                break;

            case "dragon":
                className += "bg-[#5464D4]";
                break;

            case "dark":
                className += "bg-[#484848]";
                break;

            default:
                className += "bg-black";
                break;
        }

        return className;
    }

    function handlePokemonExp(baseExperience) {
        let className = "bg-blue-400 h-1 ";


        if(baseExperience >= 0 && baseExperience < 100) {
            className += "w-[10%]";
        } else if(baseExperience >= 100 && baseExperience < 200) {
            className += "w-[20%]";
        } else if(baseExperience >= 200 && baseExperience < 300) {
            className += "w-[30%]";
        } else if(baseExperience >= 300 && baseExperience < 400) {
            className += "w-[40%]";
        } else if(baseExperience >= 400 && baseExperience < 500) {
            className += "w-[50%]";
        } else if(baseExperience >= 500 && baseExperience < 600) {
            className += "w-[60%]";
        } else if(baseExperience >= 600 && baseExperience < 700) {
            className += "w-[70%]";
        } else if(baseExperience >= 700 && baseExperience < 800) {
            className += "w-[80%]";
        } else if(baseExperience >= 800 && baseExperience < 900) {
            className += "w-[90%]";
        } else if(baseExperience >= 900 && baseExperience < 1000) {
            className += "w-[100%]";
        }

        return className;
    }
    
    return(
        <main className="flex min-h-screen flex-col items-center justify-center sm:p-10 lg:p-24 text-black">
            <div className="grid grid-cols-3 gap-4">
                {
                    loadPokemons.map((pokemon, idx) => {
                        return(
                
                            <div>
                                <div className="bg-white sm:w-40 sm:h-40 lg:w-80 lg:h-28 flex lg:justify-between sm:justify-center sm:flex-row lg:items-center sm:items-start lg:p-5 sm:flex-wrap lg:flex-nowrap sm:p-2">
                                    <div>
                                        <h3 className="text-cyan-600 font-semibold text-xl mb-3">{`${pokemon.name?.charAt(0).toUpperCase()}${pokemon.name?.slice(1)}`}</h3>
                                        {pokemon.types?.map((typeA) => {
                                            return(
                                                <span className={handlePokemonTypes(typeA.type?.name)}>
                                                    {`${typeA.type?.name?.charAt(0).toUpperCase()}${typeA.type?.name?.slice(1)}`}
                                                </span>
                                            ); 
                                        })}
                                    </div>
                    
                                    <div className="flex flex-wrap lg:flex-col sm:flex-row lg:items-end sm:items-start sm:justify-center">
                                        <p className="text-gray-400 text-sm">{`#${idx + 1}`}</p>
                                        <Image src={pokemon.sprites?.other?.home?.front_default} alt="pokemon img" width={70} height={70} />
                                        <p className="text-green-500 text-sm">{pokemon.forms?.length}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-300 h-1">
                                    <div className={handlePokemonExp(pokemon.base_experience)}>
                                        
                                    </div>
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