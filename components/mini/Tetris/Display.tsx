import React from 'react';
import { StyledDisplay } from './styles/StyledDisplay';

const Display = ({ gameOver, text }: any) => (
  //@ts-ignore
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;