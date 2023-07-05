'use client'

import { useState } from 'react';
import styles from '../../styles/mini/Decoder.module.css';
import { caesarCipher } from './Decoder/caesarCipher';

const Decoder = () => {
    const [decode, setDecode] = useState(false);
    const [result, setResult] = useState('');

    const encode = () => {
        const text = (document.getElementById('text') as HTMLInputElement).value;
        const shift = +((document.getElementById('shift') as HTMLInputElement).value);

        const res = caesarCipher(text, shift, decode);
        setResult(res);
    }

    const clear = () => {
        (document.getElementById('text') as HTMLInputElement).value = '';
        ((document.getElementById('shift') as HTMLInputElement).value) = '';
        setResult('');
        setDecode(false);
    }

    return (
        <div className={styles.main}>
            <div className={styles.description}>
                <div className={styles.title}>Caesar Cipher</div>
                <div className={styles.desc}>This is the encoder/decoder for the Caesar cipher. Enter the text in the first field, put shift (the key for encoding), select the desired item via switch and use</div>
            </div>
            <div className={styles.decoder}>
                <div className={styles.text}><textarea id='text' /></div>
                <div className={styles.panel}>
                    <div className={styles.button} onClick={encode}>{decode ? 'Decode' : 'Encode'}</div>
                    <div className={styles.shift}>shift <input onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} maxLength={2} id='shift' /></div>
                    <div className={styles.btn} onClick={() => setDecode(!decode)}>Switch</div>
                    <div className={styles.btn2} onClick={clear} >Clear</div>
                </div>
                <div className={styles.text}><textarea defaultValue={result} readOnly /></div>
            </div>
        </div>
    )
}

export default Decoder;