import React from 'react';
import { DatePicker, Space, TimePicker } from "antd";
import { Link } from 'react-router-dom';

const FindArea = () => {
    return (
      <div className="container">
        <div className="find-area bs1">
          <div className="row">
            <div className="col-md-4 find-title">
              <h2>Search Your Best Cars Here.</h2>
            </div>
            <div className="col-md-8 find-content">
              <div className="row">
                <div className="col-md-4 datepicker">
                  <DatePicker
                    style={{ padding: "15px 20px", color: "#E53B2D" }}
                  />
                </div>
                <div className="col-md-4">
                  <TimePicker
                    style={{ padding: "15px 20px", color: "#E53B2D" }}
                  />
                </div>
                <div className="col-md-4 find-button">
                  <Link to="/">
                    <button className="secondary-button">Find Cars</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FindArea;