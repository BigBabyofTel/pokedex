import axios from "axios";
import { Fragment, ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCm, getFeet, getKgs, getLbs, nanoId } from "./utils";
import { Switch } from "@/components/ui/switch";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

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
  const [moves, setMoves] = useState([
    {
      move: {
        name: "",
      },
    },
  ]);
  const [stats, setStats] = useState([
    {
      base_stat: 0,
      stat: {
        name: "",
      },
    },
  ]);
  const [abilities, setAbilities] = useState([
    {
      ability: {
        name: "",
      },
    },
  ]);
  const [evolutions, setEvolutions] = useState({});

  // Working generic being used. The function, return and internal return get T as a presummed type. Split this up so the exact data can be typed!
  async function getPokemonData(): Promise<Pokemon> {
    const url = "https://pokeapi.co/api/v2/pokemon/150";
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
    setMoves(data.data.moves);
    setStats(data.data.stats);
    setAbilities(data.data.abilities);
    return pkmnData;
  }

  function getCapital(val: string) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }
  /*
  const getEvolutions = async () => {
    const data: { data: { chain: { evolves_to: [] } } } = await axios.get(
      "https://pokeapi.co/api/v2/evolution-chain/1"
    );
    setEvolutions(data.data.chain.evolves_to[0]);
  };

  const { data, error, status } = useQuery({
    queryKey: ["evolution"],
    queryFn: getEvolutions,
  });

  console.log(evolutions);
*/
  const statLevel = stats.map((item) => {
    const amount = item.base_stat;
    const name = item.stat.name;
    return (
      <span key={nanoId()}>
        {getCapital(name)}: {amount} <Progress value={amount} />
      </span>
    );
  });

  const abilityList = abilities.map((item) => (
    <span key={nanoId()}>
      <p>{getCapital(item.ability.name)}</p>
    </span>
  ));

  const moveList = moves.map((item) => (
    <span key={nanoId()}>
      <p>{item.move.name}</p>
    </span>
  ));

  return (
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

              <aside className="border m-2 p-3">
                <Switch onClick={() => setIsOn(!isOn)} />
                <section>
                  {isOn ? (
                    <div className="">
                      <h3>Imperial</h3>
                      <span> Weight: {getLbs(pokemon.weight)} lbs</span>
                      <br />
                      <span>Height: {getFeet(pokemon.height, getCm)} Feet</span>
                    </div>
                  ) : (
                    <div className="">
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
              <figure className="m-2 p-3">
                Ability:
                {abilityList}
              </figure>
              <figure className="m-2 p-3">
                Moves
                <ScrollArea className="border-4 h-[100px]">
                  {moveList}
                </ScrollArea>
              </figure>
              <figure className="m-2 p-3">
                <h3 className="text-xl p-2">Stats</h3>
                {statLevel}
              </figure>

              {status === "pending" && <p>Loading...</p>}
              {status === "error" && <p>Error: {`${error}`}</p>}
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
  );
}
