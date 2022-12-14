import React from "react";
import style from "./popUpBottom.module.css"

function popUpBottom(props){
  const {characterInfo,setPopUp} = props
  const {status,origin} = characterInfo

  return(
    <div className={style.con}>
        <div className={style.infoCon}>
          <div><span className={style.bold}>status:</span> {status}</div>
          <div><span className={style.bold}>origin:</span> {origin.name}</div>
        </div>
    </div>
  )
}
export default popUpBottom