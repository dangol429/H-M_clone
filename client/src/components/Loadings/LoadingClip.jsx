import React from "react";
import { ScaleLoader } from "react-spinners";
import { styled } from "styled-components";

const Container = styled.div`
  overflow: hidden;
`;

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const LoadingClip = ({ size }) => {
  return (
    <Container>
      <ScaleLoader
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

export default LoadingClip;
