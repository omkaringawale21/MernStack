import React, { useEffect, useRef } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useParams } from "react-router-dom";
import { putCartData } from "../../API/API";

const silderItems = [
  {
    id: 1,
    imgUrl: "../../../../../images/amaranthus.jpg",
    nameDtl: "amaranthus 1 bunch",
    categoryDtl: "vegetable",
    foodPrice: "20",
    foodQty: 1,
  },
  {
    id: 2,
    imgUrl: "../../../../../images/beetroot.jpg",
    nameDtl: "beetroot",
    categoryDtl: "vegetable",
    foodPrice: "50",
    foodQty: 1,
  },
  {
    id: 3,
    imgUrl: "../../../../../images/brinjal nagpure - vegetables.jpg",
    nameDtl: "brinjal nagpure",
    categoryDtl: "vegetable",
    foodPrice: "40",
    foodQty: 1,
  },
  {
    id: 4,
    imgUrl: "../../../../../images/cabbage per pc - vegetables.jpg",
    nameDtl: "cabbage per pc",
    categoryDtl: "vegetable",
    foodPrice: "60",
    foodQty: 1,
  },
  {
    id: 5,
    imgUrl: "../../../../../images/carrot red per kg - vegetables.jpg",
    nameDtl: "carrot red per kg",
    categoryDtl: "vegetable",
    foodPrice: "10",
    foodQty: 1,
  },
  {
    id: 6,
    imgUrl: "../../../../../images/cauliflower 1 pc - vegetables.jpg",
    nameDtl: "cauliflower 1 pc",
    categoryDtl: "vegetable",
    foodPrice: "60",
    foodQty: 1,
  },
  {
    id: 7,
    imgUrl: "../../../../../images/coriander bunch 50g 200g - vegetables.jpg",
    nameDtl: "coriander bunch 50gm",
    categoryDtl: "vegetable",
    foodPrice: "20",
    foodQty: 1,
  },
  {
    id: 8,
    imgUrl: "../../../../../images/cowpea beans 500g - vegetables.jpg",
    nameDtl: "cowpea beans 500g",
    categoryDtl: "vegetable",
    foodPrice: "30",
    foodQty: 1,
  },
  {
    id: 9,
    imgUrl: "../../../../../images/garlic peeled - vegetables.jpg",
    nameDtl: "garlic peeled",
    categoryDtl: "vegetable",
    foodPrice: "79",
    foodQty: 1,
  },
  {
    id: 10,
    imgUrl: "../../../../../images/ginger 200g - vegetables.jpg",
    nameDtl: "ginger 200g",
    categoryDtl: "vegetable",
    foodPrice: "19",
    foodQty: 1,
  },
];

const Slider = () => {
  const reference = useRef();
  const { id } = useParams();

  // useEffect(() => {
  //   window.addEventListener("scroll", revealScroll);

  //   function revealScroll() {
  //     const leftRevealSlider = document.querySelector(".leftRevealSlider");
  //     let windowHeight = window.innerHeight;
  //     let revealTop = leftRevealSlider.getBoundingClientRect().top;
  //     let revealPoint = 150;

  //     if (revealTop < windowHeight - revealPoint) {
  //       leftRevealSlider.classList.add("active");
  //     }
  //   }
  // }, []);

  const previous = () => {
    reference.current.scrollLeft -= 200;
  };

  const next = () => {
    reference.current.scrollLeft += 200;
  };

  const addToCart = async (prodId) => {
    let filterProd = silderItems.filter((filter) => {
      return filter.id === prodId;
    });

    const updatedProd = filterProd.find((ele) => ele.id);

    alert(`Product added to cart ${updatedProd.nameDtl}`);

    await putCartData(id, updatedProd);
  };

  return (
    <Box
      sx={{
        background: "#e1e3e3",
        padding: "10px 0px",
      }}
      className="leftRevealSlider"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px 0px 10px",
        }}
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "25px",
            fontWeight: 700,
          }}
        >
          fresh vegetables
        </Typography>
        <Box>
          <IconButton
            sx={{
              marginRight: "10px",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#fff",
                background: "#9c9c9c",
              },
            }}
            onClick={previous}
          >
            <SkipPreviousIcon />
          </IconButton>
          <IconButton
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#fff",
                background: "#9c9c9c",
              },
            }}
            onClick={next}
          >
            <SkipNextIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          transition: "all",
          cursor: "grab",
          overflowX: "scroll",
          display: "flex",
          padding: "10px",
          overflow: "hidden",
          gap: "10px",
          scrollBehavior: "smooth",
        }}
        ref={reference}
      >
        {silderItems.map((foods) => {
          return (
            <Box
              key={foods.id}
              sx={{
                boxShadow: 0,
                background: "#fff",
                transition: "all 0.3s linear",
                gap: "1.2rem",
                padding: "10px",
                minWidth: "200px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
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
                  }}
                >
                  {foods.foodTitle}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                >
                  {foods.foodCategory}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
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
                  onClick={() => addToCart(foods.id)}
                >
                  add to cart
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Slider;
