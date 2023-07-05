'use client'

import { useState, useRef, useEffect } from "react";
import styles from '../../styles/mini/Snake.module.css'
import { useInterval } from "./Snake/useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from "./Snake/constants";

const Snake = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isFirstGame, setFirstGame] = useState(true);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = ({ keyCode }: any) => {
    if (
      (keyCode < 37 && keyCode > 40) ||    
      dir[1] === (DIRECTIONS as any)[keyCode][1] + 2 ||
      dir[1] === (DIRECTIONS as any)[keyCode][1] - 2 ||
      dir[0] === (DIRECTIONS as any)[keyCode][0] + 2 ||
      dir[0] === (DIRECTIONS as any)[keyCode][0] - 2
    )
      return false;
    else {
      setDir((DIRECTIONS as any)[keyCode]);
      return true;
    }
  }

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece: any, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = (newSnake: Array<Array<any>>) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    if (gameOver || isFirstGame) {
      setFirstGame(false);
      setSnake(SNAKE_START);
      setApple(APPLE_START);
      setDir([0, -1]);
      setSpeed(SPEED as any);
      setGameOver(false);
      window.addEventListener("keydown", function(e) {
          if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
          }
      }, false);
    }
  };

  useEffect(() => {
    //@ts-ignore
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "white";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "blue";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <div className={styles.main}>
      <div className={styles.title}>Snake</div>
      {/*@ts-ignore*/}
      <div role="button" className={styles.table} tabIndex="0" onKeyDown={e => moveSnake(e)}>
        {gameOver && <div className={styles.gameOver}>GAME OVER!</div>}
        <canvas className={styles.canvas}
          //@ts-ignore
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        <div className={styles.button} onClick={startGame}>Start Game</div>
      </div>
    </div>
  );
};

export default Snake;