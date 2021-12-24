import React from 'react';

const Services = () => {
    return (
      <div className="container service-area">
        <div className="service-title text-center">
          <h4>See Our</h4>
          <h2>Latest Services</h2>
        </div>
        <div className="services d-flex">
          <div className="service col-md-4">
            <div className="row">
              <div className="col-md-6">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div className="col-md-6">
                <h2>01</h2>
              </div>
            </div>
            <div className="service-content">
              <h3>City Transfer</h3>
              <h6>If you are planning to move your city then you contact us for truck service. We will help you to deliver your goods carefully.</h6>
            </div>
          </div>
          <div className="service col-md-4">
            <div className="row">
              <div className="col-md-6">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div className="col-md-6">
                <h2>02</h2>
              </div>
            </div>
            <div className="service-content">
              <h3>Wedding Ceremony</h3>
              <h6>If you are planning to move your city then you contact us for truck service. We will help you to deliver your goods carefully.</h6>
            </div>
          </div>
          <div className="service col-md-4">
            <div className="row">
              <div className="col-md-6">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div className="col-md-6">
                <h2>03</h2>
              </div>
            </div>
            <div className="service-content">
              <h3>Tour Whole City</h3>
              <h6>If you are planning to move your city then you contact us for truck service. We will help you to deliver your goods carefully.</h6>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Services;