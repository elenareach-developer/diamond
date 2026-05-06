import rstiara from "../assets/tiaras/rstiara.svg";
import edtiara from "../assets/tiaras/edtiara.svg";

// =========================
// src/data/diadems.tsч
// =========================
export type TiaraItem = {
    id: string;
    name: string;
    created: string;
    origin: string;
    stones: string[];
    value: string;
    image: string;
    description: string;
  };


export const tiaras: TiaraItem[] = [
    {
      id: "royal-sapphire",
      name: "Royal Sapphire Tiara",
      created: "1820",
      origin: "England",
      stones: ["Sapphire", "Diamond"],
      value: "$5M",
      image: rstiara,
      description: "A royal tiara gifted after a historic victory.",
    },
    {
      id: "emerald-dream",
      name: "Emerald Dream",
      created: "1750",
      origin: "France",
      stones: ["Emerald", "Diamond"],
      value: "$8M",
      image: edtiara,
      description: "Symbol of forbidden love in royal courts.",
    }
  ];


  export const journey = [
    { city: "London", x: 200, y: 120, year: 1820 },
    { city: "Paris", x: 220, y: 140, year: 1823 },
    { city: "Venice", x: 260, y: 160, year: 1827 },
    { city: "Istanbul", x: 320, y: 170, year: 1831 },
    { city: "Jaipur", x: 420, y: 220, year: 1836 },
  ];