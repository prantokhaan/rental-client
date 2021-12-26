import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addBike, editBike, deleteBike } from "../../../Redux/Actions/bikeActions";
import { getAllBikes } from "../../../Redux/Actions/bikeActions";
import Header from "../../Shared/Header";
import Spinner from "../../Shared/Spinner";

const EditBike = () => {
  const { bikes } = useSelector((state) => state.bikeReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertReducer);
  const [bike, setBike] = useState();
  const [totalBikes, setTotalBikes] = useState([]);
  const { bikeId } = useParams();
  useEffect(() => {
    if (bikes.length == 0) {
      dispatch(getAllBikes());
    } else {
      setTotalBikes(bikes);
      setBike(bikes.find((o) => o._id == bikeId));
      console.log(bike);
    }
  }, [bikes]);

  function onFinish(values) {
    values._id = bike._id;

    dispatch(editBike(values));
    console.log(values);
  }

  return (
    <div>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {totalBikes.length > 0 && (
            <Form
              initialValues={bike}
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

export default EditBike;
