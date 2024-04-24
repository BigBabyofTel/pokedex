import { ReactNode } from "react";

export interface Pokemon {
  name: string;
  weight: number;
  height: number;
  types: [
    {
      type: {
        name: string;
      };
    },
  ];
  abilities: [
    {
      ability: {
        name: string;
      };
    },
  ];
  sprites: {
    other: {
      "offical-artwork": {
        front_default: string;
      };
    };
  };
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    },
  ];
  moves: [
    {
      move: {
        name: string;
      };
    },
  ];
  children: ReactNode;
}

export interface Evolution {
  data: {
    chain: {
      evolves_to: {
        species: {
          name: string;
        };
        evolves_to: {
          species: {
            name: string;
          };
        }[];
      }[];
    };
  };
}
