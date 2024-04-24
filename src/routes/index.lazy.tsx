import { createLazyFileRoute } from "@tanstack/react-router";
import cover from "../../public/pokedex.svg";

export const Route = createLazyFileRoute("/")({
  component: FrontDisplay,
});

export function FrontDisplay() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-mount bg-cover">
        <a href="./search" className="">
          <img
            src={cover}
            alt="front display"
            className="portrait:h-[33%] lg:w-[1400px]"
          />
        </a>
      </div>
    </>
  );
}
