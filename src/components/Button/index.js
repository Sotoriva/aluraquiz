import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  padding: 10px 16px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  outline: 0;
  transition: 0.3s;
  

  p {
    color: white
  }

  &:hover {
    opacity: 80%;
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

export default Button;

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
