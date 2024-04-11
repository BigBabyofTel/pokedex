import axios from "axios";
import { Fragment, useState } from "react";


export default function App() {
  const [pokemon, setPokemon] = useState({});

  async function getPokemonData() {
    const url = "https://pokeapi.co/api/v2/pokemon/1";
    const data = await axios.get(url);
    console.log(data.data);
    setPokemon(data.data);
    return {pokemon};
  }
const pokeAbilities = {pokemon};

  console.log(pokemon);
  console.log(pokeAbilities);

  return (
    <Fragment>
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
        <h2 className="text-3xl">pokemon</h2>
        <article className="m-2 p-3 border">
          <h2 className="text-xl">picture of pokemon</h2>
          <aside className="border m-2 p-3">pokemon stats:</aside>
          <figure className="m-2 p-3">evolutions and details</figure>
          <figure className="m-2 p-3">moves</figure>
        </article>
        <button onClick={() => getPokemonData()} className="border rounded-full p-4">Get pokemon</button>
      </main>
      <footer className="border-4 fixed bottom-0 left-0 right-0 text-center bg-red-400">
        <h2>Created by T. Augustus Baker</h2>
      </footer>
    </Fragment>
  );
}
