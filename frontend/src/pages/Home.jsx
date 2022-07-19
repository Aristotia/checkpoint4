import axios from "axios";
import { useEffect } from "react";
import Header from "../components/Header";

export default function Home() {
  useEffect(() => {
    axios
      .get(
        `https://imdb-api.com/en/API/Posters/${
          import.meta.env.VITE_API_KEY
        }/tt1375666`
      )
      .then((response) => console.error(response.data));
  }, []);

  return (
    <div>
      <Header />
      <h1>Henlo</h1>
    </div>
  );
}
