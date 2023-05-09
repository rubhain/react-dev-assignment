import React, { useState } from "react";
import { Row } from "antd";
import "../../../App.css";
import Login from "../../../components/Login";
import Register from "../../../components/Register";
import { Switch } from "antd";

const LogReg: React.FC = () => {
  const [checked, setChecked] = useState(true);

  const onChange = (checked: boolean) => {
    setChecked(!checked);
    console.log(checked);
  };
  return (
    <div>
      <Switch
        checkedChildren="Register"
        unCheckedChildren="LogIn"
        onChange={onChange}
      />
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        {checked === true ? <Login /> : <Register />}
      </Row>
    </div>
  );
};

export default LogReg;
