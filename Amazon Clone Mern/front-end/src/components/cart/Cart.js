import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Divider } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UseUiProvider } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';

const Cart = () => {
    const { id } = useParams();
    const { product } = useSelector(state => state.getsingleproductdata);
    const dispatched = useDispatch();
    const { account, setAccount } = UseUiProvider();
    const history = useNavigate("");
    const [loadData, setLoadData] = useState(false);

    // console.log("Cart single product", product);

    const getSingleProduct = () => async (dispatching) => {
        const URL = "http://localhost:8000";
        try {
            const data = await fetch(`${URL}/getproductone/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const response = await data.json();
            dispatching({
                type: "SUCCESS_GET_SINGLE_PRODUCT",
                payload: response,
            });
        } catch (error) {
            dispatching({
                type: "FAIL_GET_SINGLE_PRODUCT",
                payload: error.response,
            });
        }
    }

    const addToCart = async (productid) => {
        const URL = "http://localhost:8000";

        const res = await fetch(`${URL}/addcart/${productid}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product }),
            credentials: "include",
        });
        const data = await res.json();

        if (data.status === 422 || data.status === 404 || !data) {
            toast.warn(`${data.error}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.success("Product Added.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            history("/buynow")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoadData(true);
        }, 1000);
        setLoadData(false);
        dispatched(getSingleProduct());
    }, [dispatched, id]);

    return (
        <div className='cart_section'>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {
                loadData ?
                    product && Object.keys(product).length &&
                    <div className='cart_container'>
                        <div className='left_cart'>
                            <img src={`${product.detailUrl}`} alt='cart_image' />
                            <div className='cart_btn'>
                                <button className='cart_btn1' onClick={() => addToCart(product.id)}>Add to Cart</button>
                                <button className='cart_btn2'>Buy Now</button>
                            </div>
                        </div>
                        <div className='right_cart'>
                            <h3>{product.title.shortTitle}</h3>
                            <h4>{product.title.longTitle}</h4>
                            <Divider />
                            <p className='mrp'>M.R.P.: ₹{product.price.mrp}.00</p>
                            <p>{product.tagline} : <span style={{ color: "#b12704" }}>₹{product.price.cost}.00</span></p>
                            <p>You Save : <span style={{ color: "#B12704" }}>₹{product.price.mrp - product.price.cost}.00 ({product.price.discount})</span></p>
                            <div className='discount_box'>
                                <h5>Discount : <span style={{ color: "#111" }}>{product.discount}</span></h5>
                                <h4>Free Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Oct 8 - 21</span> Details</h4>
                                <p>Fastest Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span></p>
                            </div>
                            <p className='description'>About The Item : <span style={{ color: "#595959", fontSize: 14, fontWeight: 500, letterSpacing: '0.5px' }}>{product.description}</span></p>
                        </div>
                    </div>
                    :
                    <div className='circle'>
                        <CircularProgress />
                        <h3>Loading...</h3>
                    </div>
            }
        </div>
    )
}

export default Cart;