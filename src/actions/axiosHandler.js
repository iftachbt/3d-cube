import axios from "axios";

export async function getRickAndMortyCharacters(page) {
  const res = await axios.get("https://rickandmortyapi.com/api/character?page=" + page);
  return res.data;
}
