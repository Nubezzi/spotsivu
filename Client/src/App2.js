/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Datavis from './Datavis';
import { getDefaultNormalizer } from '@testing-library/react';

function App() {
  const [pricesToday, setPricesToday] = useState(null);
  const [pricesTomorrow, setPricesTomorrow] = useState(null);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);

  async function getData(url) {
    const response = await fetch(
      url,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
    return response.data
  }
 
  useEffect(() => {
    async function testi() {
      data = await getData("https://api.spot-hinta.fi/Today")
      setPricesToday(data)
    }
    testi()
  }, []);

  function Errors () {
    let a = !!error1
    let b = !!error2
    return (
      <div>
        <p>{a && (error1.toString)}</p>
        <p>{b && (error2.toString)}</p>
      </div>
    )
  }


  return (
    <div className="App">
      <h1>Testi!</h1>
      <h2>{pricesToday}</h2>
      <h2>{pricesTomorrow}</h2>
      <Datavis dataToday={pricesToday} dataTomorrow={pricesTomorrow}/>
      <Errors />
    </div>
  );
}

export default App;
