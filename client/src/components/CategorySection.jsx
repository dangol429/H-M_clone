import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Checkboxes from "./Checkboxes";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  width: 100%;
  flex: 1;
`;

const HeaderContainer = styled.div`
  position: relative;
  border-right: none !important;
  padding-top: 0;
  padding-bottom: 15px;
  padding-left: 25px;
  border-bottom: 1px solid #e9e9ed;
  background-color: #f8f8f8;
`;

const HeaderTitle = styled.span`
  line-height: normal;
  font-weight: 700;
  font-size: 16px;
  color: #333;
`;

const CategoryContainer = styled.div`
  position: relative;
  padding-top: 20px;
  padding-bottom: 15px;
  padding-left: 25px;
  border-bottom: 1px solid #e9e9ed;
  border-right: 1px solid #edebef;
`;

const FilterHeader = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
`;

const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategorySection = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await publicRequest("/categories/");
        setCategories(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(`All Categories ${err}`);
      }
    };

    getCategories();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>FILTERS</HeaderTitle>
      </HeaderContainer>
      <CategoryContainer>
        <FilterHeader>CATEGORIES</FilterHeader>
        <CategoriesList>
          {
            Array.isArray(categories)
              ? categories.map((item, idx) => (
                  <Checkboxes
                    key={idx}
                    Label={item}
                    parentLabel={"Categories"}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                ))
              : null // Handle the case when categories is not an array (e.g., it's null or not yet loaded)
          }
        </CategoriesList>
      </CategoryContainer>
    </Container>
  );
};

export default CategorySection;
