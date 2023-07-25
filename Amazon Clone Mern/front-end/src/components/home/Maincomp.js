import React from 'react';
import "./Home.css";
import Banner from './Banner';

const Maincomp = () => {
    return (
        <div className='home_section'>
            <div className='banner_part'>
                <Banner />
            </div>
        </div>
    )
}

export default Maincomp;