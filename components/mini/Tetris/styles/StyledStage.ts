import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => (props as any).height},
    calc(25vw / ${props => (props as any).width})
  );
  grid-template-columns: repeat(${props => (props as any).width}, 1fr);
  grid-gap: 1px;
  border: 1px solid #fff;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;