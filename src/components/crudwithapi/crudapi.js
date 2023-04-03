import React, { useState, useEffect } from "react";
import { users } from "../../config/axios";
import { message, Input } from "antd";
import { Button, Modal } from "antd";

function Crudapi() {
  const [data, setdata] = useState([]);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [updatename, setupdatename] = useState("");
  const [updateemail, setupdateemail] = useState("");
  const [updatepassword, setupdatepassword] = useState("");
  const [updateItemId, setUpdateItemId] = useState("");

  const addkro = () => {
    const data5 = {
      role: "user",
      email: email,
      name: name,
      password: password,
    };
    users({
      method: "post",
      data: data5,
    })
      .then(() => {
        message.success("Name added");
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };
  const updatekro = () => {
    const updateddata = {
      name: updatename,
      email: updateemail,
      password: updatepassword,
    };
    users(`/${updateItemId}`, {
      method: "patch",
      data: updateddata,
    })
      .then((res) => {
        console.log(res);
        message.success("data edited");
        gettingdata();
      })
      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };

  const deletekro = (_id) => {
    users(`/${_id}`, {
      method: "delete",
    })
      .then((res) => {
        console.log(res);
        message.success("entry deleted");
      })
      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };

  const gettingdata = (val) => {
    users({
      method: "get",
    })
      .then((res) => {
        setdata(res.data.results);
        console.log(res);
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };

  useEffect(() => {
    gettingdata();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setUpdateItemId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        <Input
          onChange={(e) => {
            setname(e.target.value);
          }}
          placeholder="add names"
        />
        <Input
          onChange={(e) => {
            setemail(e.target.value);
          }}
          placeholder="add email"
        />
        <Input
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          placeholder="add password"
        />

        <button onClick={addkro}>add</button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            placeholder="update name"
            onChange={(e) => setupdatename(e.target.value)}
          />
          <Input
            placeholder="update email"
            onChange={(e) => setupdateemail(e.target.value)}
          />

          <Input
            placeholder="update password"
            onChange={(e) => setupdatepassword(e.target.value)}
          />
          <button placeholder="update" onClick={() => updatekro(updateItemId)}>
            update{" "}
          </button>
        </Modal>

        {data &&
          data.map((val) => {
            const { v4: uuidv4 } = require("uuid");

            return (
              <div
                style={{ display: "block", justifyContent: "center" }}
                key={uuidv4()}
              >
                <h3>
                  name:{val.name} <br />
                </h3>
                <h3>email:{val.email}</h3>

                <button onClick={() => deletekro(val.id)}>delete</button>
                <Button type="primary" onClick={() => showModal(val.id)}>
                  edit
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Crudapi;
