import React from 'react';
import Header from '../Shared/Header';
import Banner from './Banner/Banner';
import Truck from './Truck';
import FindArea from './FindArea/FindArea';
import About from './About/About';
import Services from './Services/Services';

const Home = () => {
  return (
    <div>
      <Header />
      <FindArea />
      <About />
      <Services />
    </div>
  );
};

export default Home;