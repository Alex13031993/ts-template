import { styled } from '@linaria/react';
const PRIMARY_COLOR = '#14aa53';

interface IButton {
  color?: string;
  background?: string;
}

export const Button = styled.button<IButton>`
  background: ${(props) =>
    props.background ? props.background : PRIMARY_COLOR};
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${PRIMARY_COLOR};
  color: ${(props) => (props.color ? props.color : 'white')};
  padding: 12px 30px;
  border: none;
  text-transform: uppercase;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Optima';

  &:hover {
    background: white;
    color: #888888;
  }

  &:disabled {
    background: #cccccc;
  }
`;
