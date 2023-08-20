import React, { useEffect, useState } from 'react'
import "./Navbaar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { UseUiProvider } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import RightHeader from './RightHeader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/Actions';

const Navbaar = () => {
    const { account, setAccount } = UseUiProvider();
    const navigate = useNavigate();
    const [dropen, setDropen] = useState(false);
    const [text, setText] = useState("");
    const [liopen, setLiopen] = useState(true);
    const { products } = useSelector(state => state.getproductdata);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseLogOut = () => {
        setAnchorEl(null);
    };

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

    const userLogout = async () => {
        const URL = "http://localhost:8000";

        const res = await fetch(`${URL}/logout`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();

        if (data.status === 404 || data.status === 422 || !data) {
            console.log("Logout Error", data);
            // console.log("Data not found in navbaar");
        } else {
            navigate("/login");
            setAccount(false);
            toast.success("User Logout Successfully.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // console.log("Length of cart", data);
        }
    }

    const handleOpen = () => {
        setDropen(true);
    }

    const handleClose = () => {
        setDropen(false);
    }

    const getText = (items) => {
        setText(items);
        setLiopen(false);
    }

    useEffect(() => {
        getUserData();
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <header>
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
            <nav>
                <div className='left'>
                    <IconButton className='hamburgur' onClick={handleOpen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <Drawer open={dropen} onClose={handleClose}>
                        <RightHeader handleClose={handleClose} userLogout={userLogout} />
                    </Drawer>
                    <div className='navlogo'>
                        <NavLink to="/"><img src='../../../amazon_PNG25.png' alt='logo' /></NavLink>
                    </div>
                    <div className='nav_searchbaar'>
                        <input
                            type='text'
                            placeholder='Search Your Product'
                            onChange={(e) => getText(e.target.value)}
                        />
                        <div className='search_icon'>
                            <SearchIcon id='search' />
                        </div>
                        {/* Search Filter */}
                        {
                            text &&
                            <List
                                sx={{
                                    zIndex: 1000,
                                    padding: 0,
                                }}
                                className='extrasearch'
                                hidden={liopen}
                            >
                                {
                                    products
                                        .filter(product =>
                                            product.title.longTitle.toLowerCase().includes(text.toLowerCase())
                                        )
                                        .map(product => (
                                            <ListItem
                                                key={product.id}
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: "#d2f7f5",
                                                    }
                                                }}
                                            >
                                                <NavLink
                                                    to={`/getproduct/${product.id}`}
                                                    onClick={() => setLiopen(true)}
                                                >
                                                    {product.title.longTitle}
                                                </NavLink>
                                            </ListItem>
                                        ))
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className='right'>
                    <div className='nav_btn'>
                        <NavLink to="/login">Sign In</NavLink>
                    </div>
                    <div className='cart_btn'>
                        {
                            account && Object.keys(account).length ?
                                <NavLink to="/buynow">
                                    <Badge badgeContent={account.carts.length} color="secondary">
                                        <ShoppingCartIcon id='icon' />
                                    </Badge>
                                </NavLink>
                                :
                                <NavLink to="/login">
                                    <Badge badgeContent={0} color="secondary">
                                        <ShoppingCartIcon id='icon' />
                                    </Badge>
                                </NavLink>
                        }
                    </div>
                    <>
                        {
                            account && Object.keys(account).length ?
                                <Avatar className='avtar'
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >{account.fname[0].toUpperCase()}</Avatar>
                                :
                                <Avatar className='avtar'
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                ></Avatar>
                        }
                    </>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseLogOut}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleCloseLogOut}>My Account</MenuItem>
                        {
                            account && Object.keys(account).length ?
                                <MenuItem
                                    onClick={() => {
                                        handleCloseLogOut();
                                        userLogout();
                                    }} ><LogoutIcon style={{ fontSize: 16 }} /> Sign Out</MenuItem>
                                :
                                ""
                        }
                    </Menu>
                </div>
            </nav>
        </header>
    )
}

export default Navbaar