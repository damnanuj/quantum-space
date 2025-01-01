import { Button, Form, Input, message, Radio } from "antd";
import React, { useState } from "react";
import "./SignupForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../../utils/apis/auth/signupApi";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onFinishSignup = async (signupFormData) => {
    setIsLoading(true);
    // >>======if the backend is facing downtime================>>
    const timeoutId = setTimeout(() => {
      message.info("Please wait, it's taking longer than usual.");
    }, 10000);
    const { success } = await signupApi(signupFormData);

    if (success) {
      clearTimeout(timeoutId);
      navigate("/feed");
    } else {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="signupFormContainer">
      <Form
        onFinish={onFinishSignup}
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
            <p>Let's setup your profile</p>
            <span></span>
          </div>
        </div>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input placeholder="Steverogers" />
        </Form.Item>

        <Form.Item
          label="Full name"
          name="name"
          rules={[
            {
              required: true,
              message: "Full name is required",
            },
          ]}
        >
          <Input placeholder="Steve Rogers" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Please input your valid Email",
            },
            {
              required: true,
              message: "Email is required",
            },
          ]}
        >
          <Input placeholder="steverogers@gmail.com" />
        </Form.Item>
        {/* <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "City is required" }]}
        >
          <Input placeholder="Please enter your city" />
        </Form.Item> */}

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Gender is required" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            {/* <Radio value="LGTV">Lgtv💩</Radio> */}
          </Radio.Group>
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
          <Input.Password placeholder="Please set a password" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            className="formBtn"
            block
            type="primary"
            htmlType="submit"
          >
            Signup
          </Button>
        </Form.Item>
        <div className="loginLink">
          Already have an account? <Link to="/login">login</Link>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
