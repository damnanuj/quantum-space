import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import "./UserProfileModal.scss";
import { updateProfileDetails } from "../../../utils/apis/users/updateProfileDetails";
import { UserContext } from "../../../context/userContext";

const UserProfileModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (visible) {
      //>>==== Prefill the form with user data===>>
      form.setFieldsValue({
        name: user.name || "",
        username: user.username || "",
        city: user.location?.city || "",
        state: user.location?.state || "",
        country: user.location?.country || "",
        about: user.about || "",
        website: user.website || "",
      });
    }
  }, [visible, user, form]);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const updatedValues = await form.validateFields();
   
      //>>=== sending updated details to the backend API===>>
      const response = await updateProfileDetails(updatedValues);

      if (response.success) {
        message.success(response.message);

        setUser((prevUser) => ({
          ...prevUser,
          ...updatedValues,
        }));

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
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="edit-profile-modal"
    >
      <div className="edit-modal-header">
        <h2>Edit Profile</h2>
      </div>
      <Form form={form} layout="vertical" className="edit-profile-form">
        <div className="nameUsername">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
        </div>

        <div className="cityState">
          <Form.Item label="City" name="city">
            <Input placeholder="City" />
          </Form.Item>

          <Form.Item label="State" name="state">
            <Input placeholder="State" />
          </Form.Item>
        </div>

        <Form.Item label="Country" name="country">
          <Input placeholder="Country" />
        </Form.Item>

        <Form.Item label="About" name="about">
          <Input.TextArea placeholder="Tell us about yourself" rows={3} />
        </Form.Item>
        <Form.Item label="Website" name="website">
          <Input placeholder="Your social or personal website link" />
        </Form.Item>
        <div className="edit-modal-footer">
          <Button onClick={onCancel} className="cancel-btn">
            Cancel
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={handleSaveChanges}
            className="save-btn"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserProfileModal;
