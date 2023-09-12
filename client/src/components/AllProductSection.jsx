import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { styled } from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  flex: 4;
`;

const ProductsContainer = styled.div`
  padding: 20px;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const PaginationButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.isActive ? "#ff3e6c" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#333")};
  cursor: pointer;
`;

const PageNumber = styled.span`
  color: #666;
`;

const AllProductSection = ({ selectedCategories, setSelectedCategories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const getProducts = async () => {
      try {
        setLoading(true);
        const categories = selectedCategories.join(",");
        const searchQuery = urlParams.get("search");

        if (categories) {
          const response = await axios.get(
            `http://localhost:5000/api/products?Categories=${categories}`
          );
          setProducts(response.data);
        } else if (searchQuery) {
          const response = await axios.get(
            `http://localhost:5000/api/products?search=${searchQuery}`
          );
          setProducts(response.data);
        } else {
          const response = await axios.get(
            `http://localhost:5000/api/products/`
          );
          setProducts(response.data);
        }
        setLoading(false);
        setCurrentPage(1);
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };
    getProducts();
  }, [selectedCategories]);

  return (
    <Container>
      <ProductsContainer>
        {loading ? (
          <p>Loading</p>
        ) : (
          currentProducts.map((item) => (
            <ProductCard key={item._id} data={item} />
          ))
        )}
        <PaginationControls>
          <PaginationButtons>
            <PaginationButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationButton>
            {pageNumbers.map((number) => (
              <PaginationButton
                key={number}
                onClick={() => setCurrentPage(number)}
                isActive={number === currentPage}
              >
                {number}
              </PaginationButton>
            ))}
            <PaginationButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationButton>
          </PaginationButtons>
          <PageNumber>
            Page {currentPage} of {totalPages}
          </PageNumber>
        </PaginationControls>
      </ProductsContainer>
    </Container>
  );
};

export default AllProductSection;
