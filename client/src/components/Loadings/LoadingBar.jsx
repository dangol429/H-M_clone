import React from "react";
import { BarLoader } from "react-spinners";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",

};
const LoadingBar = ({ size }) => {
  return (
    <Container>
      <BarLoader
        color={"rgb(29,161,242)"}
        loading={true}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
        
      />
    </Container>
  );
};

export default LoadingBar;
