import React from 'react';
import "./Buynow.css";

const Right = ({ total, noOfProduct }) => {
    return (
        <div className='right_buy'>
            <img src='https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png' alt='' />
            <div className='cost_right'>
                <p>Your order is eligible for FREE Delivery.</p>
                <span style={{ color: "#595656" }}>Select this option at checkout. Details</span>
                <h3>SubTotal ({noOfProduct.length} Item): <strong style={{ color: "#111", fontWeight: 700 }}>₹{total}</strong></h3>
                <button className='rightbuy_btn'>Process to Buy</button>
                <div className='emi'>
                    Emi Available
                </div>
            </div>
        </div>
    )
}

export default Right;