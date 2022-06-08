import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Layout from '../components/layout';
import styles from "../styles/Market.module.css"
import { useState,useEffect, ReactElement } from "react";
import  dayjs from "dayjs";

export default function Trade_tree():ReactElement{
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
  
  
  const [asks,setAsks] = useState([]);
  const [bids,setBids] = useState([]);

  const [amount,setAmount] = useState("");
  const [value, setValue] = useState("USDT");

  const [orderDetail, setOrederdetail] = useState([]);
  const [orderIndex, setOrederindex] = useState(0);

  const [display,setDisplay] = useState(0);

  let token:number = 0;
  let priceAvg:number = 0;
  let inputUSDT: number = Number(amount);
  let i :number = 0;

  useEffect(() => {
    
  },);
 //setOrederdetail([]);
  const getApi = async (e:React.FormEvent) => { 
    e.preventDefault()
    const newUrl2 =`https://api1.binance.com/api/v3/depth?symbol=${token1}${token2}` 
    const res2 = await  fetch(newUrl2);
    const link1 = await res2.json();
    setAsks(link1.asks) ;
    setBids(link1.bids);
    
    //someAsk()
  }
  //console.log(value,amount);
  const buyValue =() => {
   console.log(value,amount);
   if(value == token2){  //USDT
     for( let item of asks){
      if(inputUSDT > 0){
        buyOutputToken2(item);
      }
      else{          
        break;
      }
   } 
  }
  else{                           //BTC
    for( let item of asks){
      if(inputUSDT > 0){
        buyOutputToken1(item);
      }
      else{
        break;
      }
    }
  }
  let formatdate = dayjs().format("DD/MM/YYYY h:mm");
    const detail ={
        time : formatdate,
        symbol: token1+"_"+token2,
        type :"Buy",
        price : priceAvg/i,
        input : amount,
        output: token
    }
    orderDetail.push(detail);
    
    console.log(orderDetail);
    setDisplay(display+1);
    
  }


  function buyOutputToken2(order : any) {
    
    let a : number = parseFloat(order[0]);
    let b : number = parseFloat(order[1]);
   
    //console.log("price= "+a+"\tAmount= "+b);
    if(inputUSDT >= (a*b)){
        token = b + token;
        priceAvg = a + priceAvg;
        inputUSDT = inputUSDT-(a*b) ;
        i++
        //console.log(token,priceAvg,inputUSDT);
    }
    else if (inputUSDT<(a*b)){  //เงินเหลือ
        let fewToken : number = (inputUSDT*b)/a; //เหรียญที่ซื้อได้ด้วยเงินที่เหลือจริงๆ
                            //เหรียญมีจำนวนเยอะกว่าที่ต้องการ
            token =  fewToken + token ;
            priceAvg = a + priceAvg; 
            inputUSDT = 0; 
            i++
            console.log(token,priceAvg,inputUSDT,i);
            
    }
  }

  function buyOutputToken1(order : any) {
    let a : number = parseFloat(order[0]); //ถ้าเป็นBTC
    let b : number = parseFloat(order[1]);
    if(inputUSDT >= b){
      inputUSDT = inputUSDT - b;
      token = (a*b) + token ; //ได้กี่USDT
      priceAvg = a + priceAvg;
      i++;
    }
    else if ( inputUSDT< b){
      let fewToken :number = inputUSDT*a;
      token = fewToken + token;
      priceAvg = a + priceAvg;  
      inputUSDT = 0;
      i++
    }
           
    
  }


  const sellValue =() => {
    console.log(value,amount);
   if(value == token2){  //USDT
     for( let item of bids){
      if(inputUSDT > 0){
        sellOutputToken2(item);
      }
      else{          
        break;
      }
   } 
  }
  else{                           //BTC
    for( let item of bids){
      if(inputUSDT > 0){
        sellOutputToken1(item);
      }
      else{
        break;
      }
    }
  }
  let formatdate = dayjs().format("DD/MM/YYYY h:mm");
    const detail ={
        time : formatdate,
        symbol: token1+"_"+token2,
        type :"Sell",
        price : priceAvg/i,
        input : amount,
        output: token
    }
    orderDetail.push(detail);
    
    console.log(orderDetail);
    setDisplay(display+1);
    
  }

  function sellOutputToken2(order : any) {
    
    let a : number = parseFloat(order[0]);
    let b : number = parseFloat(order[1]);
   
    //console.log("price= "+a+"\tAmount= "+b);
    if(inputUSDT >= (a*b)){
        token = b + token;
        priceAvg = a + priceAvg;
        inputUSDT = inputUSDT-(a*b) ;
        i++
        //console.log(token,priceAvg,inputUSDT);
    }
    else if (inputUSDT<(a*b)){  //เงินเหลือ
        let fewToken : number = (inputUSDT*b)/a; //เหรียญที่ซื้อได้ด้วยเงินที่เหลือจริงๆ
                            //เหรียญมีจำนวนเยอะกว่าที่ต้องการ
            token =  fewToken + token ;
            priceAvg = a + priceAvg; 
            inputUSDT = 0; 
            i++
            console.log(token,priceAvg,inputUSDT,i);
            
    }
            
    
  }
  

  function sellOutputToken1(order : any){
    let a : number = parseFloat(order[0]); //ถ้าเป็นBTC
    let b : number = parseFloat(order[1]);
    if(inputUSDT >= b){
      inputUSDT = inputUSDT - b;
      token = (a*b) + token ; //ได้กี่USDT
      priceAvg = a + priceAvg;
      i++;
    }
    else if ( inputUSDT< b){
      let fewToken :number = inputUSDT*a;
      token = fewToken + token;
      priceAvg = a + priceAvg;  
      inputUSDT = 0;
      i++
    }
  }
  // const someAsk = () => {
  //   console.log(asks)
  //   const someAsks = asks.filter((item:string,index:number) =>{
  //     if(index<4){
  //       return item;
  //     }
  //   })
  //   setAsks(someAsks)  
  //   console.log(someAsks);
      
    
  // }

  function ShowAsks (){
    return (
    <div>
        
          <h2>Asks</h2>
          <table className={styles.wow} >
            <tr>
              <th>Price({token2})</th>
              <th>Amount({token1})</th>
              <th>Total</th>
            </tr> 
            {asks.map((contest, idx) => (
            <tr key={idx}>
            <td>{Number(contest[0])}</td>
            <td>{Number(contest[1])}</td>
            <td>{(Number(contest[0])*Number(contest[1]))}</td>
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
              <th>Price({token2})</th>
              <th>Amount({token1})</th>
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

  const ShowOrder =() =>{
    return(
      
        <div>
          <h2>Order history</h2>
          <table className={styles.wow} >
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Price</th>
                <th>Input</th>
                <th>Output</th>
              </tr> 
              {orderDetail.map((contest, idx) => (
              <tr key={idx}>
              <td>#{idx+1}</td>
              <td>{contest.time}</td>
              <td>{contest.symbol}</td>
              <td>{contest.type}</td>
              <td>{contest.price}</td>
              <td>{contest.input}</td>
              <td>{contest.output}</td>
             </tr>
              ))}  
            </table>
        </div>
      
    )
  }
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
        {ShowAsks()}
        {ShowBids()}
        <div>
          <h4>Amount</h4>
          <p><input  type="text" id="amount" name="amount" onChange={(e) => setAmount(e.target.value)}></input><br/>
          <select value={value} onChange={(e) => {setValue(e.target.value);}}>
            <option value={token1}>{token1}</option>
            <option value={token2}>{token2}</option>
          </select></p>
          <button onClick={buyValue}>Buy</button>
          <button onClick={sellValue}>Sell</button>
          </div>
          {display > 0 && <ShowOrder/> }
        </Layout>
    </div>
  )
}