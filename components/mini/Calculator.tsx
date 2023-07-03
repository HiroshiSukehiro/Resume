'use client'

import { useState } from 'react';
import styles from '../../styles/mini/Calculator.module.css';

enum Operations {
    PLUS,
    MINUS,
    MULT,
    DIV,
    NONE
}

const Calculator = () => {
    const [currentNum, setCurrentNum] = useState('0');
    const [secondNum, setSecondNum] = useState('0');
    const [operation, setOperation] = useState(Operations.NONE);
    const [display, setDisplay] = useState(false);
    const [size, setSize] = useState(90);

    const numbers = (num: string) => {
        if (display === false) {
            if (currentNum.length < 9) {
                if (currentNum === '0' || currentNum === 'Error') {
                    setCurrentNum(num);
                } else {
                    setCurrentNum(currentNum + num);
                }
                if (currentNum.length >= 5) {
                    setSize(70)
                } else {
                    setSize(90)
                }
            }
        } else {
            if (secondNum.length < 9) {
                if (secondNum === '0') {
                    setSecondNum(num);
                } else {
                    setSecondNum(secondNum + num);
                }
                if (secondNum.length >= 5) {
                    setSize(70)
                } else {
                    setSize(90)
                }
            }
        }
    }

    const plus = () => {
        if (display === true) {
            equal();
        }
        setDisplay(true)
        setSize(90);
        setOperation(Operations.PLUS)
    }

    const minus = () => {
        if (display === true) {
            equal();
        }
        setDisplay(true)
        setSize(90);
        setOperation(Operations.MINUS)
    }

    const mult = () => {
        if (display === true) {
            equal();
        }
        setDisplay(true)
        setSize(90);
        setOperation(Operations.MULT)
    }

    const div = () => {
        if (display === true) {
            equal();
        }
        setDisplay(true)
        setSize(90);
        setOperation(Operations.DIV)
    }

    const percent = () => {
        if (display === false) {
            setCurrentNum((+currentNum / 100).toString())
        } else {
            setSecondNum((+secondNum / 100).toString())
        }
    }

    const comma = () => {
        if (display === false) {
            setCurrentNum(currentNum + '.');
        } else {
            setSecondNum(secondNum + '.')
        }
    }
    
    const equal = () => {
        setDisplay(false);
        let res: any = 0;

        if (operation === Operations.PLUS) {
            res = +currentNum + +secondNum;
        } else if (operation === Operations.MINUS) {
            res = +currentNum - +secondNum;
        } else if (operation === Operations.MULT) {
            res = +currentNum * +secondNum;
        } else if (operation === Operations.DIV) {
            res = +currentNum / +secondNum;
        } else {
            res = +currentNum;
        }

        if (res == Infinity) {
            setCurrentNum('Error')
        } else {
            setCurrentNum((res.toFixed(9) * 1).toString())
        }

        setSecondNum('0');
    }

    const clear = () => {
        setDisplay(false);
        setSize(90);
        setCurrentNum('0');
        setSecondNum('0');
    }

    const reverse = () => {
        if (display === false) {
            if (currentNum[0] === '-') {
                setCurrentNum(currentNum.slice(1))
            } else {
                setCurrentNum('-' + currentNum);
            }
        } else {
            if (secondNum[0] === '-') {
                setSecondNum(secondNum.slice(1))
            } else {
                setSecondNum('-' + secondNum);
            }
            
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.calculator}>
                <div className={styles.board} style={{fontSize: size}}>{display ? secondNum : currentNum}</div>
                <div className={styles.buttons}>
                    <div className={styles.gray} onClick={clear}>{currentNum == '0' ? 'AC' : 'C'}</div>
                    <div className={styles.gray} onClick={reverse}>+/-</div>
                    <div className={styles.gray} onClick={percent}>%</div>
                    <div className={styles.orange} onClick={div}>÷</div>
                    <div className={styles.dark} onClick={() => numbers('7')}>7</div>
                    <div className={styles.dark} onClick={() => numbers('8')}>8</div>
                    <div className={styles.dark} onClick={() => numbers('9')}>9</div>
                    <div className={styles.orange} onClick={mult}>×</div>
                    <div className={styles.dark} onClick={() => numbers('4')}>4</div>
                    <div className={styles.dark} onClick={() => numbers('5')}>5</div>
                    <div className={styles.dark} onClick={() => numbers('6')}>6</div>
                    <div className={styles.orange} onClick={minus}>-</div>
                    <div className={styles.dark} onClick={() => numbers('1')}>1</div>
                    <div className={styles.dark} onClick={() => numbers('2')}>2</div>
                    <div className={styles.dark} onClick={() => numbers('3')}>3</div>
                    <div className={styles.orange} onClick={plus}>+</div>
                    <div className={styles.zero} onClick={() => numbers('0')}>0</div>
                    <div className={styles.dark} onClick={comma}>.</div>
                    <div className={styles.orange} onClick={equal}>=</div>
                </div>
            </div>
            <div className={styles.title}>Calculator IOS</div>
        </div>
    )
}

export default Calculator;