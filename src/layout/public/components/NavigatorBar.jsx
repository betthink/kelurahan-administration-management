import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../app/feature/user/userSlice";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
export default function NavigatorBar() {
  const user = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();
  const [openBar, setopenBar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    message.info("Anda sudah log out");
  };
  return (
    <nav className="w-full  bg-blusky flex">
      <ul className="flex justify-between w-full px-20 py-5">
        <li className="flex space-x-20">
          <div>Logo</div>
          <div className="flex space-x-10">
            <div>Iuran</div>
            <div>Permohonan surat</div>
          </div>
        </li>

        <li>
          <div className="flex  items-center justify-center gap-6">
            <span>WELCOM {user.username}</span>
            <Button
              className="border-none text-white"
              onClick={() => setopenBar(!openBar)}
            >
              <UserOutlined size={24} />
            </Button>
          </div>
          {openBar && (
            <span
              onClick={handleLogout}
              className="absolute right-20 top-16 rounded-lg px-3 bg-slate-600 text-white cursor-pointer hover:text-blue-200"
            >
              Log out
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
