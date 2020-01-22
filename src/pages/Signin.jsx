import React from 'react';
import styled from 'styled-components';
import media from '../libs/MediaQuery';
import SigninForm from '../components/SigninForm';
import A11yTitle from '../components/A11yTitle';

const SignInWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  background: url('/login_bg.jpg') center center no-repeat;
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
  left: 50px;
  z-index: 1;
  width: 180px;

  img {
    width: 100%;
  }

  ${media.mobile`
    left: 40px;
    width: 130px;
  `}
`;

const SigninArea = styled.div`
  width: 65%;
  min-width: 285px;

  ${media.tablet`
    width: 45%;
  `}

  ${media.desktop`
    width: 460px;
  `}
`;

const Signin = () => {
  return (
    <SignInWrapper>
      <Logo>
        <img src="/logo.png" alt="Comflix" />
      </Logo>
      <A11yTitle>로그인 영역</A11yTitle>
      <SigninArea>
        <SigninForm />
      </SigninArea>
    </SignInWrapper>
  );
};

export default Signin;
