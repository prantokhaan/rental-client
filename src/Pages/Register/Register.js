import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../Redux/Actions/userActions";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "../Shared/Spinner";
AOS.init();

const Register = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alertReducer);
    function onFinish(values) {
      dispatch(userRegister(values));
      console.log(values);
    }
  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: false }]}
            >
              <Input defaultValue="user" disabled/>
            </Form.Item>
            

            <button className="btn1 mt-2 mb-3">Register</button>
            <br />

            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="w-100"
            data-aos="slide-left"
            data-aos-duration="1500"
            src="https://cdn.pixabay.com/photo/2020/11/14/13/18/truck-5741662_960_720.png"
          />
          <h1 className="register-logo"></h1>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
