import React from "react";
import { Button, Form, Input } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
function Orders() {
  return (
    <div>
      {" "}
      <div
        style={{
          marginTop: "5rem",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ display: "flex", justifyContent: "center" }}
            label="Enter order"
            name="Enter order"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="enter amount"
            name="amount"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            label="cat . black or white"
            name="category"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Input />
          </Form.Item>{" "}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Orders;
