import React from 'react';
import "./Buynow.css";

const SubTotal = ({ total, noOfProduct }) => {
    return (
        <div className='sub_item'>
            <h3>SubTotal ({noOfProduct.length} Item): <strong style={{ color: "#111", fontWeight: 700 }}>₹{total}</strong></h3>
        </div>
    )
}

export default SubTotal;