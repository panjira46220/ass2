
import axios from "axios";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { ReactElement } from 'react';
import { useState,useEffect } from "react";
import Layout from '../components/layout';
import styles from "../styles/Market.module.css";
interface DataProps {
  data1 :  {
    name: string,
    price: number
  } ,
  data2: {
    price: number
  },
}

interface Keep{
  coinname1: string
  coinname2: string
  binance : number
}
export default function Marker():ReactElement{
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
  //const url2 =`https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT`;
  //const [allData,setAllData] = useState<Keep[]>([{coinname1: '',coinname2:'',binance: {mins:0,price: ''}}]);
  const [allData,setAllData] =useState([{token1:"BTC",token2:"USDT",priceFTX:0,priceBinance:0,diff:0}])
  const [display,setDisplay] = useState(0);
  
  useEffect(() => {
    
  },);
  // const loadAPI = async () => {
  //   const newUrl1 =`https://ftx.com/api/markets/BTC/USDT`;
  //   return await axios
  //     .get(newUrl1)
  //     .then((response) => setData(response.data))
  //     .catch((err) => console.log(err));
  // };
  const getApi = async (e:React.FormEvent) => { 
    e.preventDefault()
    const newUrl2 =`https://api1.binance.com/api/v3/avgPrice?symbol=${token1}${token2}` 
    const res2 = await  fetch(newUrl2);
    const link1 = await res2.json();
    const priceBinance: number = link1.price;

    const link2 = await axios.get('/api/ftx',{
      params: {token1,token2}
    })
    const priceFTX: number = link2.data.result.price;
    const diff = ((Math.abs(priceFTX-priceBinance)/priceFTX)*100);
    const sumData =  {token1,token2,priceFTX,priceBinance,diff}
    //setAllData([{coinname1:token1,coinname2:token2,binance:data}]);
    let i: number = 0;
    allData.forEach((item :any,id:number) => {
      if(item.token1 == token1){
        allData.splice(id,1,sumData)
        i++
      }
      
    })
    if(i==0){
      allData.push(sumData);
    }
    
     // console.log(allData);



      //allData.splice(id,1,sumData)
     // allData.push(sumData)
    //await allData.push(sumData);
    allData.sort((a,b) => (a.token1 > b.token1)? 1:-1 ) 
    setDisplay(display+1);
    //console.log(allData)


     
    
  }
  

  const delData = (id:number) => {
      allData.splice(id,1);
      allData.sort((a,b) => (a.token1 > b.token1)? 1:-1 ) 
      setDisplay(display+1);
      
  }

  function Show (){
    return (
    <div>
          <h2>List</h2>
          <table className={styles.wow} >
            <tr>
              <th>Token1</th>
              <th>Token</th>
              <th>FTX</th>
              <th>Binance</th>
              <th>Diff</th>
              <th>Action</th>
            </tr> 
            {allData.map((contest, idx) => (
            <tr key={idx}>
            <td>{contest.token1}</td>
            <td>{contest.token2}</td>
            <td>{contest.priceFTX}</td>
            <td>{contest.priceBinance}</td>
            <td>{contest.diff}%</td>
            <td><input type="submit" value="Del" onClick={e =>delData(idx)}></input></td>
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
        <h1>Market Diff</h1>
        <form >
          <label>Token 1 </label><br/>
          <input  type="text" id="token1" name="token1" onChange={e => setToken1(e.target.value)}></input><br/>
          <label>Token 2 </label><br/>
          <input  type="text" id="token2" name="token2" onChange={e => setToken2(e.target.value)}></input><br/>
          <input type="submit" value="Fetch" onClick={getApi}></input>
        </form>
        <div>
          {display > 0 && <Show/> }
            
          </div>

        </Layout>
    </div>
  )
}
  
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const url1 =`https://ftx.com/api/markets/BTC/USDT`;
//     const res1 = await fetch(url1);
//     const result1= await res1.json();
//     // const url2 ='https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT';
//     // const res2 = await fetch(url2);
//     // const result2 = await res2.json();
    
//     console.log(result1);
//     return {
//       props:{
//         result1,
//         // result2
//     }}
//   }