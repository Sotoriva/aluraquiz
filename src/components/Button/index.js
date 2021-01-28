import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.contrastText};
  width: 100%;
  padding: 10px 16px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  outline: 0;
  transition: 0.3s;

  &:hover {
    opacity: 80%;
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
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

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};
