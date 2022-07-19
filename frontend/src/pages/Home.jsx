import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  // console.log(`${import.meta.env.API_KEY}`)
  useEffect(() => {
    axios
      .get(`https://imdb-api.com/en/API/Posters/k_q60exywl/tt1375666`)
      .then((response) => console.error(response.data));
  }, []);

  return <div>Henlo</div>;
}
