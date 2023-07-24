import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate, useParams } from "react-router-dom";
import { getUserIdToHomePage, lengthOfCartArr } from "../../API/API";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SyncIcon from "@mui/icons-material/Sync";
import "../../index.css";

const SelectListItem = styled(ListItem)(() => ({
  color: "#000",
  borderBottom: "1px solid white",
  transition: "all .3s ease",
  cursor: "pointer",
  "&.Mui-selected": {
    color: "#fff",
    background: "#000",
    transition: "all .3s ease",
  },
  "&:hover": {
    color: "#fff",
    background: "#000",
    transition: "all .3s ease",
    opacity: 0.7,
  },
}));

const NavbarMobile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [cartLength, setCartLength] = useState([]);
  const [logout, setLogout] = useState(false);
  const [drawerToggle, setDrawerToggle] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [navToCart, setNavToCart] = useState(false);
  const drawerRef = useRef();

  const listText = [
    {
      linkId: 1,
      linkName: "home",
      linkTarget: `/home/${id}`,
    },
    {
      linkId: 2,
      linkName: "products",
      linkTarget: `/home/${id}`,
    },
    {
      linkId: 3,
      linkName: "orders",
      linkTarget: `/home/${id}`,
    },
    {
      linkId: 4,
      linkName: "about",
      linkTarget: `/home/${id}`,
    },
    {
      linkId: 5,
      linkName: "contact",
      linkTarget: `/home/${id}`,
    },
  ];

  useEffect(() => {
    getDetails();
    getLengthOfCat();
  }, []);

  const loggingOut = () => {
    setLogout(true);
    setTimeout(() => {
      setLogout(false);
      setUserId("");
      navigate("/login");
    }, 4000);
  };

  const onActive = (curId, target) => {
    setSelectedId(curId);

    let item = listText.filter((filterItem) => {
      return filterItem.linkId === curId;
    });

    const Id = item.find((ele) => ele);

    if (Id.linkId === curId) {
      setTimeout(() => {
        navigate(target);
      }, 1000);
    }
  };

  const getDetails = async () => {
    let user = await getUserIdToHomePage(id);
    setUserId(user.data.userId);
  };

  const getLengthOfCat = async () => {
    let user = await lengthOfCartArr(id);
    setCartLength(user.data.userAddCart);
  };

  const navigateToCart = () => {
    setNavToCart(true);
    setTimeout(() => {
      setNavToCart(false);
      navigate(`/home/${id}/cart`);
    }, 4000);
  };

  const navigateToHomePage = () => {
    setTimeout(() => {
      navigate(`/home/${id}`);
      getLengthOfCat();
    }, 4000);
  };

  return (
    <Box>
      {drawerToggle ? (
        <Drawer
          open={drawerToggle}
          onClose={() => setDrawerToggle(false)}
          variant="permanent"
          anchor="left"
          ref={drawerRef}
          sx={{
            width: 240,
            flexShrink: 0,
            transition: "all 0.4s linear",
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontFamily: "cursive",
                color: "#000",
                fontSize: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "2px solid #000",
                padding: "10px 0px",
                position: "relative",
                background: "#edfeff",
              }}
            >
              <RestaurantIcon />
              resto
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <IconButton
                  sx={{
                    color: "#000",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#000",
                      color: "#fff",
                    },
                  }}
                  onClick={() => setDrawerToggle(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Typography>
            <List>
              {listText.map((curItem) => {
                return (
                  <SelectListItem
                    key={curItem.linkId}
                    selected={curItem.linkId === selectedId}
                    onClick={() => onActive(curItem.linkId, curItem.linkTarget)}
                  >
                    <ListItemText
                      sx={{
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      {curItem.linkName}
                    </ListItemText>
                  </SelectListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      ) : (
        <></>
      )}
      <AppBar position="static">
        <Toolbar
          sx={{
            background: "#f2f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              textTransform: "capitalize",
              fontFamily: "cursive",
              color: "#000",
              fontSize: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#000",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#fff",
                  background: "#000",
                },
              }}
              onClick={() => setDrawerToggle(true)}
            >
              <MenuIcon />
            </IconButton>
            <Button
              sx={{
                textTransform: "capitalize",
                fontFamily: "cursive",
                color: "#000",
                fontSize: "25px",
              }}
              onClick={navigateToHomePage}
            >
              <RestaurantIcon />
              resto
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "10px",
              position: "relative",
            }}
          >
            <IconButton
              sx={{
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                textTransform: "lowercase",
                color: "#000",
                fontFamily: "cursive",
                width: "8.5rem",
                height: "2.8rem",
                margin: 0,
                padding: 0,
                fontSize: "20px",
                transition: "all 0.3s ease",
                borderRadius: "5px",
                position: "relative",
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
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="login_logo_animation"
                >
                  <SyncIcon />
                </Box>
              ) : (
                <>
                  <AccountCircleIcon />
                  {userId.slice(0, 7)}...
                </>
              )}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarMobile;
