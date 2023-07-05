import { useState, useEffect } from 'react';
import { createStage } from '../GameHelpers';

export const useStage = (player: { tetromino: Array<any>; pos: { y: number; x: number; }; collided: boolean; }, resetPlayer: () => {}) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newStage: any[]) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell: number[]) => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage: any[]) => {
      const newStage = prevStage.map(row =>
        row.map((cell: string[]) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value: number, x: string | number) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + (player.pos.x as any)] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      if (player.collided) {

        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ]);

  return [stage, setStage, rowsCleared];
};