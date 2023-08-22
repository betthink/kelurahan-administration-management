import { theme } from "antd";
const {
  token: { colorBgContainer },
} = theme.useToken();
const contentLayout = {
  padding: 24,
  minHeight: 460,
  background: colorBgContainer,
};
export { contentLayout };
