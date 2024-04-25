import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { getPokemon } from "@/utils";
import { useState } from "react";
import { Pokemon } from "@/interfaces";

export function Evolution() {
  const [id, setId] = useState() as Pokemon[];
  function getEvolutions() {
    const url = `https://pokeapi.co/api/v2/pokemon-species`;
    const response = axios.get(url);
    return response;
  }

  const { data, error, status } = useQuery({
    queryKey: ["evolution"],
    queryFn: getEvolutions,
  });

  console.log(data);

  return (
    <>
      <Card
        aria-label="pokemon-evolutions"
        isBlurred
        className="row-start-6 row-span-2 col-span-4 lg:col-start-2 lg:col-span-2 lg:row-start-7 lg:row-span-4"
      >
        <CardHeader>
          <h1>evolution</h1>
        </CardHeader>
        <CardBody></CardBody>
      </Card>
    </>
  );
}
