import { Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Select from "../../select";
import InputNumber from "../../phoneInput";
import { ModalDataInterface, SelectYaxisModalPropsInterface } from "./type";


const SelectYaxisModal: React.FC<SelectYaxisModalPropsInterface> = ({ open, setOpen, setData }) => {
  const [modalData, setModalData] = useState<ModalDataInterface>({ yAxis: undefined, min: undefined, max: undefined });
  const handleClose = () => setOpen(false);
  const [form] = Form.useForm();


  const handleSelectChange = (value: string | undefined) => {
    setModalData((prev) => ({
      ...prev,
      yAxis: value,
    }));
  };

  const handleMinChange = (value: number | string | null) => {
    if (typeof value === "number" || value === null) {
      setModalData((prev) => ({
        ...prev,
        min: value ?? undefined, // Convert null to undefined if needed
      }));
    }
  };
  
  const handleMaxChange = (value: number | string | null) => {
    if (typeof value === "number" || value === null) {
      setModalData((prev) => ({
        ...prev,
        max: value ?? undefined, // Convert null to undefined if needed
      }));
    }
  };
  

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        setData(modalData);
        setOpen(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    form.resetFields();
  }, [open, form]);
  

  return (
    <Modal
      centered
      title="Select Y axis data"
      open={open}
      onOk={handleSubmit}
      onCancel={handleClose}
      okText="Update Data"
    >
      <div className="my-7 flex flex-col gap-7">
        <Form form={form} layout="vertical" className="!space-y-8">
          <Form.Item
            name="yAxis"
            rules={[{ required: true, message: "Please select a Y-axis!" }]}
          >
            <Select
              label="Select Y-axis"
              allowClear
              options={[
                { value: "primary", label: "Primary" },
                { value: "secondary", label: "Secondary" },
              ]}
              onChange={handleSelectChange} // Add onChange handler
            />
          </Form.Item>
          <Form.Item
            name="min"
            rules={[{ required: true, message: "Please input a minimum value!" }]}
          >
            <InputNumber
              label="Min Value"
              onChange={handleMinChange} // Add onChange handler
            />
          </Form.Item>
          <Form.Item
            name="max"
            rules={[{ required: true, message: "Please input a maximum value!" }]}
          >
            <InputNumber
              label="Max Value"
              onChange={handleMaxChange} // Add onChange handler
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default SelectYaxisModal;
