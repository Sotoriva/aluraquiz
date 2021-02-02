import React from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Linked = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  text-decoration: none;
  color: white;
  /* padding: 10px 16px; */

  svg {
    margin-right: 10px;
  }

  &:hover {
    text-decoration: none;
    opacity: 80%;
  }
`;

export default function Link({ children, href, ...props }) {
  return (
    <NextLink href={href} passHref>
      <Linked {...props}>
        {children}
      </Linked>
    </NextLink>
  );
}

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  href: PropTypes.string.isRequired,
};
