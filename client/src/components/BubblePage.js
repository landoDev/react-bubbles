import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(()=>{
    // BASE URL NOT WORKING HERE EITHER
    //HAVING 403 ERRORS BUT I HAVE A TOKEN? WTF
    axiosWithAuth()
    .get('/api/colors')
    .then(res=>{
      console.log('GET request in BubblePages: ', res)
      setColorList(res.data)
    })
    .catch(err => console.log('error', err))
  }, [])


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
