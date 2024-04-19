import axios from "axios";
import { Fragment, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCm, getFeet, getKgs, getLbs } from "./utils";
import { Switch } from "@/components/ui/switch";
const queryClient = new QueryClient();

interface TypeObject {
  type: string;
}

interface PkmnTypes {
  type: TypeObject[];
}
interface Pokemon {
  name: string;
  weight: number;
  height: number;
  types: PkmnTypes[];
  children: ReactNode;
}

export default function App() {
  const [pokemon, setPokemon] = useState({
    name: "",
    weight: 0,
    height: 0,
  });
  const [pkmnImgs, setPkmnImgs] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [typeOne, setTypeOne] = useState("");
  const [typeTwo, setTypeTwo] = useState("");

  // Working generic being used. The function, return and internal return get T as a presummed type. Split this up so the exact data can be typed!
  async function getPokemonData(): Promise<Pokemon> {
    const url = "https://pokeapi.co/api/v2/pokemon/390";
    const data = await axios.get(url);
    const pkmnData: Pokemon = data.data;
    const typeOne: [] = data.data.types;
    if (typeOne.length > 1) {
      setTypeOne(data.data.types[0].type.name);
      setTypeTwo(data.data.types[1].type.name);
    } else {
      setTypeOne(data.data.types[0].type.name);
      setTypeTwo("");
    }
    setPokemon(pkmnData);
    setPkmnImgs(data.data.sprites.other["official-artwork"].front_default);
    console.log(data.data.types);
    return pkmnData;
  }

  function getCapital(val: string) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  console.log();

  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <main>
          <header className="text-6xl m-2 p-3 bg-red-400">
            <h1>PokeDex</h1>
          </header>
          <nav>
            <ul className="flex justify-around bg-black">
              <li className="text-white">Search</li>
              <li className="text-white">My Pokemon</li>
              <li className="text-white">Trading cards</li>
              <li className="text-white">Blog</li>
            </ul>
          </nav>
          <main className="m-2 p-3 bg-red-400">
            <h2 className="text-3xl">{getCapital(pokemon.name)}</h2>
            {pokemon.name && (
              <article className="m-2 p-3 border-4">
                <figure>
                  {pkmnImgs && <img src={pkmnImgs} alt="picture of pokemon" />}
                  <figcaption></figcaption>
                </figure>
                <h2 className="text-xl"></h2>
                <img />
                <Switch onClick={() => setIsOn(!isOn)} />
                <aside className="borderm-2 p-3">
                  <section>
                    {isOn ? (
                      <div className="border">
                        <h3>Imperial</h3>
                        <span> Weight :{getLbs(pokemon.weight)} lbs</span>
                        <br />
                        <span>
                          Height :{getFeet(pokemon.height, getCm)} Feet
                        </span>
                      </div>
                    ) : (
                      <div className="border">
                        <h3>Metric</h3>
                        <span> Weight: {getKgs(pokemon.weight)} Kgs</span>
                        <br />
                        <span>Height: {getCm(pokemon.height)} Cm</span>
                      </div>
                    )}
                  </section>
                </aside>
                <figure className="m-2 p-3">
                  Type:
                  <br />
                  {getCapital(typeOne)}
                  <br />
                  {getCapital(typeTwo)}
                </figure>
                <figure className="m-2 p-3">moves</figure>
              </article>
            )}
            <button
              onClick={() => getPokemonData()}
              className="border rounded-full p-4"
            >
              Get pokemon
            </button>
          </main>
          <footer className="text-center bg-red-400">
            <h2>Created by T. Augustus Baker</h2>
          </footer>
        </main>
      </Fragment>
    </QueryClientProvider>
  );
}
