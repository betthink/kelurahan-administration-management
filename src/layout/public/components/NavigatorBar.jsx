import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../../app/feature/user/userSlice";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, message, Avatar, Space, Button, } from "antd";
import { PiBookThin } from "react-icons/pi";
export default function NavigatorBar() {
  const user = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    message.info("Anda sudah log out");
    navigate("/");
  };
  const items = [
    // {
    //   key: "1",
    //   label: <span>Profile</span>,
    // },
    {
      key: "2",
      // danger: true,
      label: <Link to="/Informasi-iuran">Riwayat pembayaran</Link>,
    },
    {
      key: "3",
      // danger: true,
      label: <Link to="/Homepage/Permohonan-Surat">Permohonan surat</Link>,
    },
    {
      key: "5",
      label: <Link to="/List-surat">Lihat surat</Link>,
    },
    {
      key: "4",
      danger: true,
      label: <button className="w-full " onClick={handleLogout}>Log out</button>,
    },
  ];
  return (
    <nav className="w-full  bg-green-600 text-white  flex overflow-hidden">
      <ul className="flex justify-between w-full text-sm  px-2 md:px-40 py-3">
        <li className="flex space-x-10 pt-3">
          <div className="flex gap-2 items-center ">
            <PiBookThin className="text-secondary" size={30} />
            <span className="text-secondary font-bold text-3xl ">Kelurahan</span>
          </div>
        </li>
        <li>
          <div className="flex  items-center justify-center gap-6 cursor-pointer">
            <Dropdown trigger={["click"]} menu={{ items }}>
              <Button className="w-full flex justify-between items-center border-none" onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar className="bg-white   align-middle" size="large">
                    <UserOutlined
                      className="text-green-600"
                      style={{ fontSize: "1.2rem" }}
                    />
                  </Avatar>
                  <span className="text-white">{user.username}</span>
                </Space>
              </Button>
            </Dropdown>
          </div>
        </li>
      </ul>
    </nav>
  );
}
