import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { styled } from "styled-components";
import CartItem from "../components/CartItem";
import Navbar from "../components/navbar"
import { userRequest } from "../requestMethod";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingClip from "../components/Loadings/LoadingClip";

const Wrapper = styled.div`
  max-width: 980px;
  margin: auto;
  padding: 0 10px 16px;
  min-height: 320px;
  color: #282c3f;
  display: flex;
  padding: 20px;
`;

const ItemSectionContainer = styled.div`
  display: inline-block;
  width: 60%;
  padding-right: 20px;
  border-right: 1px solid #eaeaec;
  margin-top:2rem;
`;

const MethodAndStatus = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`;

const Summary = styled.div`
  flex: 1;
  padding: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
`;

const StatusContainer = styled.div`
  padding: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin-bottom: 20px;
  text-transform: capitalize;
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

const Method = styled.span`
  color: black;
  font-weight: 700;
`;
const Status = styled.span`
  color: white;
  font-weight: 600;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: #${(props) => props.bgcolor};
`;

const OrderSummaryContainer = styled.div`
  width: 40%;
  margin-left: 10px;
  margin-top: 2rem;
`;

const OrderScreen = () => {
  const { id } = useParams();

  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.total_amount },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const updateStatus = async () => {
    try {
      await userRequest.put(`/orders/${id}`, {
        payment_status: "Paid",
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Payment Successful",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Payment Failed",
      });
    }
  };

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      updateStatus();
      setPaymentStatus("Paid");
    });
  }
  function onError(err) {
    console.log(err);
  }
  useEffect(() => {
    const loadPaypalScript = async () => {
      const { data: clientId } = await userRequest.get("/keys/paypal");
      paypalDispatch({
        type: "resetOptions",
        value: { clientId: clientId, currency: "USD" },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };

    loadPaypalScript();
  }, [paypalDispatch]);

  const [order, setOrder] = useState({});
  useEffect(() => {
    const getOrder = async () => {
      const response = await userRequest(`/orders/${id}`);
      setOrder(response.data);
      setPaymentStatus(response.data.payment_status);
    };
    getOrder();
  }, [paymentStatus, id]);

  return (
    <>
      <Navbar/>
      <Container>
        <Wrapper>
          <ItemSectionContainer>
            <div>
              <StatusContainer>
                <Title>DELIVERY STATUS</Title>
                <MethodAndStatus>
                  <Method>
                    Delivery to: {order.shipping_address?.Name},{" "}
                    {order?.shipping_address?.PinCode},{" "}
                    {order?.shipping_address?.FullAddress},
                  </Method>
                  <Status
                    bgcolor={
                      order.status === "Pending"
                        ? "f39c12"
                        : order.status === "Delivered"
                        ? "CBEADC"
                        : order.status === "Failed"
                        ? "F5D1D1"
                        : "black"
                    }
                  >
                    {order.status}
                  </Status>
                </MethodAndStatus>
              </StatusContainer>
            </div>
            {order?.products?.map((item) => {
              return (
                <CartItem key={item._id} data={item} interactable={false} />
              );
            })}
          </ItemSectionContainer>
          <OrderSummaryContainer>
            <StatusContainer>
              <Title>PAYMENT STATUS</Title>
              <MethodAndStatus>
                <Method>{order.payment_method}</Method>
                <Status
                  bgcolor={
                    order.payment_status === "Pending"
                      ? "f39c12"
                      : order.payment_status === "Paid"
                      ? "2ecc71"
                      : order.payment_status === "Failed"
                      ? "F5D1D1"
                      : "black"
                  }
                >
                  {order.payment_status}
                </Status>
              </MethodAndStatus>
            </StatusContainer>
            <Summary>
              <Title>ORDER SUMMARY</Title>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {order.total_amount}</SummaryItemPrice>
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
                <SummaryItemPrice>$ {order.total_amount}</SummaryItemPrice>
              </SummaryItem>
              {/* <Button>CHECKOUT NOW</Button> */}
              {paymentStatus === "Pending" && order.total_amount &&
                (isPending ? (
                  <LoadingClip />
                ) : (
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                ))}
            </Summary>
          </OrderSummaryContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default OrderScreen;
