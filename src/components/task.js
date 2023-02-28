import React, { useState } from "react";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Input } from "antd";

export default function Task() {
  const { v4: uuidv4 } = require("uuid");
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  const addTask = () => {
    if (newTask) {
      let num = uuidv4();
      let newEntry = { id: num, title: newTask, status: false };
      if (newEntry.title.length === 0) {
        return null;
      }
      setToDo([...toDo, newEntry]);
      console.log(newEntry);
      setNewTask("");
    }
  };
  const deleteTask = (id) => {
    let newTasks = toDo.filter((t) => t.id !== id);
    console.log(newTasks);
    setToDo(newTasks);
  };

  const updateTask = () => {
    let filterRecords = [...toDo].filter((t) => t.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    if (updateData.title.length === 0) {
      return null;
    }
    setToDo(updatedObject);
    setUpdateData("");
  };
  const cancelUpdate = () => {
    setUpdateData("");
  };
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };
  return (
    <div className="prac">
      <br />
      <br />
      <h3>Add,Update,Delete</h3>
      <br />
      <br />
      <div className="dis">
        {" "}
        <Input
          width={"20 px"}
          placeholder=""
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="taskbut" onClick={addTask}>
          Add Task
        </button>{" "}
      </div>
      <br />
      <br />
      <div className="dis">
        <Input
          width={"20 px"}
          placeholder=""
          value={updateData && updateData.title}
          onChange={(e) => changeTask(e)}
        />
        <button className="taskbut" onClick={updateTask}>
          Update
        </button>
        <button className="taskbut5" onClick={cancelUpdate}>
          cancel
        </button>
      </div>
      <br />
      <br />
      {toDo && toDo.length ? "" : "No tasks"}
      {toDo &&
        toDo.map((t, index) => {
          return (
            <div key={index}>
              <div className="taskBg">
                <div>
                  <h3 className="taskNumber">{index + 1} &nbsp;</h3>
                  <span className="taskText">{t.title}</span>
                </div>
                <div className="flexxx">
                  {t.status ? null : (
                    <span
                      title="edit"
                      onClick={() => {
                        setUpdateData({
                          id: t.id,
                          title: t.title,
                          status: t.status ? true : false,
                        });
                      }}
                    >
                      <EditFilled />
                    </span>
                  )}

                  <span title="delete">
                    <DeleteFilled onClick={() => deleteTask(t.id)} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
