import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Modal, Spin } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { products } from "../../config/axios";
import { order } from "../../config/axios";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { deleteItem } from "../../redux/cartSlice";
import { removecart } from "../../redux/cartSlice";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { totalprice, cart, totalitems } = useSelector((state) => state.custom);
  const { userId } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const deletecart = (row) => {
    dispatch(deleteItem(row));
  };
  const createorder = () => {
    const data = {
      totalItems: Number(totalitems),
      totalPrice: Number(totalprice),
      createdBy: userId,
      cartItems: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
    order({
      method: "post",
      data: data,
    })
      .then((res) => {
        console.log(cart);
        dispatch(removecart());
        setrefresh(!refresh);
        setIsModalOpen(false);
        message.success("order placed");
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        message.error(errorMessage);
        return <div>{errorMessage}</div>;
      });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCart = (row) => {
    dispatch(addItem(row));
  };
  const onFinish = (values) => {
    products({
      method: "post",
      data: values,
    })
      .then((res) => {
        setrefresh(!refresh);
        message.success("product added");
        console.log(
          data,
          "These are all products coming from react data tables"
        );
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        message.error(errorMessage);
        return <div>{errorMessage}</div>;
      });
  };
  const onFinishFailed = (errorInfo) => {};
  const handleDelete = (id) => {
    products(`/${id}`, {
      method: "delete",
    })
      .then((res) => {
        message.success("product deleted");
        setrefresh(!refresh);
      })
      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };
  const getdata = () => {
    setLoading(true);

    products({
      method: "get",
    })
      .then((res) => {
        setdata(res.data.results);
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteall = () => {
    products({
      method: "delete",
    })
      .then((res) => {
        message.success("All products deleted");
        setdata([]);
        setrefresh(!refresh);
      })
      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };
  useEffect(() => {
    getdata();
  }, [refresh]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Delete",
      cell: (row) => {
        return (
          <DeleteOutlined
            style={{ color: "red", fontSize: "16 px" }}
            onClick={() => handleDelete(row.id)}
          />
        );
      },
    },
    {
      name: "Cart",
      cell: (row) => {
        return (
          <ShoppingCartOutlined
            style={{ color: "blue", fontSize: "16 px" }}
            onClick={() => handleCart(row)}
          />
        );
      },
    },
  ];

  return (
    <div>
      {" "}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1000,
          marginTop: "2rem",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please Enter your product name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please Enter your product Price",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please Enter your product Description",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please Enter Category of your Product",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Brand"
          name="brand"
          rules={[
            {
              required: true,
              message: "Please Enter Brand of your Product",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
            gap: 2,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            style={{ marginLeft: "2rem" }}
            type="primary"
            onClick={deleteall}
          >
            Delete All
          </Button>

          <ShoppingCartOutlined
            style={{
              marginLeft: "2rem",
              fontSize: "1.5rem",
            }}
            type="primary"
            onClick={showModal}
          />
        </Form.Item>
      </Form>
      <DataTable columns={columns} data={data} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h5>
          Total Items = {totalitems}
          <br />
        </h5>
        <h5>
          Total Price = {totalprice}
          <br />
        </h5>
        Cart =
        {loading ? (
          <Spin />
        ) : (
          cart.map((emp, index) => (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <h5>{index + 1})</h5>
              <h5>{emp.name}</h5>
              <p>{emp.price}</p>
              <Button onClick={() => deletecart(emp)}>-</Button>
              <p>{emp.quantity}</p>
              <Button onClick={() => handleCart(emp)}>+</Button>
            </div>
          ))
        )}
        <br />
        <Button onClick={() => createorder(cart)}>Order</Button>
      </Modal>
      <Link to="/orders">
        <Button>Proceed to Orders</Button>
      </Link>
      <Button
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Products;
