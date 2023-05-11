import React from "react";
import {
  HomeOutlined,
  ProfileOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import Companies from "./Companies/Companies";
import Products from "./Products/Products";

const { Header, Content, Footer, Sider } = Layout;

const Main: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["3"]}>
          <Menu.Item
            key={0}
            onClick={() => {
              navigate("/main/");
            }}
            icon={React.createElement(HomeOutlined)}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key={1}
            onClick={() => {
              navigate("/main/companies");
            }}
            icon={React.createElement(ProfileOutlined)}
          >
            Companies
          </Menu.Item>
          <Menu.Item
            key={2}
            onClick={() => {
              navigate("/main/products");
            }}
            icon={React.createElement(TableOutlined)}
          >
            Products
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <h1>HEADER</h1>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/companies" element={<Companies />}></Route>
              <Route path="/products" element={<Products />}></Route>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
