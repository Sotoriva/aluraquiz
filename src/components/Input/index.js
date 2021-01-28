import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
export default function Input({ placeholder, onChange, ...props }) {
  return (
    <div>
      <InputBase
        placeholder={placeholder}
        onChange={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
