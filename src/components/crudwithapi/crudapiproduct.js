import { Button, Input, message, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { products } from "../../config/axios";

function Crudapiproduct() {
  const [data, setdata] = useState([]);
  const [gettting, setgettting] = useState([
    { name: "", description: "", category: "", brand: "" },
  ]);
  const [idd, setidd] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const showModal = (id, name, description, category, brand) => {
    const dataaaaa = {
      name: name,
      description: description,
      category: category,
      brand: brand,
    };
    setgettting(dataaaaa);
    setidd(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleadd = () => {
    const data1 = {
      name,
      description,
      category,
      brand,
    };

    products({
      method: "post",
      data: data1,
    })
      .then((res) => {
        setrefresh(!refresh);
        message.success("product added");
        console.log(res);
      })
      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };
  const getdata = () => {
    products({
      method: "get",
    })
      .then((res) => {
        setdata(res.data.results);
        console.log(res.data);
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };
  const handleupdate = () => {
    setIsModalOpen(false);
    const updated = { name, description, category, brand };
    products(`/${idd}`, {
      method: "patch",
      data: updated,
    })
      .then((res) => {
        setrefresh(!refresh);
        message.success("product edited");
        console.log(res);
      })
      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };
  const handledelete = (_id) => {
    products(`/${_id}`, {
      method: "delete",
    })
      .then((res) => {
        setrefresh(!refresh);

        message.success("product deleted");
        console.log(res);
      })

      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };

  useEffect(() => {
    getdata();
  }, [refresh]);

  return (
    <div>
      <Input
        type="text"
        onChange={(event) => setName(event.target.value)}
        placeholder="add name"
      />
      <Input
        type="text"
        placeholder="add description"
        onChange={(event) => setDescription(event.target.value)}
      />
      <Input
        type="text"
        placeholder="add category"
        onChange={(event) => setCategory(event.target.value)}
      />
      <Input
        type="text"
        placeholder="add brand"
        onChange={(event) => setBrand(event.target.value)}
      />
      <Button onClick={handleadd}>Add a product name</Button>
      <Modal
        title="Basic Modal"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          type="text"
          value={gettting.name}
          onChange={(event) => setName(event.target.value)}
          placeholder="edit name"
        />
        <Input
          type="text"
          value={gettting.description}
          placeholder="edit description"
          onChange={(event) => setDescription(event.target.value)}
        />
        <Input
          type="text"
          value={gettting.category}
          placeholder="edit category"
          onChange={(event) => setCategory(event.target.value)}
        />
        <Input
          type="text"
          value={gettting.brand}
          placeholder="edit brand"
          onChange={(event) => setBrand(event.target.value)}
        />
        <Button onClick={() => handleupdate(idd)}>Update</Button>
      </Modal>
      {data &&
        data.map((val) => {
          const { v4: uuidv4 } = require("uuid");
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              key={uuidv4()}
            >
              <h3>
                name:{val?.name} <br />
              </h3>
              <h3>
                description:{val?.description} <br />
              </h3>{" "}
              <h3>
                category:{val?.category} <br />
              </h3>{" "}
              <h3>
                brand:{val?.brand} <br />
              </h3>
              <Button onClick={() => handledelete(val.id)}>delete</Button>{" "}
              <Button
                type="primary"
                onClick={() =>
                  showModal(
                    val.id,
                    val.name,
                    val.description,
                    val.category,
                    val.brand
                  )
                }
              >
                edit
              </Button>{" "}
            </div>
          );
        })}{" "}
    </div>
  );
}

export default Crudapiproduct;
