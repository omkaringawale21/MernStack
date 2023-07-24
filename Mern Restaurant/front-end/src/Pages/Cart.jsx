import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar/NavBar";
import { useParams } from "react-router-dom";
import {
  addOrderProductLists,
  checkoutHandler,
  decrementQtyFood,
  deleteItemCartArr,
  getRazorpayKey,
  getUserIdToHomePage,
  incrementQtyFood,
  lengthOfCartArr,
  removeItemCartArr,
} from "../API/API";
import "../index.css";
import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../index.css";

const Cart = () => {
  const { id } = useParams();
  const [cartArr, setCartArr] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const getDetailsOfCart = async () => {
    let cartData = await lengthOfCartArr(id);
    if (cartData.data.userAddCart.length > 0) {
      setCartArr(cartData.data.userAddCart);
    } else {
      setCartArr([]);
    }
  };

  const deleteCartItem = async (itemId) => {
    let update = cartArr.filter((delItem) => {
      return delItem._id === itemId;
    });
    const dtls = update.find((el) => el);

    alert(`Delete Cart Product ${dtls.nameDtl}`);

    await deleteItemCartArr(id, dtls);
    getDetailsOfCart();
  };

  const incrementQty = async (itemId) => {
    let update = cartArr.filter((increQty) => {
      return increQty._id === itemId;
    });
    const dtls = update.find((el) => el);

    if (dtls.foodQty > 0 && dtls.foodQty < 5) {
      dtls.foodQty += 1;

      await incrementQtyFood(id, { ...dtls, foodQty: dtls.foodQty });
      getDetailsOfCart();
    } else {
      alert("you can not get quantity over five quantities");
    }
  };

  const decrementQty = async (itemId) => {
    let update = cartArr.filter((increQty) => {
      return increQty._id === itemId;
    });
    const dtls = update.find((el) => el);
    getDetailsOfCart();

    if (dtls.foodQty > 0 && dtls.foodQty <= 5) {
      dtls.foodQty -= 1;

      await decrementQtyFood(id, { ...dtls, foodQty: dtls.foodQty });
      getDetailsOfCart();
    }
    if (dtls.foodQty === 0) {
      await removeItemCartArr(id, { ...dtls, foodQty: dtls.foodQty });
      getDetailsOfCart();
    }
  };

  const addPayment = async (price) => {
    const data = await checkoutHandler(id, price);

    const dtls = data.data.order;

    const keyDtls = await getRazorpayKey(id);

    if (cartArr.length > 0) {
      cartArr.map(async (cartObj) => {
        await addOrderProductLists(id, cartObj);
      });
    }

    const options = {
      key: keyDtls.data.key,
      amount: dtls.amount,
      currency: dtls.currency,
      name: userDetails.userName,
      description: "Web Developer",
      image: "",
      order_id: dtls.id,
      callback_url: `http://localhost:8000/home/${id}/cart/payment_varification`,
      prefill: {
        name: userDetails.userName,
        email: userDetails.userId,
        contact: userDetails.userPhone,
      },
      notes: {
        address: "Tarabai Park, Kolhapur",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var razor = new window.Razorpay(options);
    razor.open();
  };

  const assignCurrentUser = async () => {
    const userDtls = await getUserIdToHomePage(id);

    setUserDetails(userDtls.data);
  };

  useEffect(() => {
    getDetailsOfCart();
    assignCurrentUser();
  }, []);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          margin: "20px 0px",
        }}
      >
        {cartArr.length === 0 ? (
          <Box
            sx={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: {
                xs: "20rem",
                sm: "30rem",
                md: "35rem",
                lg: "40rem",
              },
              height: {
                xs: "15rem",
                sm: "20rem",
                md: "25rem",
                lg: "30rem",
              },
            }}
          >
            <img
              src="../../../../../images/empty-cart.png"
              alt="empty-cart"
              style={{
                width: "100%",
                height: "100%",
              }}
              // className="img_animation"
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
              },
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              component="div"
              sx={{
                width: "100%",
                height: "100%",
              }}
              className="leftRevealCart"
            >
              {cartArr.map((row) => {
                return (
                  <Box
                    sx={{
                      height: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%",
                        lg: "100%",
                      },
                      width: "95%",
                      display: "block",
                      margin: "15px auto 15px auto",
                      padding: "10px",
                      border: "2px solid #454544",
                      boxShadow: "0rem 0rem 0.5rem 0.3rem #b6b8b8",
                      borderRadius: "20px",
                    }}
                    key={row._id}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <Box
                        component="img"
                        src={`../../../${row.imgUrl}`}
                        alt={`../../../${row.imgUrl}`}
                        sx={{
                          width: {
                            xs: "8rem",
                            sm: "12rem",
                            md: "15rem",
                            lg: "15rem",
                          },
                          height: {
                            xs: "8rem",
                            sm: "12rem",
                            md: "15rem",
                            lg: "15rem",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          flexDirection: "column",
                          width: {
                            xs: "8rem",
                            sm: "12rem",
                            md: "15rem",
                            lg: "15rem",
                          },
                          height: {
                            xs: "8rem",
                            sm: "12rem",
                            md: "15rem",
                            lg: "15rem",
                          },
                        }}
                      >
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            color: "#000",
                            height: {
                              xs: "1.5rem",
                              sm: "2rem",
                              md: "2.5rem",
                              lg: "2.5rem",
                            },
                            width: {
                              xs: "1.5rem",
                              sm: "2rem",
                              md: "2.5rem",
                              lg: "2.5rem",
                            },
                            transition: "linear 0.3s",
                            "&:hover": {
                              color: "#fff",
                              background: "#000",
                            },
                          }}
                          onClick={() => deleteCartItem(row._id)}
                        >
                          <DeleteIcon
                            sx={{
                              fontSize: {
                                xs: "16px",
                                sm: "100%",
                                md: "100%",
                                lg: "100%",
                              },
                            }}
                          />
                        </IconButton>
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            textAlign: "left",
                            fontSize: {
                              xs: "11px",
                              sm: "13px",
                              md: "15px",
                              lg: "18px",
                            },
                            fontWeight: 700,
                          }}
                        >
                          name:
                          <span
                            style={{
                              fontWeight: 500,
                              marginLeft: "10px",
                            }}
                          >
                            {row.nameDtl}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            fontSize: {
                              xs: "11px",
                              sm: "13px",
                              md: "15px",
                              lg: "18px",
                            },
                            fontWeight: 700,
                            marginTop: {
                              xs: "2px",
                              sm: "5px",
                              md: "10px",
                              lg: "10px",
                            },
                          }}
                        >
                          category:
                          <span
                            style={{
                              fontWeight: 500,
                              marginLeft: "10px",
                            }}
                          >
                            {row.categoryDtl}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            fontSize: {
                              xs: "11px",
                              sm: "13px",
                              md: "15px",
                              lg: "18px",
                            },
                            fontWeight: 700,
                            marginTop: {
                              xs: "2px",
                              sm: "5px",
                              md: "10px",
                              lg: "10px",
                            },
                          }}
                        >
                          price:
                          <span
                            style={{
                              fontWeight: 500,
                              marginLeft: "10px",
                            }}
                          >
                            {row.foodPrice * row.foodQty}
                          </span>
                        </Typography>
                        <Box
                          component="span"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: {
                              xs: "2px",
                              sm: "5px",
                              md: "10px",
                              lg: "10px",
                            },
                          }}
                        >
                          <IconButton
                            sx={{
                              borderRadius: "5px",
                              background: "#000",
                              color: "#fff",
                              height: {
                                xs: "1.3rem",
                                sm: "2rem",
                                md: "2rem",
                                lg: "2rem",
                              },
                              width: {
                                xs: "1.3rem",
                                sm: "2rem",
                                md: "2rem",
                                lg: "2rem",
                              },
                              "&:hover": {
                                background: "#000",
                                color: "#fff",
                                opacity: 0.6,
                              },
                            }}
                            onClick={() => incrementQty(row._id)}
                          >
                            <AddIcon
                              sx={{
                                fontSize: {
                                  xs: "16px",
                                  sm: "100%",
                                  md: "100%",
                                  lg: "100%",
                                },
                              }}
                            />
                          </IconButton>
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: {
                                xs: "3px",
                                sm: "5px",
                                md: "8px",
                                lg: "10px",
                              },
                              fontSize: {
                                xs: "10px",
                                sm: "15px",
                                md: "20px",
                                lg: "20px",
                              },
                              color: "#000",
                              height: {
                                xs: "1.5rem",
                                sm: "2rem",
                                md: "2rem",
                                lg: "2rem",
                              },
                              width: {
                                xs: "1.5rem",
                                sm: "2rem",
                                md: "2rem",
                                lg: "2rem",
                              },
                            }}
                          >
                            {row.foodQty}
                          </Typography>
                          <IconButton
                            sx={{
                              borderRadius: "5px",
                              background: "#000",
                              color: "#fff",
                              height: {
                                xs: "1.3rem",
                                sm: "2rem",
                                md: "2rem",
                                lg: "2rem",
                              },
                              width: {
                                xs: "1.3rem",
                                sm: "2rem",
                                md: "2rem",
                                lg: "2rem",
                              },
                              "&:hover": {
                                background: "#000",
                                color: "#fff",
                                opacity: 0.6,
                              },
                            }}
                            onClick={() => decrementQty(row._id)}
                          >
                            <RemoveIcon
                              sx={{
                                fontSize: {
                                  xs: "16px",
                                  sm: "100%",
                                  md: "100%",
                                  lg: "100%",
                                },
                              }}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box
              component="div"
              sx={{
                width: "100%",
                height: "100%",
              }}
              className="rightRevealCart"
            >
              <Box
                sx={{
                  height: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "100%",
                  },
                  width: "95%",
                  display: "block",
                  margin: "15px auto 15px auto",
                }}
              >
                <Box
                  sx={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    borderRadius: "5px",
                    width: "100%",
                    background: "#2a7afa",
                    color: "#fff",
                    fontSize: {
                      xs: "15px",
                      sm: "15px",
                      md: "20px",
                      lg: "20px",
                    },
                    padding: "10px 0px 10px 10px",
                  }}
                >
                  summary
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    textTransform: "capitalize",
                    // textAlign: "center",
                    borderRadius: "5px 5px 0px 0px",
                    width: "100%",
                    background: "#ededed",
                    fontSize: {
                      xs: "15px",
                      sm: "15px",
                      md: "20px",
                      lg: "20px",
                    },
                    padding: "10px 0px 10px 10px",
                    position: "relative",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      textTransform: "capitalize",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    total qty:
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {cartArr.length}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    textTransform: "capitalize",
                    // textAlign: "center",
                    borderRadius: "0px 0px 5px 5px",
                    width: "100%",
                    background: "#ededed",
                    fontSize: {
                      xs: "15px",
                      sm: "15px",
                      md: "20px",
                      lg: "20px",
                    },
                    padding: "10px 0px 10px 10px",
                    position: "relative",
                    borderTop: "1px solid #a3a0a0",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      textTransform: "capitalize",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    total price:
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#fc0a0a",
                        fontWeight: 700,
                      }}
                    >
                      ₹
                    </span>
                    {cartArr.reduce((total, price) => {
                      return (total += price.foodPrice * price.foodQty);
                    }, 0)}
                  </Box>
                </Box>
                <Button
                  sx={{
                    textTransform: "capitalize",
                    width: "100%",
                    background: "#f71b40",
                    color: "#fff",
                    fontSize: {
                      xs: "15px",
                      sm: "15px",
                      md: "20px",
                      lg: "20px",
                    },
                    padding: "10px 0px",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      background: "#f71b40",
                      color: "#fff",
                      letterSpacing: "4px",
                    },
                  }}
                  onClick={() =>
                    addPayment(
                      cartArr.reduce((total, price) => {
                        return (total += price.foodPrice * price.foodQty);
                      }, 0)
                    )
                  }
                >
                  payment
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Cart;
