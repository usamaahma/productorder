import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

function Home() {
  const dispatch = useDispatch();
  const { c } = useSelector((state) => state.custom);

  const addbtn = () => {
    dispatch({
      type: "increment",
    });
  };
  const addby55btn = () => {
    dispatch({
      type: "incrementByVal",
      payload: 55,
    });
  };
  const decbtn = () => {
    dispatch({
      type: "decrement",
    });
  };

  return (
    <div>
      <h5>{c}</h5>
      <Button onClick={addbtn}>increment</Button>
      <Button onClick={addby55btn}>incrementByVal</Button>
      <Button onClick={decbtn}>decrement</Button>
    </div>
  );
}

export default Home;
