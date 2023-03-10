/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.css';
import ChartData from './charts';

function App() {
  const [today, setToday] = useState(null);
  const [tomorrow, setTomorrow] = useState(null);
  const [err, setErr] = useState(null);
  const [curr, setCurr] = useState(5);

  function refreshPage() {
    window.location.reload(true);
  }

  function getCurr() {
    return curr
  }
  

  useEffect(() => {
    async function fetchToday() {
      // Make the request to the proxy server
      const response = await fetch('api/Today')
        .catch((e)=> {
        setErr(e.message)
        });
      const data = await response.json();
      setToday(data);
    }
    async function fetchTomorrow() {
      // Make the request to the proxy server
      const response = await fetch('api/DayForward')
        .catch((e)=> {
          setErr(e.message)
        });
        const data = await response.json();
        if(response.status == 304 || response.status == 200) {
          setTomorrow(data);
        }
      
    }
    try{
      fetchToday()
      fetchTomorrow()
    }catch (e){
      setTimeout(() => {  refreshPage(); }, 5000);
    }
  }, []);

  useEffect(() => {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    async function loop() {
      while(true){
        var now = new Date();
        if(now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() < 5){
          refreshPage()
        }
        if(today != null){
          setCurr(Math.round(today[now.getHours()].PriceWithTax * 10000) / 100)
        }
        await timer(3000)
        //console.log(now.getHours() + ":" + now.getMinutes() + "." + now.getSeconds())
      }
    }
    loop()
  }, [today])

  return (
    <div>
      <header>
        {today  ? (
          <div>
          <h1>SPOT Price: {curr} c/kWh</h1>
          {!tomorrow && (<h2>Tomorrows prices are yet to be released</h2>)}
        </div>
        ) : (
          <div>
            <h1>Pricedata Unavailable</h1>
          </div>
        )}
      </header>
      {today  ? (
        <ChartData datatoday={today} datatomorrow={tomorrow} thisHour={getCurr()}/>
      ) : (
        <div>
          <h1>Loading...</h1>
          {err ? (<h2>Error: {err}</h2>) : (<h2>Service running as expected</h2>)}
        </div>
      )}
    </div>
  );
}

export default App;