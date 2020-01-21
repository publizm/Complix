import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const sizes = {
  small: {
    height: '30px',
    fontSize: '1.2rem',
    lineHeight: '28px',
    borderRadius: '3px',
  },
  medium: {
    height: '45px',
    fontSize: '1.6rem',
    lineHeight: '43px',
    borderRadius: '7px',
  },
  large: {
    height: '50px',
    fontSize: '2rem',
    lineHeight: '48px',
    borderRadius: '10px',
  },
};

const sizeStyles = css`
  ${({ size, width }) => css`
    width: ${width}px;
    height: ${sizes[size].height};
    border-radius: ${sizes[size].borderRadius};
    font-size: ${sizes[size].fontSize};
    line-height: ${sizes[size].lineHeight};
  `}
`;

const colors = {
  black: '#000',
  gray: '#a6a6a6',
  green: '#04d9b2',
  blue: '#0388a6',
  red: '#f20f4b',
  pink: '#f24162',
};

const colorStyles = css`
  ${({ color }) => css`
    background: ${colors[color]};
    color: #fff;
    &:hover {
      background: ${lighten(0.1, colors[color])};
    }
    &:active {
      background: ${darken(0.1, colors[color])};
    }
    ${({ outline }) =>
      outline &&
      css`
        background: none;
        border: 1px solid ${colors[color]};
        color: ${colors[color]};

        &:hover {
          background: ${colors[color]};
          color: #fff;
        }
      `}
  `}
`;

const Button = styled.button`
  display: inline-block;
  width: 100%;
  padding: 0 10px;
  border: none;
  font-weight: 400;
  transition: all 0.3s;

  & + & {
    margin: 0 0 0 20px;
  }

  ${sizeStyles}
  ${colorStyles}
`;

const Buttons = ({ size, width, color, children, ...rest }) => {
  return (
    <Button size={size} width={width} color={color} {...rest}>
      {children}
    </Button>
  );
};

Buttons.defaultProps = {
  color: 'black',
  size: 'small',
};

export default Buttons;
