import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  border: none;
  color: white;
  width: 100%;
  height: 40px;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 20px;
  font-weight: bold;
  &:hover {
    opacity: 80%;
  }
  &:disabled {
    background: gray;
    opacity: 80%;
    color: white;
  }
`;

// eslint-disable-next-line react/prop-types
export default function PlayButton({ disabled, title, text }) {
  return (
    <Button type="submit" disabled={disabled} title={title}>
      {text}
    </Button>
  );
}
