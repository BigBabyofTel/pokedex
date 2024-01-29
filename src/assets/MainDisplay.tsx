import { useState } from "react";

export default function MainDisplay() {
const [pokemon, setPokemon] = useState([]);

function getRandomNumber():number {
    return Math.floor(Math.random() * 151);
}
const url = `https://pokeapi.co/api/v2/pokemon/${getRandomNumber()}/`;
const getPokemon = async(url:string) => {
    try {
        const request = new Request(url);
        const response = await fetch(request);
        const data = await response.json();
        setPokemon(data);
    } catch (error) {
        console.error();
    }
};

console.log(pokemon);

;  
/*
const renderPokemon = () => {
  try {
    
    return pokemon.map(

    )
  } catch (error) {
    console.error();
  }  
*/

    return (
        <>
        <div className="border-2">
            <h1 className="p-5 underline underline-offset-8">Pokedex No. : </h1>

        </div>
        </>
    )
};