import { React, useState, useEffect } from "react";
import { order } from "../../config/axios";
import { Button, message, Spin } from "antd";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [refresh, setrefresh] = useState(false);
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.user);

  const deleteOrder = (emp) => {
    setLoading(true);
    order(`/${emp.id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        message.success("order deleted!");
        setrefresh(!refresh);
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        message.error(errorMessage);
        localStorage.removeItem("token");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getorders = () => {
    setLoading(true);
    order({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

  useEffect(() => {
    getorders();
  }, [refresh]);

  return (
    <div>
      <h1>Total Orders</h1>
      {loading ? (
        <Spin />
      ) : (
        data.map((emp, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <h5>{index + 1})</h5>
            <h5>{emp.totalItems}</h5>
            <p>{emp.totalPrice}</p>
            <Button onClick={() => deleteOrder(emp)}>Delete Order</Button>
          </div>
        ))
      )}
      <Link to="/products">
        <Button>Back to Products</Button>
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

export default Orders;
