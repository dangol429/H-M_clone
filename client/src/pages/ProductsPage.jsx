import React, { useState } from "react";
import CategorySection from "../components/CategorySection";
import { Container } from "react-bootstrap";
import AllProductSection from "../components/AllProductSection";
import { styled } from "styled-components";
import Navbar from "../components/navbar";

const Wrapper = styled.div`
  display: flex;
  width: 1300px;
`;
const MineContainer = styled.div`
  margin-top: 5rem;
`;

const ProductsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <>
      <Navbar />
      <MineContainer>
        <Container>
          <Wrapper>
            <CategorySection
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <AllProductSection
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </Wrapper>
        </Container>
      </MineContainer>
    </>
  );
};

export default ProductsPage;
