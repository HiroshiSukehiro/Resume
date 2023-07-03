'use client'

import { useEffect, useState } from 'react';
import styles from '../styles/ToMini.module.css';
import A from './A';

const ToMini = () => {
    const [isMounted, setIsMounted] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 5000)
    }, [])
    return (
        <div className={styles.main}>
            <div className={styles.title}>Here you can see my mini projects</div>
            {isMounted ?
                <div className={styles.button}><A text='Click to view' href='/mini'></A></div>
                :
                <div className={styles.button}><div className={styles.disabled}>Click to view</div></div>
            }
        </div>
    );
}

export default ToMini;