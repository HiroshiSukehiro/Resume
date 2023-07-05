import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetriminos';
import { STAGE_WIDTH, checkCollision } from '../GameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  function rotate(matrix: Array<Array<any>>, dir: number) {
    const mtrx = matrix.map((_: Array<any>, index: number) => matrix.map((column: { [x: string]: any; }) => column[index]));
    if (dir > 0) return mtrx.map((row: Array<any>) => row.reverse());
    return mtrx.reverse();
  }

  function playerRotate(stage: Array<Array<Array<any>>>, dir: number) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPos = (obj: { x: number, y: number, collided: boolean }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += obj.x), y: (prev.pos.y += obj.y) },
      collided: obj.collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};