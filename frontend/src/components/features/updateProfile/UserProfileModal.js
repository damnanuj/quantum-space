import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Row, Col } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import { updateProfileDetails } from "../../../utils/apis/users/updateProfileDetails";

const UserProfileModal = ({ visible, onCancel }) => {
  const { userDetails, isLoggedIn, setUserDetails } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && userDetails) {
      form.setFieldsValue({
        name: userDetails.name || "",
        username: userDetails.username || "",
        city: userDetails.location.city || "",
        state: userDetails.location.state || "",
        country: userDetails.location.country || "",
        about: userDetails.about || "",
        website: userDetails.website || "",
      });
    }
  }, [isLoggedIn, userDetails, visible, form]);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const updatedValues = await form.validateFields();

      //>>=== sending updated details to the backend API===>>
      const response = await updateProfileDetails(updatedValues);

      if (response.success) {
        message.success(response.message);
        setUserDetails(response.data);
        onCancel(); 
      } else {
        message.error("Failed to update profile. Please try again.");
      }
    } catch (info) {
      console.log("Validation Failed:", info);
      message.error("Please fill out all required fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Profile"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={loading}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="userProfileForm">
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter a username" }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="City" name="city">
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="State" name="state">
              <Input placeholder="State" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Country" name="country">
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="about" name="about">
          <Input.TextArea placeholder="Tell us about yourself" rows={3} />
        </Form.Item>

        <Form.Item label="website" name="website">
          <Input placeholder="Your social or personal website link" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserProfileModal;
