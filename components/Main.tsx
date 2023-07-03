'use client'

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Main.module.css';
// import { Type } from './Typed';
// import Header from './Header';
import CoinItem from './CoinItem';

const Main = () => {
    // const title = useRef(null);
    // const desc = useRef(null);

    useEffect(() => {
        // Type(title, "Hi! My name is Luka and I'm fullstack developer");

        // setTimeout(() => {
        //     Type(desc, "You can view my stack and my projects below")
        // }, 2500)
    }, []);

    return (
        <div className={styles.main}>
            {/* <Header /> */}
        <div className={styles.in}>
          <h1 className={styles.title}>Hi! My name is Luka and I'm fullstack developer</h1>
          <div style={{marginTop: 30}}><h2 className={styles.desc}>You can view my stack and my projects below</h2></div>
          <div className={styles.coins}>
            <div className={styles.coin}><CoinItem coinSymbols='BTC' name='BITCOIN' /></div>
            <div className={styles.coin}><CoinItem coinSymbols='ETH' name='ETHEREUM' /></div>
            <div className={styles.coin}><CoinItem coinSymbols='MATIC' name='MATIC' /></div>
            <div className={styles.coin}><CoinItem coinSymbols='BNB' name='BNB' /></div>
          </div>  
        </div>
      </div>
    );
}

export default Main;