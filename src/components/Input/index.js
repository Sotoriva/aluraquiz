import React from 'react';
import styled from 'styled-components';

const InputBase = styled.input`
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0.5px solid #666666;
  width: 100%;
  height: 40px;
  padding:15px;
  color: ${({ theme }) => theme.colors.contrastText};
  margin-bottom: 25px;
  outline: 0;

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
export default function Input({ placeholder, onChange }) {
  return (
    <div>
      <InputBase
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
