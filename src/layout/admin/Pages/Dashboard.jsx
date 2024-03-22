import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosPeople } from "react-icons/io";
import { MdHome } from "react-icons/md";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { axiosInstance } from "../../../utils/axiosInstance";
import { formatUmur } from "../../../utils/formatUmur";
// import { faker } from "@faker-js/faker";
ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      // text: "Chart.js Bar Chart",
    },
  },
};
const Dashboard = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const user = useSelector((state) => state.userReducer.value);
  const [dataPenduduk, setdataPenduduk] = useState([]);
  async function handleGetDataPenduduk() {
    const url =
      user.role === "admin"
        ? `/administrasikelurahan/src/api/fetchDataPendudukByRT.php?rt=${user.rt}&rw=${user.rw}`
        : `/administrasikelurahan/src/api/fetchDataPenduduk.php`;
    try {
      const response = await axiosInstance.get(url);
      setdataPenduduk(
        response.data.map((item, index) => {
          return { ...item, key: index.toString() };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
  const pendudukTetap = dataPenduduk.filter(
    (penduduk) => penduduk.status_tinggal === "Tetap"
  );
  const pendudukSementara = dataPenduduk.filter(
    (penduduk) => penduduk.status_tinggal === "Sementara"
  );
  const pendudukDikelompokkan = dataPenduduk?.map((penduduk) => {
    const umur = formatUmur(penduduk.tanggal_lahir);

    if (umur > 60) {
      penduduk.kelompok = "Lansia";
    } else if (umur < 5) {
      penduduk.kelompok = "Balita";
    } else {
      penduduk.kelompok = "Dewasa";
    }
    return penduduk;
  });

  // Menampilkan hasil kelompok
  const pendudukLansia = pendudukDikelompokkan.filter(
    (penduduk) => penduduk.kelompok === "Lansia"
  );
  const pendudukDewasa = pendudukDikelompokkan.filter(
    (penduduk) => penduduk.kelompok === "Dewasa"
  );
  const pendudukBalita = pendudukDikelompokkan.filter(
    (penduduk) => penduduk.kelompok === "Balita"
  );
  const data = {
    labels: ["Tetap", "Sementara"],
    datasets: [
      {
        label: "Populasi warga by status tinggal ",
        data: [pendudukTetap.length, pendudukSementara.length],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "#0891b2"],
      },
    ],
  };

  const dataUmur = {
    labels: [
   
      "Lansia",
      "Dewasa",
      "Balita",
    ],
    datasets: [
      {
        label: "Populasi warga by usia ",
        data: [
        
          pendudukLansia.length,
          pendudukDewasa.length,
          pendudukBalita.length,
        ],
        backgroundColor: [
          "#14b8a6",
          "#c084fc",
          "#FF90BC",
        ],
      },
    ],
  };
  const dataPieUsia = {
    labels: ["Lansia", "Dewasa", "Balita"],
    datasets: [
      {
        label: "Populasi warga by usia ",
        data: [
          pendudukLansia.length,
          pendudukDewasa.length,
          pendudukBalita.length,
        ],
        backgroundColor: ["#14b8a6", "#c084fc", "#FF90BC"],
      },
    ],
  };
  const cardData = [
    {
      icon: <IoIosPeople size={28} />,
      bgColor: "bg-gradient-to-r from-primary_blue to-blue-400",
      text: `Total Warga`,
      total: `${dataPenduduk.length}`,
    },
    {
      icon: <IoIosPeople size={28} />,
      bgColor: "bg-gradient-to-r from-primary_pink to-pink-400",
      text: `Jumlah Warga Tetap`,
      total: `${pendudukTetap.length}`,
    },

    {
      icon: <IoIosPeople size={28} />,
      bgColor: "bg-[#0891b2]",
      text: "    Jumlah Warga Tinggal Sementara",
      total: `${pendudukSementara.length}`,
    },
    {
      icon: <IoIosPeople size={28} />,
      bgColor: "bg-gradient-to-r from-teal-400 to-teal-500",
      text: `Jumlah penduduk lansia `,
      total: `${pendudukLansia.length}`,
    },
    {
      icon: <IoIosPeople size={28} />,
      bgColor: "bg-gradient-to-r from-purple-400 to-purple-400",
      text: "Jumlah penduduk dewasa",
      total: `${pendudukDewasa.length}`,
    },
    {
      icon: <IoIosPeople size={28} />,
      bgColor: "bg-[#FF90BC]",
      text: " Jumlah penduduk balita",
      total: `${pendudukBalita.length}`,
    },
  ];

  useEffect(() => {
    handleGetDataPenduduk();
  }, []);
  return (
    <section className="mx-20 m-6 gap-6 flex flex-col  overflow-x-hidden ">
      <div className="flex gap-4 items-center ">
        <div className=" bg-third p-3 rounded-sm   text-secondary ">
          <MdHome size={18} />
        </div>
        <span className="font-semibold  tracking-wider text-lg">Dashboard</span>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4  md:h-56 lg:h-56 text-secondary">
        {cardData.map((item, i) => (
          <div
            key={i}
            className={`${item.bgColor}  rounded-md p-6 text-sm  uppercase grid grid-cols-2 justify-between `}
          >
            <p className="max-w-[10rem]"> {item.text} </p>
            <span>{item.icon}</span>
            <p>{item.total}</p>
          </div>
        ))}
      </div>
        {/* status tinggal */}
        <div className=" grid grid-cols-3 mt-6   gap-3 w-full ">
          <div className="bg-white  w-full  col-span-2 ">
            <Bar options={options} data={data} />
          </div>
          <div className="bg-white  flex justify-center items-center w-full h-full rounded-md col-span-1">
            <Pie data={data} />
          </div>
        </div>
        {/* usia */}
        <div className=" grid grid-cols-3 gap-3 w-full ">
          <div className="bg-white  w-full  col-span-2 ">
            <Bar options={options} data={dataUmur} />
          </div>
          <div className="bg-white  flex justify-center items-center w-full h-full rounded-md col-span-1">
            <Pie data={dataPieUsia} />
          </div>
      </div>
    </section>
  );
};

export default Dashboard;
