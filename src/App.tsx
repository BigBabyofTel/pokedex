import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      <header className="text-6xl border-4">
        <h1>PokeDex</h1>
      </header>
      <nav>
        <ul className="border-4">
          <li>Search</li>
          <li>My Pokemon</li>
          <li>Trading cards</li>
          <li>Blog</li>
        </ul>
      </nav>
      <main className="border-4">
        <h2>Pokemon</h2>
        <article className="border-4">
          <h2>picture of pokemon</h2>
          <aside className="border-4">pokemon stats</aside>
          <figure className="border-4">evolutions and details</figure>
          <figure className="border-4">moves</figure>
        </article>
      </main>
      <footer className="border-4"><h2>Created by T. Augustus Baker</h2></footer>
    </Fragment>
  );
}
