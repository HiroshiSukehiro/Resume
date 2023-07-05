import styled from 'styled-components';

export const StyledCell = styled.div`
  width: auto;
  /* border-radius: 5px; */
  background: rgba(${props => props.color}, 0.8);
  border: ${props => ((props as any).type === 0 ? '0px solid' : '4px solid')};
  border-bottom-color: #fff;
  border-right-color: #fff;
  border-top-color: #fff;
  border-left-color: #fff;
`;