import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addCar,
  editCar,
  deleteCar,
} from "../../../Redux/Actions/carActions";
import { getAllCars } from "../../../Redux/Actions/carActions";
import Header from "../../Shared/Header";
import Spinner from "../../Shared/Spinner";

const EditCar = () => {
  const { cars } = useSelector((state) => state.carReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertReducer);
  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);
  const { carId } = useParams();
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(cars);
      setCar(cars.find((o) => o._id == carId));
      console.log(car);
    }
  }, [cars]);

  function onFinish(values) {
    values._id = car._id;

    dispatch(editCar(values));
    console.log(values);
  }

  return (
    <div>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {totalCars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>

              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="gvw" label="GVW" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="fuel"
                label="Fuel Tank Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="horsepower"
                label="Horse Power"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="torque"
                label="Torque"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="engine"
                label="Engine Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="body"
                label="Body Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="brake"
                label="Brake Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <div className="text-right">
                <button className="btn1">Update</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EditCar;
