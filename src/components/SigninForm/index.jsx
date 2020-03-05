import React, { useState } from 'react';
import styled from 'styled-components';
import Inputs from '../Common/Input';
import Buttons from '../Common/Button';
import A11yTitle from '../Common/A11yTitle';
import Feedback from './Feedback';

const FormArea = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 50px 40px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.8);
`;

const Greeting = styled.p`
  font-size: 3rem;
  color: #fff;
`;

const Form = styled.form`
  margin: 40px 0 0;
`;

const InputBox = styled.div`
  & + & {
    margin: 40px 0 0;
  }
`;

const ButtonBox = styled.div`
  margin: 70px 0 0;
  text-align: center;
`;

const SigninForm = ({ signIn, feedVisible }) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const click = async e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signIn({ email, password });
  };

  return (
    <FormArea>
      <Greeting>SignIn</Greeting>
      <Form>
        <fieldset>
          <A11yTitle as="legend">로그인 정보 입력영역</A11yTitle>
          <InputBox>
            <Inputs
              ref={emailRef}
              type="email"
              id="email"
              placeHolder="Enter Your E-mail"
              essential
              defaultValue="test@test.test"
            >
              E-MAIL
            </Inputs>
          </InputBox>
          <InputBox>
            <Inputs
              ref={passwordRef}
              type="password"
              id="password"
              placeHolder="Enter Your Password"
              essential
              defaultValue="test"
            >
              PASSWORD
            </Inputs>
          </InputBox>
        </fieldset>
        <ButtonBox>
          <Buttons size="medium" width={200} onClick={click} color="red">
            Sign In
          </Buttons>
        </ButtonBox>
      </Form>
      <Feedback visible={feedVisible} />
    </FormArea>
  );
};

export default SigninForm;
