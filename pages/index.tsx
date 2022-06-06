import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Marker from "../pages/market-diff"; 
import Chart from "../pages/chart";
import Trade from "../pages/trade";
import Layout from "../components/layout";
import { useState } from "react";
const Home: NextPage = () => {
  const [display,setDisplay] = useState<string>("");

  return (
    <Layout>
      


    </Layout>
    // <div>
    //   <nav>
    //   <ul>
    //   <li>
    //     <Link href="/market-diff">
    //       <a>Home</a>
    //     </Link>
    //   </li>
    //   <li>
    //     <Link href="/chart">
    //       <a>About Us</a>
    //     </Link>
    //   </li>
    //   <li>
    //     <Link href="/trade">
    //       <a>Blog Post</a>
    //     </Link>
    //   </li>
    // </ul>
    //   </nav>

    //   <div onClick={() => setDisplay("market")}>Market Diff</div>
    //   <div onClick={() => setDisplay("chart")}>Chart</div>
    //   <div onClick={() => setDisplay("Trade")}>Trade</div>
    //   {display === "market" && <Marker/> }
    //   {display === "chart" && <Chart/> }
    //   {display === "Trade" && <Trade/> }
    // </div>
  );
};

export default Home;
