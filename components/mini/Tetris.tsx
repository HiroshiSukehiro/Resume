'use client';

import { useState } from 'react';

import { createStage, checkCollision } from './Tetris/GameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './Tetris/styles/StyledTetris';
import styles from '../../styles/mini/Tetris.module.css'

// Custom Hooks
import { useInterval } from './Tetris/Hooks/useInterval';
import { usePlayer } from './Tetris/Hooks/usePlayer';
import { useStage } from './Tetris/Hooks/useStage';
import { useGameStatus } from './Tetris/Hooks/useGameStatus';

// Components
import Stage from './Tetris/Stage';
import Display from './Tetris/Display';
import { StartButton, StopButton } from './Tetris/StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage((player as any), (resetPlayer as any));
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared as any
  );

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      //@ts-ignore
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }: any) => {
    if (!gameOver) {
      if (keyCode === 40) {
        //@ts-ignore
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    //@ts-ignore
    setStage(createStage());
    //@ts-ignore
    setDropTime(1000);
    //@ts-ignore
    resetPlayer();
    //@ts-ignore
    setScore(0);
    //@ts-ignore
    setLevel(0);
    //@ts-ignore
    setRows(0);
    setGameOver(false);

    window.addEventListener("keydown", function(e) {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
      }
    }, false);
  };

  const stopGame = () => {
    setGameOver(true);
    setDropTime(null);
  }

  const drop = () => {
    //@ts-ignore
    if (rows > (level + 1) * 10) {
        //@ts-ignore
      setLevel((prev: number) => prev + 1);
      //@ts-ignore
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
        //@ts-ignore
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //@ts-ignore
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      //@ts-ignore
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }: any) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        //@ts-ignore
        playerRotate(stage, 1);
      }
    }
  };
  
  return (
    <div className={styles.main}>
      <StyledTetrisWrapper
        role="button"
        //@ts-ignore
        tabIndex="0"
        onKeyDown={e => move(e)}
        onKeyUp={keyUp}
      >
        <StyledTetris>
          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <Display gameover={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </div>
            )}
            <StartButton callback={startGame} />
            <StopButton callback={stopGame} />
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>
      <div className={styles.title}>Tetris</div>
    </div>
  );
}

export default Tetris;