import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  display: flex;
  background: ${({ theme }) => theme.colors.mainBg};
  border-radius: 3.5px;
  border: 0.5px;
  border-color: #666666;
  border-style: solid;
  width: 100%;
  height: 40px;
  padding-left:15px;
  color: white;

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
  }

  &:focus {
    border: 0.5px solid ${({ theme }) => theme.colors.secondary};
    outline-style: none;
    border-radius: 3.5px;
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

// eslint-disable-next-line react/prop-types
export default function FormField({ placeholder, onChange }) {
  return (
    <Input
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
