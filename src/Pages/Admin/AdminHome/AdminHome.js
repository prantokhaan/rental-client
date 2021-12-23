import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTruck, getAllTrucks } from "../../../Redux/Actions/truckActions";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import Spinner from "../../Shared/Spinner";
import Header from "../../Shared/Header";
const { RangePicker } = DatePicker;

const AdminHome = () => {
  const { trucks } = useSelector((state) => state.truckReducer);
  const { loading } = useSelector((state) => state.alertReducer);
  const [totalTrucks, setTotalTrucks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTrucks());
  }, []);

  useEffect(() => {
    setTotalTrucks(trucks);
  }, [trucks]);

  return (
    <Header>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <Link to="/addTruck">Add Truck</Link>
            </button>
          </div>
        </Col>
      </Row>

      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalTrucks.map((truck) => {
          return (
            <Col lg={7} sm={24} xs={24}>
              <div className="car p-2 bs1 text-center">
                <img src={truck.image} className="carimg" />

                <div className="car-content align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{truck.name}</p>
                    <p> Rent Per Hour {truck.rentPerHour} /-</p>
                  </div>

                  <div className="">
                    <Link to={`/editTruck/${truck._id}`}>
                      <EditOutlined
                        className=" me-5"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={() => {
                        dispatch(deleteTruck({ truckId: truck._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Header>
  );
};

export default AdminHome;
