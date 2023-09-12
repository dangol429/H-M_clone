import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import Login from "./Login";
import Signup from "./Signup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  overflow: hidden;
`;

const slideOutAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const slideInAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
  justify-content: center;

  padding: 20px;
  border-radius: 5px;
  width: 100vw;
  height: 100vh;
  /* CSS transition for sliding animation */
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;

  &.slideOut {
    animation-name: ${slideOutAnimation};
  }

  &.slideIn {
    animation-name: ${slideInAnimation};
  }
`;

const AuthPage = () => {
  const [slideOut, setSlideOut] = useState(false);
  const [activeComponent, setActiveComponent] = useState("login");

  const handleToggle = () => {
    setSlideOut(!slideOut);
    setActiveComponent(activeComponent === "login" ? "signup" : "login");
  };

  return (
    <Container>
      <Wrapper
        className={slideOut ? "slideOut" : "slideIn"}
        onAnimationEnd={() => setSlideOut(false)}
      >
        {activeComponent === "login" ? (
          <Login handleToggle={handleToggle} />
        ) : (
          <Signup handleToggle={handleToggle} />
        )}
        <hr />
      </Wrapper>
    </Container>
  );
};

export default AuthPage;
