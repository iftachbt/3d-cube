import { useRef, useState } from "react";
import React from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import style from "./cube.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PopUp_bottom from "../popUp/popUpBottom";
import PopUp_top from "../popUp/popUpTop";


export default function Cube(props) {
  const [popUp,setPopUp]= useState(false)
  const {character} = props
  const {image,name} = character
  const textureImage = useLoader(TextureLoader, image);

  const displayPopup = () => {
    if(popUp){
      return (
        <>
        <PopUp_top 
          characterInfo={character}
          setPopUp ={setPopUp}
        />
        <PopUp_bottom 
          characterInfo={character}
        />
        </>
      )
    }
    else return null
  }
  
  function Box(props){
  const {textureImage}= props
    const cubeRef = useRef()
    useFrame((state, delta) => {
      if(popUp){
        cubeRef.current.rotation.x += delta
        cubeRef.current.rotation.y += delta
        cubeRef.current.rotation.z += delta
      }
    })

    return (
      <mesh 
        ref={cubeRef}
        rotation={cubeRef.current?[cubeRef.current.rotation.x,cubeRef.current.rotation.y,cubeRef.current.rotation.z]:[-10, 0, 1]} 
        onClick={() => {
          setPopUp(!popUp)
        }}>
        <boxGeometry attach="geometry" args={[3, 3, 3]} />
        <meshNormalMaterial attach="material" />
        <meshStandardMaterial map={textureImage} />
      </mesh>
    )
  }

  return (
    <div className={[style.itemCon,popUp?style.itemConOnPopUp:""].join(" ")}>
      {displayPopup()}
      <div className={style.itemLabel}>
        {popUp?"":name}
      </div>
      <div className={style.itemBox}>
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={popUp?0.3:0.1} />
          <directionalLight position={[-2, 5, 2]} />
          <Box textureImage={textureImage}></Box>
        </Canvas>
      </div>
    </div>
  );
}