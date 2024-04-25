import { ReactNode } from "react";

export interface Pokemon {
  data: {
    name: string;
    weight: number;
    height: number;
    id: number;
    types: [
      {
        type: {
          name: string;
        };
      },
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
      others: {
        "official_artwork": {
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
  };
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
