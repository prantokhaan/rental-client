import React from 'react';
import Header from '../Shared/Header';
import Banner from './Banner/Banner';
import Truck from '../Rent/Truck/Truck';
import FindArea from './FindArea/FindArea';
import About from './About/About';
import Services from './Services/Services';
import Driver from './Driver/Driver';

const Home = () => {
  return (
    <div>
      <Header />
      <FindArea />
      <About />
      <Services />
      <Driver />
    </div>
  );
};

export default Home;