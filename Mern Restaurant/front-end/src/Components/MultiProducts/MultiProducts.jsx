import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { getDataFromCart, putCartData } from "../../API/API";

const iconsInfo = [
  {
    id: 1,
    nameDtl: "fruits",
  },
  {
    id: 2,
    nameDtl: "vegetable",
  },
  {
    id: 3,
    nameDtl: "rice",
  },
  {
    id: 4,
    nameDtl: "cake",
  },
  {
    id: 5,
    nameDtl: "burger",
  },
  {
    id: 6,
    nameDtl: "icecream",
  },
  {
    id: 7,
    nameDtl: "pizza",
  },
  {
    id: 8,
    nameDtl: "dosa",
  },
  {
    id: 9,
    nameDtl: "paneer",
  },
  {
    id: 10,
    nameDtl: "sandwich",
  },
  {
    id: 11,
    nameDtl: "all",
  },
];

const productLists = [
  {
    id: 1,
    imgUrl: "../../../../../images/amaranthus.jpg",
    nameDtl: "amaranthus 1 bunch",
    categoryDtl: "vegetable",
    foodPrice: 20,
    foodQty: 1,
  },
  {
    id: 2,
    imgUrl: "../../../../../images/apple.jfif",
    nameDtl: "apple",
    categoryDtl: "fruits",
    foodPrice: 20,
    foodQty: 1,
  },
  {
    id: 3,
    imgUrl:
      "../../../../../images/birthday-cake-png-clip-art-birthday-cake-.png",
    nameDtl: "birthday cake",
    categoryDtl: "cake",
    foodPrice: 90,
    foodQty: 1,
  },
  {
    id: 4,
    imgUrl:
      "../../../../../images/burger-king-whopper-with-cheese-png-image-purepng-20.png",
    nameDtl: "burger",
    categoryDtl: "burger",
    foodPrice: 50,
    foodQty: 1,
  },
  {
    id: 5,
    imgUrl:
      "../../../../../images/dish-food-cuisine-pizza-ingredient-pizza-hut-pepperoni-pizza.jpg",
    nameDtl: "pizza",
    categoryDtl: "pizza",
    foodPrice: 60,
    foodQty: 1,
  },
  {
    id: 6,
    imgUrl: "../../../../../images/basmatirice.png",
    nameDtl: "basmati rice",
    categoryDtl: "rice",
    foodPrice: 30,
    foodQty: 1,
  },
  {
    id: 7,
    imgUrl: "../../../../../images/Sandwich1.png",
    nameDtl: "chease sandwich",
    categoryDtl: "sandwich",
    foodPrice: 55,
    foodQty: 1,
  },
  {
    id: 8,
    imgUrl: "../../../../../images/paneer-tikka.png",
    nameDtl: "paneer tikka",
    categoryDtl: "paneer",
    foodPrice: 43,
    foodQty: 1,
  },
  {
    id: 9,
    imgUrl: "../../../../../images/ice-cream-bowl-image.png",
    nameDtl: "ice cream bowl",
    categoryDtl: "icecream",
    foodPrice: 30,
    foodQty: 1,
  },
  {
    id: 10,
    imgUrl: "../../../../../images/dosa-masala.png",
    nameDtl: "masala dosa",
    categoryDtl: "dosa",
    foodPrice: 50,
    foodQty: 1,
  },
  {
    id: 11,
    imgUrl: "../../../../../images/fresh-yellow-banana-fruit-free.png",
    nameDtl: "fresh banana",
    categoryDtl: "fruits",
    foodPrice: 32,
    foodQty: 1,
  },
  {
    id: 12,
    imgUrl: "../../../../../images/south-indian-dosa.png",
    nameDtl: "south indian dosa",
    categoryDtl: "dosa",
    foodPrice: 45,
    foodQty: 1,
  },
  {
    id: 13,
    imgUrl:
      "../../../../../images/pepperoni-pizza-chicago-style-pizza-italian-cuisine-breakfast-oven-pizza-food-baking-plate.png",
    nameDtl: "pepperoni pizza chicago style pizza",
    categoryDtl: "pizza",
    foodPrice: 89,
    foodQty: 1,
  },
  {
    id: 14,
    imgUrl:
      "../../../../../images/classic-cheeseburger-with-beef-patty-pickles-cheese-tomato-onion-lettuce-and-ketchup-mustard-free-png.webp",
    nameDtl: "jumbo burger",
    categoryDtl: "burger",
    foodPrice: 120,
    foodQty: 1,
  },
  {
    id: 15,
    imgUrl: "../../../../../images/cake.png",
    nameDtl: "chocolate cake",
    categoryDtl: "cake",
    foodPrice: 150,
    foodQty: 1,
  },
  {
    id: 16,
    imgUrl: "../../../../../images/Ice-Cream-Cup.png",
    nameDtl: "combo icecrem",
    categoryDtl: "icecream",
    foodPrice: 60,
    foodQty: 1,
  },
  {
    id: 17,
    imgUrl: "../../../../../images/rice-bowl-rice.png",
    nameDtl: "berscotch icecrem",
    categoryDtl: "icecream",
    foodPrice: 76,
    foodQty: 1,
  },
  {
    id: 18,
    imgUrl: "../../../../../images/pineapple.jfif",
    nameDtl: "pineapple",
    categoryDtl: "fruits",
    foodPrice: 59,
    foodQty: 1,
  },
  {
    id: 19,
    imgUrl: "../../../../../images/green capsicum 500.jpg",
    nameDtl: "green capsicum",
    categoryDtl: "vegetable",
    foodPrice: 59,
    foodQty: 1,
  },
  {
    id: 20,
    imgUrl: "../../../../../images/orange1.jfif",
    nameDtl: "orange",
    categoryDtl: "fruits",
    foodPrice: 20,
    foodQty: 1,
  },
  {
    id: 21,
    imgUrl: "../../../../../images/green peas - vegetables.jpg",
    nameDtl: "green peas",
    categoryDtl: "vegetable",
    foodPrice: 33,
    foodQty: 1,
  },
  {
    id: 22,
    imgUrl: "../../../../../images/dragonfruit - fruits.jpg",
    nameDtl: "dragonfruit",
    categoryDtl: "fruits",
    foodPrice: 43,
    foodQty: 1,
  },
  {
    id: 23,
    imgUrl: "../../../../../images/sandwich-sandwich.png",
    nameDtl: "grill sandwich",
    categoryDtl: "sandwich",
    foodPrice: 60,
    foodQty: 1,
  },
  {
    id: 24,
    imgUrl: "../../../../../images/Birthday-cake-with-flowers.png",
    nameDtl: "kasata cake",
    categoryDtl: "cake",
    foodPrice: 160,
    foodQty: 1,
  },
  {
    id: 25,
    imgUrl: "../../../../../images/sharad seedless grapes 500 - fruits.jpg",
    nameDtl: "sharad seedless grapes",
    categoryDtl: "fruits",
    foodPrice: 26,
    foodQty: 1,
  },
  {
    id: 26,
    imgUrl: "../../../../../images/cream-ice-pistachio.png",
    nameDtl: "cream ice pistachio",
    categoryDtl: "icecream",
    foodPrice: 50,
    foodQty: 1,
  },
  {
    id: 27,
    imgUrl: "../../../../../images/musk melon - fruits.jpg",
    nameDtl: "musk melon",
    categoryDtl: "fruits",
    foodPrice: 45,
    foodQty: 1,
  },
  {
    id: 28,
    imgUrl: "../../../../../images/mongo.png",
    nameDtl: "mongo",
    categoryDtl: "fruits",
    foodPrice: 39,
    foodQty: 1,
  },
];

const MultiProducts = () => {
  const [filterData, setFilterData] = useState(productLists);
  const { id } = useParams();
  const [addProductToCart, setAddProductToCart] = useState([]);

  useEffect(() => {
    getDetails();

    // window.addEventListener("scroll", revealScroll);

    // function revealScroll() {
    //   const rightRevealMultiProducts = document.querySelector(
    //     ".rightRevealMultiProducts"
    //   );
    //   let windowHeight = window.innerHeight;
    //   let revealTop = rightRevealMultiProducts.getBoundingClientRect().top;
    //   let revealPoint = 100;

    //   if (revealTop < windowHeight - revealPoint) {
    //     rightRevealMultiProducts.classList.add("active");
    //   }
    // }
  }, []);

  const getDetails = async () => {
    const response = await getDataFromCart(id);
    if (response.data.userAddCart.length > 0) {
      setAddProductToCart(response.data.userAddCart);
    } else {
      setAddProductToCart([]);
    }
  };

  const filteringFoods = (category) => {
    if (category === "all") {
      setFilterData(productLists);
    } else {
      const updateList = productLists.filter((filter) => {
        return filter.categoryDtl === category;
      });
      setFilterData(updateList);
    }
  };

  const productAddToCart = async (itemId) => {
    const updateList = productLists.filter((filter) => {
      return filter.id === itemId;
    });

    const item = updateList.find((el) => el);

    alert(`Product added to cart ${item.nameDtl}`);

    await putCartData(id, item);
  };

  return (
    <Box className="rightRevealMultiProducts">
      <Box
        sx={{
          padding: "10px",
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
            textTransform: "capitalize",
            fontSize: "25px",
            fontWeight: 700,
          }}
        >
          products
        </Typography>
        <Box
          component="span"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(5, 1fr)",
              sm: "repeat(7, 1fr)",
              md: "repeat(9, 1fr)",
              lg: "repeat(11, 1fr)",
            },
          }}
        >
          {iconsInfo.map((icon) => {
            return (
              <Box
                component="span"
                key={icon.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    background: "#f5aa0a",
                    color: "#000",
                    "&:hover": {
                      background: "#f5aa0a",
                      color: "#000",
                      opacity: 0.7,
                    },
                  }}
                  onClick={() => filteringFoods(icon.nameDtl)}
                >
                  <RestaurantIcon />
                </IconButton>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {icon.nameDtl}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          background: "#e1e3e3",
          padding: "10px 0px",
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: "1.5rem",
          padding: "10px",
        }}
      >
        {filterData.map((foods) => {
          return (
            <Box
              key={foods.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                boxShadow: 0,
                background: "#fff",
                transition: "all 0.3s linear",
                gap: "1.2rem",
                padding: "10px",
              }}
            >
              <Box
                component="img"
                src={foods.imgUrl}
                alt={`${foods.imgUrl}`}
                sx={{
                  width: "10rem",
                  height: "10rem",
                  objectFit: "cover",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  textTransform: "capitalize",
                  marginBottom: "-1rem",
                }}
              >
                {foods.nameDtl.slice(0, 12)}...
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  textTransform: "capitalize",
                  marginBottom: "-1rem",
                }}
              >
                {foods.categoryDtl}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  marginBottom: "-1rem",
                }}
              >
                <span style={{ color: "red" }}>₹</span>
                {foods.foodPrice}
              </Typography>
              <Button
                sx={{
                  background: "#f5aa0a",
                  textTransform: "capitalize",
                  color: "#000",
                  fontWeight: 600,
                  transition: "all 0.3s linear",
                  "&:hover": {
                    background: "#f5aa0a",
                    color: "#000",
                    letterSpacing: "2px",
                  },
                }}
                onClick={() => productAddToCart(foods.id)}
              >
                add to cart
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MultiProducts;
