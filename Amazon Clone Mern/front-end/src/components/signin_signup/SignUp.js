import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [registerData, setRegisterData] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        passwordagain: "",
    });

    const addRegisterData = (e) => {
        const { value, name } = e.target;

        setRegisterData({
            ...registerData,
            [name]: value,
        })
    }

    const sendData = async (e) => {
        e.preventDefault();

        const { fname, email, mobile, password, passwordagain } = registerData;

        // console.log("Register Data", fname, email, mobile, password, passwordagain);

        const URL = "http://localhost:8000";

        const res = await fetch(`${URL}/registerdetails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fname, email, mobile, password, passwordagain })
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
            setRegisterData({
                ...registerData,
                fname: "",
                email: "",
                mobile: "",
                password: "",
                passwordagain: "",
            });
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
                            <h1>Create Your Account</h1>
                            <div className='form_data'>
                                <label htmlFor='fname'>Your Name</label>
                                <input
                                    type='text'
                                    name='fname'
                                    id='fname'
                                    onChange={addRegisterData}
                                    value={registerData.fname}
                                />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='text'
                                    name='email'
                                    id='email'
                                    onChange={addRegisterData}
                                    value={registerData.email}
                                />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='mobile'>Mobile</label>
                                <input
                                    type='number'
                                    name='mobile'
                                    id='mobile'
                                    onChange={addRegisterData}
                                    value={registerData.mobile}
                                />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='At List 6 Character'
                                    id='password'
                                    onChange={addRegisterData}
                                    value={registerData.password}
                                />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='passwordagain'>Conform Password</label>
                                <input
                                    type='password'
                                    name='passwordagain'
                                    placeholder='At List 6 Character'
                                    id='passwordagain'
                                    onChange={addRegisterData}
                                    value={registerData.passwordagain}
                                />
                            </div>
                            <button type='button' className='signin_btn' onClick={sendData}>Continue</button>
                            <div className='signin_info'>
                                <p>Already have anaccount ?</p>
                                <NavLink to="/login">sign in</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp;