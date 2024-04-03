import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../../app/feature/user/userSlice";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, message, Avatar, Space, Button, Modal, Card } from "antd";
import { PiBookThin } from "react-icons/pi";
import ButtonGroup from "antd/es/button/button-group";
export default function NavigatorBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // modal profile
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const user = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    message.info("Anda sudah log out");
    navigate("/");
  };
  const items = [
    {
      key: "1",
      label: <button onClick={showModal}>Profile</button>,
    },
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
      label: (
        <button className="w-full " onClick={handleLogout}>
          Log out
        </button>
      ),
    },
  ];
  const data = user?.data;
  // console.log(user);
  return (
    <React.Fragment>
      <Modal
        // title="Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="pt-12 max-w-sm mx-auto w-full bg-white dark:bg-green-800 rounded-lg overflow-hidden shadow-lg">
          <div className="border-b px-4 pb-6 flex flex-col justify-center items-center">
            <div className="text-center my-4">
              <Avatar size="large" icon={<UserOutlined />} />
              <div className="py-2">
                <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                  {user?.username}
                </h3>
                <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      className=""
                      d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    />
                  </svg>
                  {data.alamat}
                </div>
              </div>
            </div>
            <Card
              title="Data user"
              extra={<Link to="">Detail</Link>}
              style={{
                width: 300,
              }}
            >
              <div className="grid grid-cols-2">
                <p>NIK</p>
                <p className="text-green-600">{data?.nik}</p>
                <p>Nomor KK</p>
                <p className="text-green-600">{data?.no_kk}</p>
                <p>Nomor Telpon</p>
                <p className="text-green-600">{data?.nomor_telp}</p>
              </div>
            </Card>
            <div className="flex gap-2 px-2 pt-5 w-full">
              <Link
                state={{ data }}
                to={"/Profile"}
                className="w-full bg-green-600 text-white p-2 rounded-md flex items-center justify-center"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      <nav className="w-full  bg-green-600 text-white  flex overflow-hidden">
        <ul className="flex justify-between w-full text-sm  px-2 md:px-40 py-3">
          <li className="flex space-x-10 pt-3">
            <div className="flex gap-2 items-center ">
              <PiBookThin className="text-secondary" size={30} />
              <span className="text-secondary font-bold text-3xl ">
                Kelurahan
              </span>
            </div>
          </li>
          <li>
            <div className="flex  items-center justify-center gap-6 cursor-pointer">
              <Dropdown trigger={["click"]} menu={{ items }}>
                <Button
                  className="w-full flex justify-between items-center border-none"
                  onClick={(e) => e.preventDefault()}
                >
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
    </React.Fragment>
  );
}
