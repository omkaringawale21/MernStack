import './App.css';
import Buynow from './components/buynow/Buynow';
import Cart from './components/cart/Cart';
import Footer from './components/footer/Footer';
import Navbaar from './components/header/Navbaar';
import Maincomp from './components/home/Maincomp';
import Newnav from './components/newnavbaar/Newnav';
import SignIn from './components/signin_signup/SignIn';
import SignUp from './components/signin_signup/SignUp';
import { Routes, Route } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

function App() {
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadData(true);
    }, 3000);
  }, []);

  return (
    <>
      {
        loadData ?
          (
            <>
              <Navbaar />
              <Newnav />
              <Routes>
                <Route path='/' element={<Maincomp />} />
                <Route path='/login' element={<SignIn />} />
                <Route path='/register' element={<SignUp />} />
                <Route path='/getproduct/:id' element={<Cart />} />
                <Route path='/buynow' element={<Buynow />} />
              </Routes>
              <Footer />
            </>
          )
          :
          (
            <div className='circle'>
              <CircularProgress />
              <h3>Loading...</h3>
            </div>
          )
      }
    </>
  );
}

export default App;
