import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Footer from './Components/footer';
import Signup from './Components/Signup';


ReactDOM.render(
  <React.StrictMode>
    <Navbar/>
    <Header />
    <Carousel/>

    <Footer/>

  </React.StrictMode>,
  document.getElementById('root')
);

