import { getPokemon } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { nanoid } from "nanoid";

export const Route = createLazyFileRoute("/search")({
  component: Search,
});

export function Search() {
  const { data, error, status } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
  });

  const pokemonMoves = data?.moves;
const moves = pokemonMoves?.map((item) => {
    return (<span key={nanoid()}>{item.move.name}</span>)
})


const pokemonName = data?.name;
    return (
        <>
        {status && 
        <h1>{pokemonName}</h1>
        
        }
        {moves}
        {error && <h1>{error.message}</h1>}
        </>
    )
}           