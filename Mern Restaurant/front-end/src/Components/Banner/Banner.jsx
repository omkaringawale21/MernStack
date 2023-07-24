import React, { useEffect } from "react";
import { Box, Button, Card, CardActionArea, Typography } from "@mui/material";
import PedalBikeIcon from "@mui/icons-material/PedalBike";

const foodList = [
  {
    id: 1,
    imgUrl: "../../../../../images/amaranthus.jpg",
    foodTitle: "amaranthus 1 bunch",
    foodCategory: "vegetable",
    foodPrice: "20",
  },
  {
    id: 2,
    imgUrl: "../../../../../images/babykiwi.jpg",
    foodTitle: "bady kiwi",
    foodCategory: "fruits",
    foodPrice: "65",
  },
  {
    id: 3,
    imgUrl: "../../../../../images/basmatirice.png",
    foodTitle: "basmati rice",
    foodCategory: "rice",
    foodPrice: "102",
  },
  {
    id: 4,
    imgUrl: "../../../../../images/beetroot.jpg",
    foodTitle: "beetroot",
    foodCategory: "vegetable",
    foodPrice: "50",
  },
];

const Banner = () => {
  // useEffect(() => {
  //   const rightReveal = document.querySelector(".rightReveal");
  //   const leftReveal = document.querySelector(".leftReveal");
  //   const revealHeight = 1000;

  //   if (window.innerHeight < revealHeight) {
  //     leftReveal.classList.add("active");
  //     rightReveal.classList.add("active");
  //   }
  // }, []);

  return (
    <Box
      component="div"
      sx={{
        padding: "10px",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
        },
      }}
      className="revealContainer"
    >
      <Box
        component="div"
        sx={{
          width: "100%",
          height: "100%",
          marginBottom: {
            xs: "10px",
            sm: "10px",
            md: "0px",
            lg: "0px",
          },
        }}
        className="leftReveal"
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "19px",
            textTransform: "capitalize",
            padding: "8px 10px",
            background: "#e1e3e3",
            width: "10.3rem",
            borderRadius: "10px",
          }}
        >
          free delivery
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "3px",
              color: "red",
            }}
          >
            <PedalBikeIcon />
          </span>
        </Typography>
        <Box
          component="h3"
          sx={{
            fontSize: "50px",
            textTransform: "capitalize",
          }}
        >
          the fastest delivery in{" "}
          <span style={{ color: "red" }}>your home</span>
        </Box>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          dolore quidem natus incidunt commodi velit eius mollitia. Repellat,
          sequi nulla! Modi commodi at doloribus voluptatem a expedita cum sint
          officiis ratione dicta, mollitia quisquam placeat saepe dolores
          reprehenderit voluptas laudantium fugiat ipsum, quasi sit incidunt!
          Totam porro sit animi consectetur expedita consequuntur exercitationem
          quidem quos tempora aut iusto omnis officiis nihil quae quo cumque
          maxime aperiam excepturi dolore optio, cupiditate ab sint reiciendis?
          Officiis maiores minus assumenda! Enim atque nostrum rem, veniam quas
          ab, vero voluptas perspiciatis amet aperiam quis, voluptatem suscipit!
          Eos voluptas asperiores veritatis, nulla optio adipisci cupiditate?
        </p>
        <Button
          sx={{
            color: "#fff",
            background: "red",
            textTransform: "capitalize",
            transition: "all 0.3s linear",
            "&:hover": {
              color: "#fff",
              background: "red",
              letterSpacing: "2px",
            },
          }}
        >
          order now
        </Button>
      </Box>
      <Box
        component="div"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "1rem",
          width: "100%",
          height: "100%",
        }}
        className="rightReveal"
      >
        {foodList.map((foods) => {
          return (
            <Card
              key={foods.id}
              sx={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                boxShadow: 0,
                background: "#e1e3e3",
                transition: "all 0.3s linear",
                width: "15rem",
                height: "100%",
                "&:hover": {
                  transform: "scale(0.9)",
                },
              }}
            >
              <CardActionArea
                sx={{
                  width: "100%",
                  height: "100%",
                  padding: "10px",
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
                    width: "100%",
                    height: "100%",
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
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Banner;
