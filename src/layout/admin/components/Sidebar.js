import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="bg-blue-500 text-white flex flex-col">
      <div className="">
        <Link to="/dashboard">Kelola Data Penduduk</Link>
      </div>
      <div className="">
        <Link to="/dashboard">Kelola IPL</Link>
      </div>
      <div className="">
        <Link to="/dashboard">Kelola Surat</Link>
      </div>
      <div className="">
        <Link to="/dashboard">Kelola Posyandu</Link>
      </div>
    </div>
  );
}

export default Sidebar;
