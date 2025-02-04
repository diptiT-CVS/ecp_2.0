import React from "react";
import Routes from "./routes";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import "./App.css";

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#666CFF",
          fontFamily: "Inter"
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <Routes />
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
