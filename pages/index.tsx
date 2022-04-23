import type { NextPage } from "next";
import Head from "next/head";

import Search from "@/components/Search/Search";

import styles from "styles/pages/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div id={styles.homeContainer} className="page">
      <Head>
        <title>Coin Tracker</title>
        <meta name="description" content="Check out Crypto prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Search />
      </div>
    </div>
  );
};

export default Home;
