import axios from "axios";
import {Evolution, Pokemon} from "@/interfaces"

//To metric
export function getKgs(hec: number): number {
    const weightInHec = hec;
    const weightInKg = ((weightInHec / 100) * 10).toFixed(2);
    return Number(weightInKg);
}

export function getCm(val:number): number {
    const heightInDec = val;
    const heightInCm = heightInDec * 10;
    return heightInCm;
}

//to imperial

export function getLbs(hec: number): number {
    const weightInHec = hec;
    const weightInLbs = ((weightInHec * 2.20462) / 10).toFixed(1);
    return Number(weightInLbs);
}

export function getFeet (val: number, getCm: (val: number) => number): number {
    const heightInFeet = (Math.ceil(getCm(val) / 2.54) / 12).toFixed(1);
    return Number(heightInFeet);
}
//for ids
export const nanoId = () => {
    const index = Math.random()
    return index;
  }
//capitalize strings
  export function getCapital(val: string) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  //get pokemon data
  export const getPokemon = async(): Promise<Pokemon> => {
    const url = "https://pokeapi.co/api/v2/pokemon/2";
    const response = await axios.get(url);
    return response.data as Pokemon
  }

  //evolution data
  export const getEvolutions = async (): Promise<Evolution> => {
    const data = await axios.get("https://pokeapi.co/api/v2/evolution-chain/1");
    //setEvolutions(data.data.chain.evolves_to[0].species.name);
    //setSecEvol(data.data.chain.evolves_to[0][0].species.name);
    return data;
  };