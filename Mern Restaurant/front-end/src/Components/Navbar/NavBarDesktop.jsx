import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate, useParams } from "react-router-dom";
import { getUserIdToHomePage, lengthOfCartArr } from "../../API/API";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SyncIcon from "@mui/icons-material/Sync";
import "../../index.css";

const NavBarDesktop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [cartLength, setCartLength] = useState([]);
  const [logout, setLogout] = useState(false);
  const [navToCart, setNavToCart] = useState(false);

  useEffect(() => {
    getDetails();
    getLengthOfCat();
  }, []);

  const getDetails = async () => {
    let user = await getUserIdToHomePage(id);
    setUserId(user.data.userId);
  };

  const getLengthOfCat = async () => {
    let user = await lengthOfCartArr(id);
    setCartLength(user.data.userAddCart);
  };

  const loggingOut = () => {
    setLogout(true);
    setTimeout(() => {
      setLogout(false);
      setUserId("");
      navigate("/login");
    }, 4000);
  };

  const navigateToCart = () => {
    setNavToCart(true);
    setTimeout(() => {
      setNavToCart(false);
      navigate(`/home/${id}/cart`);
      getLengthOfCat();
    }, 4000);
  };

  const navigateToHomePage = () => {
    setTimeout(() => {
      navigate(`/home/${id}`);
      getLengthOfCat();
    }, 1000);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            background: "#f2f0f0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              fontFamily: "cursive",
              color: "#000",
              fontSize: "25px",
              display: "flex",
              alignItems: "center",
              flex: 1.5,
              cursor: "pointer",
            }}
            onClick={navigateToHomePage}
          >
            <RestaurantIcon />
            resto
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 7,
            }}
          >
            <Typography
              sx={{
                color: "#000",
                fontFamily: "cursive",
                fontSize: "20px",
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={navigateToHomePage}
            >
              home
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontFamily: "cursive",
                fontSize: "20px",
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              products
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontFamily: "cursive",
                fontSize: "20px",
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              orders
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontFamily: "cursive",
                fontSize: "20px",
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              about
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontFamily: "cursive",
                fontSize: "20px",
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              contact
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 2.5,
              marginLeft: "10px",
            }}
          >
            <IconButton
              sx={{
                color: "#000",
                position: "relative",
                "&:hover": {
                  background: "#000",
                  color: "#fff",
                },
              }}
              onClick={navigateToCart}
            >
              {navToCart ? (
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="login_logo_animation"
                >
                  <SyncIcon />
                </Box>
              ) : (
                <>
                  <span
                    style={{
                      position: "absolute",
                      top: -2,
                      right: 6,
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {cartLength.length}
                  </span>
                  <ShoppingCartIcon />
                </>
              )}
            </IconButton>
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "lowercase",
                color: "#000",
                width: "12rem",
                height: "2.8rem",
                fontFamily: "cursive",
                fontSize: "20px",
                transition: "all 0.3s ease",
                margin: 0,
                padding: 0,
                borderRadius: "5px",
                "&:hover": {
                  background: "#000",
                  color: "#f2f0f0",
                },
              }}
              onClick={loggingOut}
            >
              {logout ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="login_logo_animation"
                >
                  <SyncIcon />
                </Box>
              ) : (
                <>
                  <AccountCircleIcon />
                  {userId.slice(0, 12)}...
                </>
              )}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBarDesktop;
