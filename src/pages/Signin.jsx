import React from 'react';
import styled from 'styled-components';
import media from '../libs/MediaQuery';
import SigninFormContainer from '../containers/SigninFormContainer';
import A11yTitle from '../components/Common/A11yTitle';

const SignInWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  padding: 20px;
  background: url('/images/login_bg.jpg') center center no-repeat;
  background-size: cover;
  font-size: 20px;

  &:after {
    content: '';
    position: absolute;
    top: -9999em;
    right: -9999em;
    left: -9999em;
    bottom: -9999em;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const Logo = styled.h1`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1;
  width: 155px;

  img {
    width: 100%;
  }

  ${media.tablet`
    width: 140px;
  `}

  ${media.mobile`
    width: 120px;
  `}
`;

const SigninArea = styled.div`
  width: 100%;

  ${media.tablet`
    width: 60%;
  `}

  ${media.desktop`
    width: 460px;
  `}
`;

const Signin = () => {
  return (
    <SignInWrapper>
      <Logo>
        <img src="/images/logo.png" alt="Comflix" />
      </Logo>
      <A11yTitle>로그인 영역</A11yTitle>
      <SigninArea>
        <SigninFormContainer />
      </SigninArea>
    </SignInWrapper>
  );
};

export default Signin;
