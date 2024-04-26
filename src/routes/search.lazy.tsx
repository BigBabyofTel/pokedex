import { getCm, getFeet, getKgs, getLbs, nanoId, getCapital } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Switch,
  Progress,
} from "@nextui-org/react";
import { ReactNode, useState } from "react";
import { Pokemon } from "@/interfaces";
import axios from "axios";
import { Stats } from "@/components/ui/stats";

export const Route = createLazyFileRoute("/search")({
  component: Search,
});



export function Search() {
  const [isOn, setIsOn] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const getPokemon = async (): Promise<Pokemon> => {
    const url = `https://pokeapi.co/api/v2/pokemon/${searchKey}`;
    const response: Pokemon = await axios.get(url);
    return response;
  };

  const { data, error, status } = useQuery({
    queryKey: ["pokemon", searchKey],
    queryFn: getPokemon,
  });

  const pokemonMoves = data?.data?.moves;
  const moves = pokemonMoves?.map((item: { move: { name: string } }) => {
    return <span key={nanoid()}>{getCapital(item.move.name)}</span>;
  });

const stats = data?.data.stats;

  const statLevel = stats?.map(
    (item: { stat: { name: string }; base_stat: number }) => {
      const name = item.stat.name as string;
      const amount = item.base_stat as number;
      return (
        <span key={nanoId()}>
          {getCapital(name)}: {amount} <Progress value={amount} />
        </span>
      );
    }
  );

  const name = data?.data.name as string;
  const weight = data?.data.weight as number;
  const height = data?.data.height as number;
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.data.id}.png`;
  const type = data?.data.types;
  const types = type?.map((item) => {
    return (
      <span key={nanoid()}>
        <p>{getCapital(item.type.name)}</p>
      </span>
    );
  });

  console.log(type);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-mount bg-cover">
        <div className="lg:w-[1200px] lg:h-[600px] w-[350px] h-[600px] grid grid-cols-4 grid-rows-9 gap-3 p-2 border">
          <Input
            placeholder="Search"
            className="col-span-4 lg:col-span-1 p-1"
            size="lg"
            color="primary"
            radius="full"
            aria-label="search-box"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          {error?.name}
          {error?.message}
          {searchKey !== "" && (
            <>
              <Card
                aria-label="pokemon-image"
                isBlurred
                className="col-start-2 col-span-3 row-span-2 lg:row-start-2 lg:row-span-6 lg:col-start-1 lg:col-span-1 "
              >
                <CardHeader></CardHeader>
                <CardBody>
                  {searchKey && (
                    <>
                      <h1 className="text-3xl">{getCapital(name)}</h1>
                      <img src={image} />
                    </>
                  )}
                </CardBody>
              </Card>
              <Card
                aria-label="pokemon-data"
                isBlurred
                className="col-start-1 col-span-1 row-start-2 row-span-4 lg:row-start-8 lg:row-span-2 lg:col-start-1 lg:"
              >
                <CardBody>
                  <Switch
                    onClick={() => setIsOn(!isOn)}
                    aria-label="metric-imperial"
                  />
                  <section>
                    {isOn ? (
                      <div className="">
                        <span> Weight: {getLbs(weight)} lbs</span>
                        <br />
                        <span>Height: {getFeet(height, getCm)} Feet</span>
                      </div>
                    ) : (
                      <div className="">
                        <span> Weight: {getKgs(weight)} Kgs</span>
                        <br />
                        <span>Height: {getCm(height)} Cm</span>
                      </div>
                    )}
                  </section>
                  <br />
                  <section>
                    Type
                    {types}
                  </section>
                </CardBody>
              </Card>
              <Card
                aria-label="pokemon-stats"
                isBlurred
                className="col-start-2 col-span-3 row-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-5"
              >
                <CardHeader>
                  <h1>Stats</h1>
                </CardHeader>
                <CardBody>{statLevel}</CardBody>
              </Card>
              <Stats stats={stats}/>
                      
              <Card
                aria-label="pokemon-moves"
                isBlurred
                className="row-start-8 row-span-2 col-span-4 lg:col-start-4 lg:row-start-2 lg:row-span-8"
              >
                <CardHeader>
                  <h1>moves</h1>
                </CardHeader>
                <CardBody>{moves}</CardBody>
              </Card>
            </>
          )}
          {status === "pending" && <p>Loading...</p>}
          {status === "error" && <p>Error: {`${error}`}</p>}
        </div>
      </div>
    </>
  );
}
