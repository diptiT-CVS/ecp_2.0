import { Input, Modal } from "antd";
import React from "react";

interface FeedbackModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
  }
  

const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Provide Feedback"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
      centered
    >
      <Input.TextArea rows={4} placeholder="Your feedback here..." />
    </Modal>
  );
};

export default FeedbackModal;
