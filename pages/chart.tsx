import type { NextPage } from 'next'
import Layout from '../components/layout';
import { useState,useEffect, ReactElement } from "react";
import React from 'react'
import styles from "../styles/Market.module.css";
import { createChart } from 'lightweight-charts';
import  dayjs from 'dayjs';
// ...

// somewhere in your code
export default function ChartMedium():ReactElement {
  const [display,setDisplay] = useState(0); 
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState(''); 
  let dataGraph:any =[];


  const getApi = async (e:React.FormEvent) => { 
    e.preventDefault()
    const newUrl2 =`https://api1.binance.com/api/v3/klines?interval=1h&symbol=${token1}${token2}` 
    const res2 = await  fetch(newUrl2);
    const link1 = await res2.json();
    console.log(link1);
    

    
    
    link1.map((item : any)=>{
      
      //const formatdate = dayjs(item[0]).format("YYYY-MM-DD");
      // let d = '0' + openTime.getDate().toString().slice(-2) ;
      // let m ='0' + (openTime.getMonth() + 1).toString().slice(-2);
      // let y = openTime.getFullYear();
      //console.log(formatdate);

      const newobject ={
         
        time : item[0],
        open : Number(item[1]),
        hight : Number(item[2]),
        low : Number(item[3]),
        close : Number(item[4])
      };
      
      dataGraph.push(newobject);
    });
    
    
    console.log(dataGraph);
     const chart = createChart(document.body, { width: 800, height: 700 });
    // const candlestickSeries = chart.addCandlestickSeries();
    // console.log(dataGraph);
    // candlestickSeries.setData(dataGraph);
    // chart.timeScale().fitContent();
    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.setData(
      dataGraph 
    );
    
    chart.timeScale().fitContent();

    
  
    }
    
    const callChart = () => {
    //  const chart = createChart(document.body, { width: 800, height: 700 });
    //  const candlestickSeries = chart.addCandlestickSeries();
    //  candlestickSeries.setData(object);
    //  chart.timeScale().fitContent();
     
   
    // const chart = createChart(document.body, { width: 800, height: 700 });
    // const candlestickSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });
    // candlestickSeries.setData(dataGraph);
    // chart.timeScale().fitContent();
    }  

    return (
      <div className={styles.div}>
          <Layout>
          <h1>Chart</h1>
        <form >
          <label>Token 1 </label><br/>
          <input  type="text" id="token1" name="token1" onChange={e => setToken1(e.target.value)}></input><br/>
          <label>Token 2 </label><br/>
          <input  type="text" id="token2" name="token2" onChange={e => setToken2(e.target.value)}></input><br/>
          <input type="submit" value="Fetch" onClick={getApi}></input>
        </form>
        <div>
          
        </div>
      </Layout>
      </div>
    );
  };
