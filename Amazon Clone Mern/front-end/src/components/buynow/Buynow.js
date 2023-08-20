import React, { useEffect, useState } from 'react';
import "./Buynow.css";
import { Divider } from '@mui/material';
import Option from './Option';
import SubTotal from './SubTotal';
import Right from './Right';
import { useNavigate } from "react-router-dom";
import { UseUiProvider } from '../context/ContextProvider';

const Buynow = () => {
    const [buynow, setBuynow] = useState([]);
    const navigate = useNavigate();
    const { account, setAccount } = UseUiProvider();

    useEffect(() => {
        getDataBuy();
    }, [])

    const getDataBuy = async () => {
        const URL = "http://localhost:8000";

        const res = await fetch(`/cartdetails`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        const data = await res.json();

        if (!data) {
            navigate("/login");
        } else {
            setBuynow(data.carts);
            getUserData();
        }
    }

    const getUserData = async () => {
        const URL = "http://localhost:8000";

        const res = await fetch(`${URL}/validuser`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();

        if (data.status === 404 || data.status === 422 || !data) {
            navigate("/login");
            // console.log("Data not found in navbaar");
        } else {
            setAccount(data);
            // console.log("Length of cart", data);
        }
    }

    return (
        <>
            {
                buynow.length > 0 ?
                    <div className='buynow_section'>
                        <div className='buynow_container'>
                            <div className='left_buy'>
                                <h1>Shopping Cart</h1>
                                <p>Select all items</p>
                                <span className='leftbuyprice'>Price</span>
                                <Divider />
                                {
                                    buynow.map((item) => {
                                        return (
                                            <div className='item_containert' key={item._id}>
                                                <img src={item.detailUrl} alt='buy_image' />
                                                <div className='item_details'>
                                                    <h3>{item.longTitle}</h3>
                                                    <h3>{item.shortTitle}</h3>
                                                    <h3 className='diffrentprice'>₹{item.price.cost}.00</h3>
                                                    <p className='unusuall'>Usually dispatched in 8 days.</p>
                                                    <p>Eligible for FREE Shipping</p>
                                                    <img src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png' alt='logo' />
                                                    <Option deleteData={item.id} getDataBuy={getDataBuy} />
                                                </div>
                                                <h3 className='item_price'>₹{item.price.cost}.00</h3>
                                            </div>
                                        )
                                    })
                                }
                                <Divider />
                                <SubTotal
                                    noOfProduct={buynow}
                                    total={buynow.reduce((total, itemprice) => {
                                        return total += itemprice.price.cost;
                                    }, 0)} />
                            </div>
                            <Right
                                noOfProduct={buynow}
                                total={buynow.reduce((total, itemprice) => {
                                    return total += itemprice.price.cost;
                                }, 0)} />
                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

export default Buynow;