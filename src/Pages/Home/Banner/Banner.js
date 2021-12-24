import React from 'react';
import { Carousel, Col, Row } from "antd";
import carImg from "./../../../images/car.png";
import truckImg from "./../../../images/truckImg.png";
import bike from "./../../../images/bike.png";
import { Link, NavLink } from 'react-router-dom';
import {
  Line,
  SteppedLine,
  PolyLine,
  Circle,
  Rectangle,
} from "draw-shape-reactjs";

const contentStyle = {
  height: "100px",
  color: "red",
  lineHeight: "160px",
  textAlign: "center",
  background: `url("https://images.unsplash.com/photo-1454117096348-e4abbeba002c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
  zIndex: '99'
};

const Banner = () => {
    return (
      <div>
        <Carousel autoplay>
          <div className="slider">
            <div className="slider-text">
              <h2>Rent Bike</h2>
              <p>
                Rental offers you the best bikes to rent in Reasonable amount.
                Choose your car now and get instant <span>10%</span> off on
                every bike.
              </p>
              <Link to="/">
                <button className="primary-button">Rent Now</button>
              </Link>
            </div>
            <div className="">
              <img src={bike} alt="" className="slider-img" />
            </div>
          </div>
          <div className="slider">
            <div className="slider-text">
              <h2>Rent car</h2>
              <p>
                Rental offers you the best cars to rent in Reasonable amount.
                Choose your car now and get instant <span>10%</span> off on
                every car.
              </p>
              <Link to="/">
                <button className="primary-button">Rent Now</button>
              </Link>
            </div>
            <div className="">
              <img src={carImg} alt="" className="slider-img" />
            </div>
          </div>
          <div className="slider">
            <div className="slider-text">
              <h2>Rent Truck</h2>
              <p>
                Rental offers you the best trucks to rent in Reasonable amount.
                Choose your car now and get instant <span>10%</span> off on
                every truck.
              </p>
              <Link to="/">
                <button className="primary-button">Rent Now</button>
              </Link>
            </div>
            <div className="">
              <img
                src="https://starpng.com/public/uploads/preview/yellow-lorry-transparent-background-png-11577025245kg6z7bc77v.png"
                alt=""
                className="slider-img-2"
                width="650px"
              />
            </div>
          </div>
        </Carousel>
      </div>
    );
};

export default Banner;