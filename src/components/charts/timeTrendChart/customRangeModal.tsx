import { Form, Modal } from "antd";
import React, { useEffect } from "react";
import RangePicker from "../../rangePicker";
import dayjs from "dayjs";
import { CustomRangeModalPropsInterface } from "./type";

const CustomRangeModal: React.FC<CustomRangeModalPropsInterface> = ({ open, setOpen, data, setData }) => {
  const [form] = Form.useForm();

  // Calculate valid range based on the data
  const validFromDate = dayjs(data[0]?.x.split(" ")[0], "YYYY-MM-DD");
  const validToDate = dayjs(
    data[data.length - 1]?.x.split(" ")[0],
    "YYYY-MM-DD"
  );

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const [from, to] = values.dateRange.map((date: dayjs.Dayjs) =>
          date.format("YYYY-MM-DD")
        );

        setData({ from, to }); // Set the selected range in "from" and "to" format
        setOpen(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    form.resetFields();
  }, [open]);

  return (
    <Modal
      centered
      title="Select custom range"
      open={open}
      width={400}
      onOk={handleSubmit}
      onCancel={handleClose}
      okText="Update Data"
    >
      <div className="my-7 flex flex-col gap-7">
        <Form form={form} layout="vertical" className="!space-y-8">
          <Form.Item
            name="dateRange"
            rules={[{ required: true, message: "Please Select date range!" }]}
          >
            <RangePicker
              label="Select custom range"
              format="YYYY-MM-DD"
              allowClear
              defaultPickerValue={[
                dayjs(validFromDate, "YYYY-MM-DD"),
                dayjs(validToDate, "YYYY-MM-DD"),
              ]}
              disabledDate={(current) =>
                current &&
                (current.isBefore(validFromDate, "day") ||
                  current.isAfter(validToDate, "day"))
              }
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CustomRangeModal;
