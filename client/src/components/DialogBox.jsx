import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateCartItem } from "../redux/cartRedux";

const DialogContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 400px;
`;

const DialogTitle = styled.h2`
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
`;

const QuantityDialogContent = styled.p`
  font-size: 11px;
  margin-bottom: 20px;
`;

const DialogButton = styled.button`
  background-color: white;
  color: black;
  border: 0.1px solid black;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 12px;
  cursor: pointer;
`;

const PlusMinusButton = styled.button`
  background-color: wite;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  font-size: 16px;
  cursor: pointer;
`;
const Content = styled.span`
  padding: 10px;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;
const AllSizeButtonsContainer = styled.div`
`;
const SizeBtnContainer = styled.div`
  margin: 10px 10px 10px 0;
  position: relative;
  display: flex;
`;
const SizeBtn = styled.button`
  border: none;
  background-color: #bab7b6;
  border-radius: 9px;
  padding: 0;
  min-width: 50px;
  height: 50px;
  text-align: center;
  cursor: pointer;
  margin: 0 5px;
  background-color: ${(props) => (props.isselected ? "#333332" : "#bab7b6")};
  color: ${(props) => (props.isselected ? "white" : "black")};
  &:hover {
  }
`;
const SizeLabel = styled.p`
  margin: 0;
  font-size: 14px;
  padding: 0 8px;
  font-weight: 700;
  color: inherit;
`;
const DialogBox = ({ title, quantity, onClose, id, sizes, size }) => {
  const [count, setCount] = useState(quantity);
  const [selectedSize, setSelectedSize] = useState(size);

  const increaseContent = () => {
    setCount(count + 1);
  };

  const decreaseContent = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const dispatch = useDispatch();
  const updateItem = () => {
    console.log(selectedSize)
    dispatch(
      updateCartItem({
        quantity: count,
        selectedSize: selectedSize,
        cartId: id,
      })
    );
    onClose();
  };

  return (
    <DialogContainer>
      <DialogTitle>{title}</DialogTitle>
      <QuantityDialogContent>
        <PlusMinusButton onClick={increaseContent}>+</PlusMinusButton>
        <Content>{count}</Content>
        <PlusMinusButton onClick={decreaseContent}>-</PlusMinusButton>
      </QuantityDialogContent>
      <AllSizeButtonsContainer>
        <SizeBtnContainer>
          {sizes?.map((item, idx) => {
            const isSelected = item === selectedSize;

            return (
              <SizeBtn
                isselected={isSelected}
                key={idx}
                onClick={() => {
                  setSelectedSize(item);
                }}
              >
                <SizeLabel>{item}</SizeLabel>
              </SizeBtn>
            );
          })}
        </SizeBtnContainer>
      </AllSizeButtonsContainer>
      <DialogButton onClick={updateItem}>Done</DialogButton>
    </DialogContainer>
  );
};
export default DialogBox;
