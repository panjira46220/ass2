import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Layout from '../components/layout';
import styles from "../styles/Market.module.css"
import { useState,useEffect, ReactElement } from "react";
import { Console } from 'console';

export default function Marker():ReactElement{
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
  
  const [allData,setAllData] =useState([{token1:"BTC",token2:"USDT",priceFTX:0,priceBinance:0,diff:0}])
  const [display,setDisplay] = useState(0);
  const [asks,setAsks] = useState([]);
  const [bids,setBids] = useState([]);


  useEffect(() => {
    
  },);
 
  const getApi = async (e:React.FormEvent) => { 
    e.preventDefault()
    const newUrl2 =`https://api1.binance.com/api/v3/depth?symbol=${token1}${token2}` 
    const res2 = await  fetch(newUrl2);
    const link1 = await res2.json();
    setAsks(link1.asks) ;
    setBids(link1.bids);
    someAsk()
  }

  const someAsk = () => {
    console.log(asks)
    const someAsks = asks.filter((item:string,index:number) =>{
      if(index<4){
        return item;
      }
    })
    setAsks(someAsks)  
    console.log(someAsks);
      
    
  }

  function ShowAsks (){
    return (
    <div>
          <h2>Asks</h2>
          <table className={styles.wow} >
            <tr>
              <th>Price({token1})</th>
              <th>Amount({token2})</th>
              <th>Total</th>
            </tr> 
            {asks.map((contest, idx) => (
            <tr key={idx}>
            <td>{Number(contest[0]).toFixed(2)}</td>
            <td>{Number(contest[1]).toFixed(2)}</td>
            <td>{((contest[0]*contest[1])/1000).toFixed(2)}</td>
           </tr>
            ))}  
          </table>
    </div>
  )}

  function ShowBids (){
    return (
    <div>
          <h2>Bids</h2>
          <table className={styles.wow} >
            <tr>
              <th>Price(${token1})</th>
              <th>Amount(${token2})</th>
              <th>Total</th>
            </tr> 
            {bids.map((contest, idx) => (
            <tr key={idx}>
            <td>{Number(contest[0]).toFixed(2)}</td>
            <td>{Number(contest[1]).toFixed(2)}</td>
            <td>{((contest[0]*contest[1])/1000).toFixed(2)}</td>
           
          </tr>
            ))}  
          </table>
    </div>
  )}
  //console.log(data);
  //console.log(token1,token2);

  
  return(
    <div className={styles.div}>
      <Layout>
        <h1>Trade</h1>
        <form >
          <label>Token 1 </label><br/>
          <input  type="text" id="token1" name="token1" onChange={e => setToken1(e.target.value)}></input><br/>
          <label>Token 2 </label><br/>
          <input  type="text" id="token2" name="token2" onChange={e => setToken2(e.target.value)}></input><br/>
          <input type="submit" value="Fetch" onClick={getApi}></input>
        </form>
        <div>
          {ShowAsks()}
          {ShowBids()}
          </div>

        </Layout>
    </div>
  )
}