import { Suspense, useEffect, useState } from "react";
import style from "./App.module.css";
import Cube from "./cubes/cube";
import { getRickAndMortyCharacters } from "../actions/axiosHandler";
import { Pagination } from "@mui/material";

export default function App() {
const [characters,setCharacters]= useState([])
const [filter,setFilter]= useState("")
const [start,setStart]= useState(0)
const [page,setPage]= useState(1)

  useEffect(() =>{
    charactersHandler()
  },[])

  const charactersHandler =async() =>{
    let _characters = []
    for(let i = 1; i<=42; i++){
      const res = await getRickAndMortyCharacters(i)
      _characters = [..._characters,...res.results]
    }
    setCharacters(_characters)
  }
 
  const filterInputDisplay = () => {
    return (
      <div className={style.filterInputCon}>
        <input 
          className={style.Input}
          placeholder="search name..."
          type="text"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setStart(0);
            setPage(1)
          }}
        />
      </div>
    )
  }

  const filteredCharacters = () => {
    if(filter === "") return characters
    return characters.filter(val => val.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const background = () => {
    return (
      <div className={style.background}></div>
    )
  }

  const ButtonsDisplay = () =>{
    return(
      <div className={style.buttonsCon}>
      <Pagination
        count={Math.floor(filteredCharacters().length/4)}
        onChange={(event,value) => {setStart((value-1)*4);setPage(value)}}
        page={page}
        color="secondary"
        />
      </div>
    )
  }

  return (
    <div>
      {background()}
      {filterInputDisplay()}
      <div className={style.mainCon}>
        {filteredCharacters().slice(start,start+4).map((character) => (
          <Suspense>
            <Cube key={character.name} character={character}/>
          </Suspense>
        ))}
      </div>
      {ButtonsDisplay()}
    </div>
  );
}