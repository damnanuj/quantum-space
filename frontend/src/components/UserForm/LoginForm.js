import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import "./SignupForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../utils/apis/auth/loginApi";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onFinishLogin = async (loginFormData) => {
    setIsLoading(true);
    // >>======if the backend is facing downtime================>>
    const timeoutId = setTimeout(() => {
      message.info("Please wait, it's taking longer than usual.");
    }, 10000);
    try {
      const { success } = await loginApi(loginFormData);
      if (success) {
        clearTimeout(timeoutId);
        navigate("/feed");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  return (
    <div className="signupFormContainer">
      <Form
        onFinish={onFinishLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="form"
      >
        <div className="formTop">
          <h1 className="spaceHeading">QuantumSpace</h1>
          <h2 className="heading">Your Stories, Your Universe!</h2>
          <div>
            <span></span>
            <p>Welcome back !</p>
            <span></span>
          </div>
        </div>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email is required",
            },
          ]}
        >
          <Input placeholder="steve@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
        >
          <Input.Password placeholder="Please input your password" />
        </Form.Item>

        <Form.Item>
          <Button
            className="formBtn"
            block
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
        <div className="loginLink">
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
