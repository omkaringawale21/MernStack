import React from 'react';
import Avatar from '@mui/material/Avatar';
import { UseUiProvider } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import "./RightHeader.css";
import LogoutIcon from '@mui/icons-material/Logout';

const RightHeader = ({ handleClose, userLogout }) => {
    const { account, setAccount } = UseUiProvider();

    return (
        <>
            <div className='rightheader'>
                <div className='right_nav'>
                    {
                        account && Object.keys(account).length ?
                            <Avatar className='avtar2' >{account.fname[0].toUpperCase()}</Avatar>
                            :
                            <Avatar className='avtar' ></Avatar>
                    }
                    {
                        account && Object.keys(account).length ?
                            <h3>Hello, {account.fname.toUpperCase()}</h3>
                            :
                            ""
                    }
                </div>
                <div className='nav_btn' onClick={() => handleClose()}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Shop by Category</NavLink>

                    <Divider style={{ width: "100%", marginBottom: "20px", marginLeft: "-20px" }} />

                    <NavLink to="/">Today's Deal</NavLink>
                    {
                        account && Object.keys(account).length ?
                            <NavLink to="/buynow">Your Orders</NavLink>
                            :
                            <NavLink to="/login">Your Orders</NavLink>
                    }

                    <Divider style={{ width: "100%", marginBottom: "20px", marginLeft: "-20px" }} />

                    <div className='flag'>
                        <NavLink to="/">Settings</NavLink>
                        <img src='' alt='' />
                    </div>

                    {
                        account && Object.keys(account).length ?
                            <div className='flag' onClick={userLogout}>
                                <LogoutIcon style={{ fontSize: 16, marginRight: "10px" }} />
                                <h4 style={{ cursor: "pointer", fontWeight: 500 }}>Logout</h4>
                            </div>
                            :
                            <NavLink to="/login">
                                SignIn
                            </NavLink>
                    }
                </div>
            </div>
        </>
    )
}

export default RightHeader;