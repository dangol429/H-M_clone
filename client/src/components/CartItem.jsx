import React, { useState } from "react";
import { styled } from "styled-components";
import { MdLocalOffer } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import DialogBox from "./DialogBox";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../redux/cartRedux";
import Dropdown from "react-bootstrap/Dropdown";

const Container = styled.div`
  margin-top: 2rem;
  margin-bottom: 8px;
  background: #fff;
  font-size: 14px;
  border: 1px solid #eaeaec;
  border-radius: 4px;
  position: relative;
  padding: 12px 12px 0;
`;
const Left = styled.div`
  position: absolute;
`;
const Right = styled.div`
  padding-left: 12px;
  position: relative;
  min-height: 148px;
  width: 30rem;
  margin-left: 111px;
  margin-bottom: 12px;
`;
const ProductImageSliderContainer = styled.div`
  position: relative;
  background: rgb(229, 241, 255);
  height: 148px;
  width: 111px;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  overflow-clip-margin: content-box;
  object-fit: contain;
  overflow: clip;
`;
const RightContainer = styled.div`
  text-decoration: none;
  padding-bottom: 0;
  margin-right: 6px;
`;
const ProductInfoContainer = styled.div`
  margin: 0 0 10px 0;
`;

const ProductName = styled.a`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 16px;
  text-decoration: none;
  padding-bottom: 0;
  margin-right: 6px;
  color: #554d4d;
  font-weight: medium;
`;

const Price = styled.p`
font-size: 15px;
font-weight: medium;`

const ProductInformation = styled.div`
display: grid;
grid-template-rows: repeat(2, 1fr); 
grid-template-columns: repeat(2, 1fr); 
gap: 1px;`



const OrderNo = styled.p`
font-size: 12px;`

const Size = styled.p`
font-size: 12px;`

const Color = styled.p`
font-size: 12px;`

const Total = styled.p`
font-size: 12px;`


const DeleteBtn = styled(AiFillDelete)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Button = styled.button`
  width: 5rem;
  height: 2rem;
  background-color: white; 
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;



const CartItem = ({ data, interactable = true }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [isOpen, setIsOpen] = useState('')
  const dispatch = useDispatch();

  // const productQuantity = useSelector((state) => state.cart.products.quantity);
  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const deleteProductFromCart = () => {
    dispatch(deleteCartItem(data));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (value) => {
    setSelectedValue(value)
    setIsOpen(false)
  }

  const totalPrice= data?.price * data?.quantity
  return (
    <Container>
      <Left>
        {/* <a href=""> */}
        <ProductImageSliderContainer>
          <ProductImage src={`${data?.img[0]}`} />
        </ProductImageSliderContainer>
        {/* </a> */}
      </Left>
      <Right>
        <RightContainer>
          <ProductInfoContainer>
            <ProductName> {data?.productName}</ProductName>
            <Price>$ {data?.price}</Price>
          </ProductInfoContainer>
          <ProductInformation>
            <OrderNo> Art No: </OrderNo>
            <Size>Size: {data?.selectedSize}</Size>
            <Color>Colour: </Color>
            <Total>Total: ${totalPrice}  </Total>
            <Button onClick={interactable ? handleOpenDialog : null}>
              Edit
            </Button>
            {showDialog && (
            <DialogBox
              title="Select Size & Quantity"
              quantity={data?.quantity}
              size={data?.selectedSize}
              sizes={data?.sizes}
              onClose={handleCloseDialog}
              id={data?.cartId}
            />
          )}
          </ProductInformation>
        </RightContainer>
      </Right>
      {interactable && (
        <DeleteBtn onClick={interactable ? deleteProductFromCart : null} />
      )}
    </Container>
  );
};

export default CartItem;
