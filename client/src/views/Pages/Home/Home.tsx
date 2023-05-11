import { List } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataType } from "../Companies/Companies";
import { fetchCompanies } from "../../../storage/companiesSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const data: DataType[] = useSelector(
    (state: any) => state.companies
  ).companies;
  const listSource = data.map((item: DataType) => item.companyName);

  return (
    <div>
      {" "}
      <List
        size="large"
        header={<h1>Latest Added Companies</h1>}
        footer={
          <div>{`There are "${listSource.length}" companies in the system.`}</div>
        }
        bordered
        dataSource={listSource.reverse().slice(0, 3)}
        renderItem={(item: any) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}

export default Home;
