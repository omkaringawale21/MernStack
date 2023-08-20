import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Option = ({ deleteData, getDataBuy }) => {

    const removeData = async (prodId) => {
        const URL = "http://localhost:8000";

        const res = await fetch(`${URL}/removecart/${prodId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        getDataBuy();

        if (data.status === 422 || data.status === 404 || !data) {
            toast.warn("Can not delete Product.", {
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
            toast.success("Product Deleted.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className='add_remove_select'>
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
            <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p style={{ cursor: "pointer" }} onClick={() => removeData(deleteData)}>Delete</p><span> | </span>
            <p className='forremovemedia'>Save or later</p><span> | </span>
            <p className='forremovemedia'>See more like this</p>
        </div>
    )
}

export default Option;