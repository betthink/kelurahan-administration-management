import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../app/feature/user/userSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <div className="flex h-1/2 justify-center flex-col items-center relative">
      <h1 className="text-2xl">Welcome {user?.username} </h1>
      <h3 className="text-xl">nik : {user?.nik}</h3>
      <h3 className="text-xl">Role : {user?.role}</h3>
      <button
        className="p-3 bg-blusky rounded-lg absolute top-5 right-5 text-white text-lg"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
