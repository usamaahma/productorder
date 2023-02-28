import React, { useState } from "react";
import "./calculator.css";
import { Input } from "antd";

function Calculator() {
  const [result, setresult] = useState("");

  const onclickhandler = (e) => {
    setresult(result.concat(e.target.value));
  };
  const onremove = () => {
    setresult("");
  };
  const abc = () => {
    setresult(eval(result));
    console.log(setresult);
  };
  const modulus = () => {
    let x = result / 100;
    setresult(x);
    console.log(x);
  };

  return (
    <div>
      <Input className="first" placeholder="0" value={result} />
      <div className="second">
        <Input
          type="button"
          className="input1"
          value={"AC"}
          onClick={onremove}
        />
        <Input type="button" className="input1" value={"+/-"} />
        <Input type="button" className="input1" value={"%"} onClick={modulus} />
        <Input
          type="button"
          className="orange"
          value={"/"}
          onClick={onclickhandler}
        />
      </div>
      <div className="second">
        <Input
          type="button"
          className="input1"
          value={"7"}
          onClick={onclickhandler}
        />
        <Input
          type="button"
          className="input1"
          value={"8"}
          onClick={onclickhandler}
        />
        <Input
          type="button"
          className="input1"
          value={"9"}
          onClick={onclickhandler}
        />
        <Input
          type="button"
          className="orange"
          value={"*"}
          onClick={onclickhandler}
        />
      </div>
      <div className="second">
        <Input
          className="input1"
          type="button"
          value={"4"}
          onClick={onclickhandler}
        />
        <Input
          className="input1"
          type="button"
          value={"5"}
          onClick={onclickhandler}
        />
        <Input
          className="input1"
          value={"6"}
          type="button"
          onClick={onclickhandler}
        />
        <Input
          className="orange"
          value={"-"}
          type="button"
          onClick={onclickhandler}
        />
      </div>
      <div className="second">
        <Input
          className="input1"
          value={"1"}
          type="button"
          onClick={onclickhandler}
        />
        <Input
          className="input1"
          value={"2"}
          type="button"
          onClick={onclickhandler}
        />
        <Input
          className="input1"
          value={"3"}
          type="button"
          onClick={onclickhandler}
        />
        <Input
          className="orange"
          value={"+"}
          type="button"
          onClick={onclickhandler}
        />
      </div>
      <div className="second">
        <Input
          className="zero"
          value={"0"}
          type="button"
          onClick={onclickhandler}
        />
        <Input
          className="input1"
          value={"."}
          type="button"
          onClick={onclickhandler}
        />
        <Input className="orange" value={"="} type="button" onClick={abc} />
      </div>
    </div>
  );
}

export default Calculator;
