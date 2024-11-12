import React, { useState } from "react";
import UserProfileModal from "./UserProfileModal";


const UpdateDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <div>
      <button onClick={openModal}>Edit Profile</button>
      <UserProfileModal visible={isModalVisible} onCancel={closeModal} />
    </div>
  );
};

export default UpdateDetails;
