import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  text-align: center;
  margin-bottom: 8px;
`;

const CheckBox = styled.input`
  margin-right: 16px;
  padding: 10px;
  height: 16px;
  width: 16px;
`;

const Labels = styled.span`
  font-size: 14px;
  display: inline-block;
  color: #333;
`;

const Checkboxes = ({
  selectedCategories,
  setSelectedCategories,
  Label,
  parentLabel,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriesFromUrl = urlParams.get("Categories");

    if (categoriesFromUrl) {
      const filtersArray = categoriesFromUrl.split(",");
      setSelectedCategories(filtersArray);
    } else {
      setSelectedCategories([]);
    }
  }, [isChecked, setSelectedCategories]);

  useEffect(() => {
    if (parentLabel === "Categories") {
      setIsChecked(selectedCategories.includes(Label));
    }
  }, [selectedCategories, Label, parentLabel]);

  const applyFilter = (event) => {
    const currentURL = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentURL.search);
    setIsChecked(event.target.checked);
    const filterValue = Label;
    const existingFilters = searchParams.get(parentLabel) || "";
    const filtersArray = existingFilters.split(",").filter(Boolean);

    if (event.target.checked) {
      filtersArray.push(filterValue);
    } else {
      const index = filtersArray.indexOf(filterValue);
      if (index !== -1) {
        filtersArray.splice(index, 1);
      }
    }

    searchParams.set(parentLabel, filtersArray.join(","));
    // Remove the parent label if all filters for that label are deselected
    if (filtersArray.length === 0) {
      searchParams.delete(parentLabel);
    }

    currentURL.search = searchParams.toString();
    window.history.pushState({ path: currentURL.href }, "", currentURL.href);
  };

  return (
    <Container>
      <CheckBox type="checkbox" checked={isChecked} onChange={applyFilter} />
      <Labels>{Label}</Labels>
    </Container>
  );
};

export default Checkboxes;
