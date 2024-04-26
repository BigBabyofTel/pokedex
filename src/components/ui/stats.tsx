import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { ResponsiveRadar } from "@nivo/radar";
import { ReactNode } from "react";


interface Props {
  stats: [];
  children: ReactNode;
}

export function Stats(stats: Props) {


  const statName = stats?.stats.map(
    (item: { stat: { name: string; base_stat: number } }) => {
      const name = item.stat.name
      console.log(name);
      return name;
    }
  );

  console.log(statName);

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
        <CardBody>
            <MyResponsiveRadar statName={statName} />
        </CardBody>
      </Card>
    </>
  );
}

export const MyResponsiveRadar = (statName) => (
    <ResponsiveRadar
        data={}
        keys={statName}
        indexBy={}
        />)
