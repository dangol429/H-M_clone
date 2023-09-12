import Navbar from "../components/navbar";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BsFillBagPlusFill } from "react-icons/bs";
import { addCartProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import Swal from "sweetalert2";
import { FiArrowRight } from "react-icons/fi";
import LoadingClip from "../components/Loadings/LoadingClip";
import ReviewComponents from "../components/ReviewComponent";


const Containers = styled.div`
margin-left: 15px;
margin-right:15px;
`
const Wrapper = styled.div`
  display: flex;
`;

const ProductImageGridContainer = styled.div`
float: left;
gap:5px;
  width: 58%;
  height: 100%;
  display: grid;
  grid-template-columns: auto auto;`


  const ProductImagesContainer = styled.div`
  border: 1px solid #eaeaec;
  font-size: 30px;

  text-align: center;
`;
const ProductImage = styled.img`
  width: 100%;
`;

const ProductDescriptionContainer = styled.div`
margin-top: 2.5rem;
margin-left: 2rem;
`

const ProductTitle = styled.p `
color: black;
font-size:17px;
font-weight: bold;`

const Price = styled.p`
font-size: 26px;`

const ColorName = styled.p`
color: black;
font-size: 14px;
font-weight: bold;`


const ColorImageContainer = styled.div`
`
const ColorImage= styled.img` 
border: 1px solid black;`

const ColorContainer = styled.div`
padding: 2px;`

const ProductSizeSelectContainer = styled.div`
margin-top: 2rem;`

const Header = styled.p`
`

const SizeBtnContainer = styled.div`
display:flex;
gap:10px;
`


const SizeBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: white;
  border : 1px solid black;

  &:hover {
    background-color: #f0f0f0; /* Whitish gray color */
  }
`;

const SizeLabel = styled.span`
text-align: center;`

const ProductActionContainer = styled.div`
  padding: 0;
  z-index: 0;
  width: 100%;
  margin-top: 3rem;
`;
const AddToBagBtn = styled.div`
  font-weight: 700;
  cursor: pointer;
  background-color: black;
  border: 1px solid white;
  color: #fff;

  flex: 3;
  width: 100%;
  margin-right: 3%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px 0;
`;
const GoToBagBtn = styled(Link)`
  font-weight: 700;
  cursor: pointer;
  background-color: black;
  border: 1px solid #ff3e6c;
  color: #fff;
  text-decoration: none;
  flex: 3;
  width: 100%;
  margin-right: 3%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px 0;
`;
const AddToBagIcon = styled(BsFillBagPlusFill)`
  background-position: -2283px -40px;
  width: 22px;
  height: 22px;
  margin-right: 12px;
`;
const GoToBagIcon = styled(FiArrowRight)`
  background-position: -2283px -40px;
  width: 22px;
  height: 22px;
  margin-right: 12px;
`;
const BtnLabel = styled.span`
  font-weight: 700;
  cursor: pointer;
`;

const Note = styled.p`
font-size: 13px;
`

const DeliveryInfo = styled.p`
font-size: 19px;
text-align: center;
font-weight: bold;`

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const dispatch = useDispatch();
  const productId = useLocation().pathname.split("/")[2];
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [update, setUpdate] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartBtnLoading, setCartBtnLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest("products/" + productId);
        setProduct(response.data); // Access the `data` property of the response
        setLoading(false);
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };

    getProduct(); // Call the `getProducts` function
  }, [productId, update]);

  const SelectedSize = (size) => {
    setSelectedSize(size);
  };

  const cartProducts = useSelector((state) => state.cart.products);
  const isProductInCart = cartProducts?.some((item) => {
    return item?._id === product?._id && item?.selectedSize === selectedSize;
  });

  const currentUser = useSelector((state) => state?.user?.currentUser);
  const AddToCart = async () => {
    if (currentUser) {
      setCartBtnLoading(true);
      await dispatch(
        addCartProduct({
          products: [
            {
              productId: `${product._id}`,
              quantity: 1,
              selectedSize: `${selectedSize}`,
            },
          ],
        })
      ).then((data) => {
        console.log(data);
  
        // Show a success Swal notification
        Swal.fire({
          icon: "success",
          title: "Added to Cart Successfully",
          text: "Your product has been added to the cart.",
          iconColor: "black",
          confirmButtonColor: "blue",
        });
      });
      setCartBtnLoading(false);
    } else {
      Swal.fire({
        icon: "question",
        title: "Do you want to Login?",
        text: "Please Login First to Continue!!",
        iconColor: "#ff3f6c",
        confirmButtonColor: "#ff3f6c",
        cancelButtonColor: "black",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  
  return (
    <>
      <Navbar />
      <Containers>
        <Wrapper className="mt-5">
          <ProductImageGridContainer>
            {product.img?.map((image, idx) => {
              return (
                <ProductImagesContainer>
                  <ProductImage src={image} />
                </ProductImagesContainer>
              );
            })}
          </ProductImageGridContainer>
          <ProductDescriptionContainer>
            <ProductTitle>{product.productName}</ProductTitle>
            <Price>$ {product.price}</Price>
            <ColorContainer>
              <ColorName>{product.colors_name}</ColorName>
              <ColorImageContainer>
                <ColorImage src={product.colors_img} />
              </ColorImageContainer>
            </ColorContainer>
          <ProductSizeSelectContainer>
            <Header>Sizes</Header>
                  <SizeBtnContainer>
                    {product.sizes?.map((item, idx) => {
                      const isSelected = item === selectedSize;

                      return (
                        <SizeBtn
                          isSelected={isSelected}
                          key={idx}
                          onClick={() => {
                            SelectedSize(item);
                          }}
                        >
                          <SizeLabel>{item}</SizeLabel>
                        </SizeBtn>
                      );
                    })}
                  </SizeBtnContainer>
          </ProductSizeSelectContainer>
          <ProductActionContainer>
          {!isProductInCart ? (
                    <AddToBagBtn onClick={AddToCart}>
                      {cartBtnLoading ? (
                        <LoadingClip />
                      ) : (
                        <>
                          <AddToBagIcon />
                          <BtnLabel>Add</BtnLabel>
                        </>
                )}
            </AddToBagBtn>
                  ) : (
                    <GoToBagBtn to="/cart">
                      <GoToBagIcon />
                      <BtnLabel>Go to Cart</BtnLabel>
                    </GoToBagBtn>
                  )}
          </ProductActionContainer>
          <Note>Free standard delivery for Members when spending £30 or more. Free Click and Collect. Free and flexible returns for members</Note>
          <DeliveryInfo>Delivery and Payment</DeliveryInfo>
          <ReviewComponents
                productId={productId}
                averageRating={product?.rating}
                setUpdate={setUpdate}
                update={update}
              />
        </ProductDescriptionContainer>
        </Wrapper>
      </Containers>
    </>
  );
};

export default ProductPage;
