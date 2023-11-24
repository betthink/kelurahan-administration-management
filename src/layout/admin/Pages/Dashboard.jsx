import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../app/feature/user/userSlice";
import { useNavigate } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Space } from "antd";
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Penduduk Tetap", "Penduduk Sementara", "Yellow"],
  datasets: [
    {
      label: "Populasi warga ",
      data: [12, 19, 3],

      backgroundColor: ["#59ADEF", "#FF9296", "#78D8CF"],
      borderColor: ["#1677FF", "#FE7C96", "#1BCFB4"],
      borderWidth: 2,
    },
  ],
};

const Dashboard = () => {
  const user = useSelector((state) => state.userReducer.value);

  const cardData = [
    {
      icon: <IoIosPeople size={28} />,
      bgColor: "bg-gradient-to-r from-primary_blue to-blue-400",
      text: "Total Warga",
    },
    {
      icon: <IoIosPeople size={28} />,
      bgColor: "bg-gradient-to-r from-primary_pink to-pink-400",
      text: "Jumlah Warga Tetap",
    },
    {
      icon: <IoIosPeople size={28} />,
      bgColor: "bg-gradient-to-r from-primary_green to-cyan-400",
      text: "Jumlah Warga Tidak Tetap",
    },
  ];

  return (
    <section className=" m-6 gap-6 flex flex-col">
      <div className="flex gap-4 items-center ">
        <div className=" bg-third p-3 rounded-sm  text-secondary ">
          <MdHome size={18} />
        </div>
        <span className="font-semibold  tracking-wider text-lg">Dashboard</span>
      </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4  md:h-56 lg:h-56 text-secondary">
          {cardData.map((item, i) => (
            <div
              key={i}
              className={`${item.bgColor} rounded-md p-8 text-lg capitalize flex justify-between `}
            >
              <p className="max-w-[10rem]"> {item.text} </p>
              {item.icon}
            </div>
          ))}
        </div>
        <div className="flex md:justify-between lg:justify-between flex-col  md:flex-row lg:flex-row  gap-3">
          <div className="bg-white w-full h-60  "></div>
          <div className="bg-white  flex justify-center items-center w-full md:w-1/2 h-80 rounded-md   ">
            <Pie data={data} />
          </div>
        </div>
    </section>
  );
};

export default Dashboard;
