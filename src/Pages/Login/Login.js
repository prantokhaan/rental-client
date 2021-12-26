import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/Actions/userActions";
import AOS from "aos";
import "aos/dist/aos.css"; 
import Spinner from "../Shared/Spinner";
import truck from "./../../images/image-removebg-preview (4).png";
AOS.init();

const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alertReducer);
    function onFinish(values) {
      dispatch(userLogin(values));
      console.log(values);
    }
  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="w-100"
            data-aos="slide-right"
            data-aos-duration="1500"
            src="https://cdn.pixabay.com/photo/2017/06/27/18/18/isolated-2448337_960_720.png"
          />
          <div className="text-center pt-5">
            <h1 className="login-logo"></h1>
          </div>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
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
              <Input type="password" />
            </Form.Item>

            <button className="btn1 mt-2">Login</button>

            <hr />

            <Link to="/register">Click Here to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
