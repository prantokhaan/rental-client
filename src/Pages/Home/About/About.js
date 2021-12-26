import React from 'react';
import sign from './../../../images/sign.png';

const About = () => {
    return (
      <div className="container about-area mt-5">
        <div className="row">
          <div className="col-md-6 about-title">
            <h4>About Us</h4>
            <h2>welcome to rental</h2>
            <h6>
              Since 2010 we have not only committed ourselves to delivering
              exceptional repair and maintenance service to the worldwide
              automotive owners.
            </h6>
            <div className="row">
              <div className="col-md-6 status">
                <i className="fas fa-check-square"></i> We are a trusted name
              </div>
              <div className="col-md-6 status">
                <i className="fas fa-check-square"></i> have a larger stock of
                vehicles
              </div>
              <div className="col-md-6 status">
                <i className="fas fa-check-square"></i> we deal in have all
                brands
              </div>
              <div className="col-md-6 status">
                <i className="fas fa-check-square"></i> we are at worldwide
                locations
              </div>
            </div>
            <div className="row sign mt-3">
              <div className="col-md-6 sign-img">
                <img src={sign} alt="" />
              </div>
              <div className="col-md-6 sign-txt mt-5">
                <h4>Ismatul Islam Pranto</h4>
                <h6>CEO & Founder</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src="http://gauto-react.themescare.com/static/media/about.1044506a.png"
              alt=""
              width="100%"
            />
          </div>
        </div>
      </div>
    );
};

export default About;