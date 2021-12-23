import { Col, Row, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTruck } from "../../../Redux/Actions/truckActions";
import Header from "../../Shared/Header";
import Spinner from "../../Shared/Spinner";

const AddTruck = () => {
      const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertReducer)

    function onFinish(values){

         values.bookedTimeSlots=[]

         dispatch(addTruck(values))
         console.log(values)
    }

    return (
      <Header>
        {loading && <Spinner />}
        <Row justify="center mt-5">
          <Col lg={12} sm={24} xs={24} className="p-2">
            <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
              <h3>Add New Truck</h3>
              <hr />
              <Form.Item
                name="name"
                label="Truck name"
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
                type="number"
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="gvw"
                type="number"
                label="GVW"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="fuel"
                label="Fuel Tank Capacity"
                type="number"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="horsepower"
                label="Horse Power"
                type="number"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="torque"
                label="Torque"
                type="number"
                rules={[{ required: true }]}
              >
                <Input type="number" />
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
                <button className="btn1">ADD CAR</button>
              </div>
            </Form>
          </Col>
        </Row>
      </Header>
    );
    }

export default AddTruck;
