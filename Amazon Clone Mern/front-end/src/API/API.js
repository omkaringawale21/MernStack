import React from "react";

const backEndURL = "http://localhost:8000";

export const getProducts = async () => {
    try {
        const response = await fetch(`${backEndURL}/getproducts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const movies = await response.json();
        console.log(movies);
    } catch (error) {
        console.log("getProducts", error);
    }
}