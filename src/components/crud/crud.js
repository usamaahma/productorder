import { Button } from "antd";
import React, { useState, useEffect } from "react";

function Crud() {
  const [temp, settemp] = useState("");
  const [update, setupdate] = useState([]);

  const handleadd = () => {
    const { v4: uuidv4 } = require("uuid");
    console.log(temp);
    if (temp) {
      console.log(temp);
      let newVal = { id: uuidv4(), name: temp };
      setval([...val, newVal]);
      settemp("");
      localStorage.setItem("data", JSON.stringify([...val, newVal]));
    }
  };

  const handleedit = (e) => {
    let updated = { id: update.id, name: e.target.value };
    setupdate(updated);
  };
  const handleupdate = () => {
    let newarr = [...val].filter((t) => t.id !== update.id);
    let updateddata = [...newarr, update];
    setval(updateddata);
    localStorage.setItem("data", JSON.stringify([...newarr, update]));
    setupdate("");
  };

  const handledelete = (id) => {
    let newarr = val.filter((t) => t.id !== id);
    setval(newarr);
    localStorage.setItem("data", JSON.stringify(newarr));
  };
  const handledeleteall = () => {
    setval([]);
  };

  const abcd = () => {
    let list = localStorage.getItem("data");
    if (list) {
      console.log(JSON.parse(list));
      return JSON.parse(localStorage.getItem("data"));
    } else {
      return [];
    }
  };
  const [val, setval] = useState(abcd());

  useEffect(() => {
    // localStorage.setItem("data", JSON.stringify(val));
  }, [val]);

  return (
    <div>
      <input
        type="text"
        value={temp}
        onChange={(e) => {
          settemp(e.target.value);
        }}
      ></input>
      <Button onClick={handleadd}>Add</Button>
      <Button onClick={handledeleteall}>delete all</Button>
      <br />
      <input
        type="text"
        value={update && update.name}
        onChange={(e) => {
          handleedit(e);
        }}
      ></input>
      <Button onClick={handleupdate}>update</Button>
      <br />
      {val && val.length ? "" : "No Entries"}
      {val &&
        val.map((t) => {
          const { v4: uuidv4 } = require("uuid");
          return (
            <div
              key={uuidv4()}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h3>name:{t.name}</h3>
              <button
                onClick={() => {
                  handledelete(t.id);
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  setupdate({ id: t.id, name: t.name });
                }}
              >
                edit
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Crud;
