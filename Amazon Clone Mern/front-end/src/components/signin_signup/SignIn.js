import React, { useState } from 'react';
import "./SignInUp.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UseUiProvider } from '../context/ContextProvider';

const SignIn = () => {
    const { account, setAccount } = UseUiProvider();
    const navigate = useNavigate();

    const [logData, setLogData] = useState({
        email: "",
        password: "",
    });

    const addLogInData = (e) => {
        const { name, value } = e.target;
        setLogData({
            ...logData,
            [name]: value,
        })
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

    const sendData = async (e) => {
        e.preventDefault();

        const { email, password } = logData;

        const URL = "http://localhost:8000";

        const res = await fetch(`${URL}/loginuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
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
            toast.success("Registered Successfully.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLogData({
                ...logData,
                email: "",
                password: "",
            });
            getUserData();
            navigate("/");
        }
    }

    return (
        <>
            <section>
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
                <div className='sign_container'>
                    <div className='sign_header'>
                        <img src='./blacklogoamazon.png' alt='amazonlogo' />
                    </div>
                    <div className='sign_form'>
                        <form method='POST'>
                            <h1>Sign_In</h1>
                            <div className='form_data'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='text'
                                    onChange={addLogInData}
                                    value={logData.email}
                                    name='email'
                                    id='email'
                                />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='password'>Password</label>
                                <input type='password'
                                    onChange={addLogInData}
                                    value={logData.password}
                                    name='password'
                                    placeholder='At List 6 Character'
                                    id='password'
                                />
                            </div>
                            <button type='button' className='signin_btn' onClick={sendData}>Continue</button>
                        </form>
                        <div className='create_accountinfo'>
                            <p>New To Amazon</p>
                            <NavLink to="/register"><button type='button'>Create Your Amazon Account</button></NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn;