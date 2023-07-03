import { useState } from 'react';
import styles from '../styles/CoinItem.module.css';

type Props = {
    name: string,
    coinSymbols: string,
};

const CoinItem: React.FC<Props> = ({name, coinSymbols}) => {
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    fetch(`https://min-api.cryptocompare.com/data/price?fsym=${coinSymbols}&tsyms=USD`)
        .then((res) => res.json())
        .then((data) => {        
            setPrice(data.USD); 
            setLoading(false);       
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <div className={styles.block}>
            <h3>{name}</h3>
            <span>
                {loading ? "LOADING" : "$" + price}
            </span>   
        </div>
    );
}

export default CoinItem;