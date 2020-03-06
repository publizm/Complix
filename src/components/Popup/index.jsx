import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ModalPortal from './ModalPotal';

const fadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  } to {
    opacity: 0;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(200px);
  }
`;

export const PopupLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  z-index: 10;
`;

export const Dim = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${props =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

export const PopupInner = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  z-index: 11;
  max-width: 800px;
  width: 100%;
  max-height: calc(100vh - 144px);
  min-height: 300px;
  padding: 10px;
  border-radius: 5px;
  background: #000;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${props =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: #e50914;
  background: transparent;
  color: transparent;
  transition: all 0.3s;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    margin: -1px 0 0 -10px;
    background: #e50914;
    transform: rotate(-45deg);
    transition: all 0.3s;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    margin: -1px 0 0 -10px;
    background: #e50914;
    transform: rotate(45deg);
    transition: all 0.3s;
  }
`;

const Popup = ({ visible, children, hide }) => {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!localVisible && !animate) return null;

  return (
    <ModalPortal>
      <PopupLayout>
        <Dim disappear={!visible} onClick={hide} />
        <PopupInner disappear={!visible}>
          <CloseButton onClick={hide}>닫기</CloseButton>
          {children}
        </PopupInner>
      </PopupLayout>
    </ModalPortal>
  );
};

export default Popup;
