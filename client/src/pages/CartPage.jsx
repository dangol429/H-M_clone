import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Container } from "react-bootstrap";
import AddressStripComponent from "../components/AddressStripComponent";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import AddressDialogBox from "../components/AddressDialogBox";
import { userRequest } from "../requestMethod";
import { Link,useNavigate } from "react-router-dom";
import { deleteCart } from "../redux/cartRedux";
import Navbar from "../components/navbar";
import Swal from "sweetalert2"; 

const Heading = styled.h1` 
text-align: center;
`;

const Containers = styled.div`
margin-top:3rem;`

const Line1 = styled.div`
text-align: center;
padding: 2rem;`

const Wrapper = styled.div`
display:flex;
gap: 1rem;
`
const ImageContainer = styled.div``

const Details = styled.div``

const ItemContainer = styled.div``;

const CheckoutContainer = styled.div``;
const PaymentContainer = styled.div`
  padding: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Hr = styled.hr`
  background-color: #080808;
  border: none;
  height: 1px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const OrderSummaryContainer = styled.div`
  width: 40%;
  margin-left: 10px;
  margin-top: 30px;
`;

const PaymentSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &.vibrate {
    animation: vibrateAnimation 0.3s infinite linear;
    background-color: black;
    color: white;
  }

  @keyframes vibrateAnimation {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const Summary = styled.div`
  flex: 1;
  padding: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
`;

const Empty = styled.p`
width: 40rem;
text-align: center;
font-size: 2rem;
margin-top: 13rem;
border-radius: 15rem;
`


const CartPage = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [address, setAddress] = useState({});
  const [onAddressChange, setOnAddressChange] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addressLoading, setAddressLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await userRequest("/address/");
        setAddress(response.data);
        setAddressLoading(false);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log(`AllAddress ${err}`);
      }
    };

    getAddress();
  }, [onAddressChange]);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleCheckOut = async () => {
    if (cartProducts.length === 0) {
      // Use Swal for error message
      Swal.fire({
        icon: "error",
        title: "Cart is Empty",
        text: "Your cart is empty. Please add items to your cart.",
        iconColor: "#ff3f6c",
        confirmButtonColor: "#ff3f6c",
      });

      setCheckoutClicked(true);
      setTimeout(() => {
        setCheckoutClicked(false);
      }, 1000);
      return;
    }
    
    if (selectedPayment === "paypal" && address !== null) {
      try {
        const products = cartProducts.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          price: item.price,
          category: item.categories,
          brand: item.brand,
        }));
        console.log(products);
        const orderBody = {
          products: products,
          total_amount: totalPrice,
          payment_method: selectedPayment,
          shipping_address: address.address,
        };
        const res = await userRequest.post("/orders", orderBody);
        dispatch(deleteCart());
        navigate(`/order/${res.data._id}`);
      } catch (err) {
        console.log(err);
      }
    } else if (selectedPayment !== "paypal" && address === null) {
      // Use Swal for error message
      Swal.fire({
        icon: "error",
        title: "Invalid Payment and Address",
        text: "Please select a valid payment method and add a valid address.",
        iconColor: "#ff3f6c",
        confirmButtonColor: "#ff3f6c",
      });

      setCheckoutClicked(true);
      setTimeout(() => {
        setCheckoutClicked(false);
      }, 1000);
    } else if (selectedPayment !== "paypal") {
      // Use Swal for error message
      Swal.fire({
        icon: "error",
        title: "Invalid Payment Method",
        text: "Please select a valid payment method.",
        iconColor: "#ff3f6c",
        confirmButtonColor: "#ff3f6c",
      });

      setCheckoutClicked(true);
      setTimeout(() => {
        setCheckoutClicked(false);
      }, 1000);
    } else if (address === null) {
      // Use Swal for error message
      Swal.fire({
        icon: "error",
        title: "Invalid Address",
        text: "Please add a valid address.",
        iconColor: "#ff3f6c",
        confirmButtonColor: "#ff3f6c",
      });

      setCheckoutClicked(true);
      setTimeout(() => {
        setCheckoutClicked(false);
      }, 1000);
    }
  };
  
  return (
    <>
      <Navbar />
      <Containers>
        <Line1>Members get free delivery over £30 and free returns.</Line1>
        <Heading>Shopping Bag</Heading>
        <Container>
        <Wrapper>
        <ItemContainer>
          {cartQuantity === 0 ? (
            <Empty>Your cart is empty. <Link to="/allproducts"> Click here</Link> below to buy from our latest collection.</Empty>
          ) : (
            cartProducts.map((item) => (
              <CartItem data={item} key={item._id + item.selectedSize} />
            ))
          )}
        </ItemContainer>
        <OrderSummaryContainer>
            <PaymentContainer>
              <Title>PAYMENT OPTIONS</Title>
              <PaymentSelect
                value={selectedPayment}
                onChange={handlePaymentChange}
                className={
                  checkoutClicked && selectedPayment !== "paypal"
                    ? "vibrate"
                    : ""
                }
              >
                <option value="">Select Payment Method</option>

                <option value="paypal">PayPal</option>
              </PaymentSelect>
            </PaymentContainer>
            <Summary>
              {addressLoading ? (
                <></>
              ) : (
                <AddressStripComponent
                  setOpenAddressDialog={setOpenAddressDialog}
                  address={address}
                  addClass={checkoutClicked && address === null ? "vibrate" : ""}
                />
              )}
            </Summary>
            <Summary>
              <Title>ORDER SUMMARY</Title>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 40</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -40</SummaryItemPrice>
              </SummaryItem>
              <Hr />
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <Button onClick={handleCheckOut}>CHECKOUT NOW</Button>
            </Summary>
          </OrderSummaryContainer>
          </Wrapper>
          {openAddressDialog && (
          <AddressDialogBox
            setOpenAddressDialog={setOpenAddressDialog}
            setOnAddressChange={setOnAddressChange}
            onAddressChange={onAddressChange}
          />
        )}
      </Container>
      </Containers>

      
    </>
  );
};

export default CartPage;
