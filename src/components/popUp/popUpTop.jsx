import React, { useEffect } from "react";
import style from "./popUpTop.module.css"
import { Clear } from '@mui/icons-material';

function popUpTop(props){
  const {characterInfo,setPopUp} = props
  const {name,gender,species} = characterInfo

  const handleClick = () =>{
    setPopUp(false)
  }

  return(
    <div className={style.con}>
      <div>
        <div>
          <div className={style.exit}>
            <Clear onClick={handleClick} />
          </div>
        </div>
        <div className={style.infoCon}>
          <div><span className={style.bold}>name:</span> {name}</div>
          <div><span className={style.bold}>gender:</span> {gender}</div>
          <div><span className={style.bold}>species:</span> {species}</div>
        </div>
      </div>
    </div>
  )
}
export default popUpTop