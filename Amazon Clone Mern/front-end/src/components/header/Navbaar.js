import React from 'react'
import "./Navbaar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';

const Navbaar = () => {
    return (
        <header>
            <nav>
                <div className='left'>
                    <div className='navlogo'>
                        <img src='./amazon_PNG25.png' alt='logo' />
                    </div>
                    <div className='nav_searchbaar'>
                        <input type='text' />
                        <div className='search_icon'>
                            <SearchIcon id='search' />
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='nav_btn'>
                        <a href=''>signin</a>
                    </div>
                    <div className='cart_btn'>
                        <Badge badgeContent={1} color="secondary">
                            <ShoppingCartIcon id='icon' />
                        </Badge>
                    </div>
                    <Avatar className='avtar' />
                </div>
            </nav>
        </header>
    )
}

export default Navbaar