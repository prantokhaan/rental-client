import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../../Shared/Navbar';

const Rent = () => {
  const user = JSON.parse(localStorage.getItem("user"));

    return (
      <div>
        {user?.role === "admin" && (
          <div className="text-center mt-3">
            <h2 className="">Admin Panel</h2>
          </div>
        )}
        <div className="container mt-5 rent">
          <div className="rent-items d-flex justify-content-center">
            <div className="rent-item ms-4">
              <NavLink
                to="/rent/truck"
                activeClassName="active"
                className="link-button"
              >
                <button className="">Truck</button>
              </NavLink>
            </div>
            <div className="rent-item ms-4">
              <NavLink
                to="/rent/car"
                activeClassName="active"
                className="link-button"
              >
                <button className="">Car</button>
              </NavLink>
            </div>
            <div className="rent-item ms-4">
              <NavLink
                to="/rent/bike"
                activeClassName="active"
                className="link-button"
              >
                <button className="">Bike</button>
              </NavLink>
            </div>
            {user?.role === "admin" && (
              <div className="rent-item ms-4">
                <NavLink
                  to="/rent/addTruck"
                  activeClassName="active"
                  className="link-button"
                >
                  <button className="">Add Truck</button>
                </NavLink>
              </div>
            )}
            {user?.role === "admin" && (
              <div className="rent-item ms-4">
                <NavLink
                  to="/rent/addCar"
                  activeClassName="active"
                  className="link-button"
                >
                  <button className="">Add Car</button>
                </NavLink>
              </div>
            )}
            {user?.role === "admin" && (
              <div className="rent-item ms-4">
                <NavLink
                  to="/rent/addBike"
                  activeClassName="active"
                  className="link-button"
                >
                  <button className="">Add Bike</button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default Rent;