import {
  Breadcrumb,
  Button,
  Modal,
  Form,
  Input,
  message as mes,
  Table,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { useSelector } from "react-redux";
import { MdAttachMoney } from "react-icons/md";
import { formatAngka } from "../../../../utils/formatAngkaUang";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { monthsData } from "../../utils/monthData";
import moment from "moment";

export default function LaporanKeuangan() {
  const { Column, ColumnGroup } = Table;
  const tableRef = useRef(null);
  const [dataPemasukan, setDataPemasukan] = useState(0);
  const [dataPengeluaran, setDataPengeluaran] = useState(0);
  const [dataRiwayatTransaksi, setDataRiwayatTransaksi] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredPemasukan, setFilteredPemasukan] = useState(0);
  const [filteredPengeluaran, setFilteredPengeluaran] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userReducer.value);
  const location = useLocation();
  const dataLoc = location.state;
  const rt = user.rt === "" ? dataLoc.rt : user.rt;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleGetPemasukan = async () => {
    const url = `/administrasikelurahan/src/api/ipl/total-pemasukan-keuangan-by-rt.php?rt=${rt}`;
    try {
      const response = await axiosInstance.get(url);
      const data = response.data[0].total_jumlah_pembayaran || 0;
      if (response.status === 200) {
        setDataPemasukan(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetPengeluaran = async () => {
    const url = `/administrasikelurahan/src/api/ipl/total-pengeluaran-keuangan-by-rt.php?rt=${rt}`;
    try {
      const response = await axiosInstance.get(url);
      const data = response.data[0].total_jumlah_pengeluaran || 0;
      if (response.status === 200) {
        setDataPengeluaran(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalSisa = formatAngka(dataPemasukan - dataPengeluaran);
  const totalPemasukan = formatAngka(dataPemasukan);
  const totalPengeluaran = formatAngka(dataPengeluaran);

  const calculateFilteredTotals = (data) => {
    const pemasukan = data
      .filter((item) => item.jenis_transaksi === "pemasukan")
      .reduce((acc, item) => acc + parseFloat(item.jumlah_transaksi), 0);
    const pengeluaran = data
      .filter((item) => item.jenis_transaksi === "pengeluaran")
      .reduce((acc, item) => acc + parseFloat(item.jumlah_transaksi), 0);
    return {
      pemasukan,
      pengeluaran,
      sisa: pemasukan - pengeluaran,
    };
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const cardData = [
    {
      icon: <MdAttachMoney size={28} />,
      bgColor: "bg-gradient-to-l from-green-300 to-green-400",
      text: (
        <span>
          Total pemasukan Rp.
          {totalPemasukan}
        </span>
      ),
    },
    {
      icon: <MdAttachMoney size={28} />,
      bgColor: "bg-gradient-to-l from-red-500 to-red-400",
      text: (
        <span>
          Total pengeluaran Rp.
          {totalPengeluaran}
        </span>
      ),
    },
    {
      icon: <MdAttachMoney size={28} />,
      bgColor: "bg-gradient-to-r from-primary_blue to-cyan-400",
      text: (
        <span>
          Sisa Keuangan Rp.
          {totalSisa}
        </span>
      ),
    },
  ];

  const handleKirimPengeluaran = async (v) => {
    const url =
      "/administrasikelurahan/src/post/ipl/tambah-transaksi-pengeluaran.php";
    try {
      const response = await axiosWithMultipart({
        method: "post",
        data: {
          verifikator: user.username,
          rt: user.rt,
          jumlah_transaksi: v.jumlah_transaksi,
        },
        url,
      });
      const data = response.data;
      const { value, message } = data;
      if (value === 1) {
        mes.success(message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueYears = [
    ...new Set(
      dataRiwayatTransaksi.map((item) => item.waktu_pembayaran.split("-")[0])
    ),
  ];

  const yearFilters = uniqueYears.map((year) => ({
    text: year,
    value: year,
    children: monthsData.map((month) => ({
      text: month.text,
      value: `${year}-${month.value}`,
    })),
  }));

  const yearMonthFilters = [
    ...dataRiwayatTransaksi
      .map((item) => moment(item.waktu_pembayaran).format("YYYY-MM"))
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((waktu) => ({ text: waktu, value: waktu })),
  ];

  const monthDayFilters = [
    ...dataRiwayatTransaksi
      .map((item) => moment(item.waktu_pembayaran).format("MM-DD"))
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((waktu) => ({ text: waktu, value: waktu })),
  ];

  const handleGetRiwayatTransaksi = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const url = `/administrasikelurahan/src/api/ipl/riwayat-transaksi-keuangan-ipl-by-rt.php?rt=${rt}`;
    try {
      const response = await axiosInstance.get(url);
      const res = response.data.map((item, index) => ({
        ...item,
        key: index.toString(),
      }));
      if (response.status === 200) {
        setDataRiwayatTransaksi(res);
        setFilteredData(res); // Set filteredData with the initial data
        const { pemasukan, pengeluaran } = calculateFilteredTotals(res);
        setFilteredPemasukan(pemasukan);
        setFilteredPengeluaran(pengeluaran);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const filteredData = dataRiwayatTransaksi.filter((item) => {
      if (filters.waktu_pembayaran) {
        const formattedYearMonth = moment(item.waktu_pembayaran).format(
          "YYYY-MM"
        );
        const formattedMonthDay = moment(item.waktu_pembayaran).format("MM-DD");
        if (
          !filters.waktu_pembayaran.includes(formattedYearMonth) &&
          !filters.waktu_pembayaran.includes(formattedMonthDay)
        ) {
          return false;
        }
      }
      if (filters.nama && !filters.nama.includes(item.nama)) {
        return false;
      }
      if (
        filters.jenis_transaksi &&
        !filters.jenis_transaksi.includes(item.jenis_transaksi)
      ) {
        return false;
      }
      return true;
    });
    setFilteredData(filteredData);
    const { pemasukan, pengeluaran } = calculateFilteredTotals(filteredData);
    setFilteredPemasukan(pemasukan);
    setFilteredPengeluaran(pengeluaran);
  };

  useEffect(() => {
    handleGetPemasukan();
    handleGetPengeluaran();
    handleGetRiwayatTransaksi();
  }, []);

  const sisa = formatAngka(filteredPemasukan - filteredPengeluaran);

  return (
    <div className="p-5">
      <Header className="p-5 bg-white shadow-md flex justify-between">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/dashboard">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Laporan Keuangan</Breadcrumb.Item>
        </Breadcrumb>
        <div className="text-2xl font-bold">
          Laporan Keuangan <span className="text-primary_blue">{user.rt}</span>
        </div>
      </Header>
      <Content className="mt-5 bg-white p-10">
        {user.role === "admin" && (
          <div className="w-full flex justify-between my-6">
            <Button
              onClick={showModal}
              className="flex border-green-600 bg-green-400 text-white hover:bg-white py-4 justify-between items-center"
            >
              Masukkan Pengeluaran
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:h-56 lg:h-56 text-secondary">
          {cardData.map((item, i) => (
            <div
              key={i}
              className={`${item.bgColor} rounded-md p-8 text-lg capitalize flex justify-between`}
            >
              <p className="max-w-[10rem]"> {item.text} </p>
              {item.icon}
            </div>
          ))}
        </div>
        <div className="my-4 w-fit">
          <DownloadTableExcel
            filename="Laporan keuangan"
            sheet="laporan keuangan"
            currentTableRef={tableRef.current}
          >
            <Button className="flex border-purple-500 bg-blusky text-white hover:bg-white py-4 justify-between items-center">
              Export riwayat
            </Button>
          </DownloadTableExcel>
        </div>
        <div
          className="mt-6"
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <Table
            ref={tableRef}
            onChange={handleTableChange}
            summary={() => (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}>
                    <span className="text-lg font-bold text-right">Saldo</span>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="">
                    <span className="text-lg font-bold text-green-500">
                      Rp{sisa}
                    </span>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            )}
            bordered
            dataSource={filteredData}
            loading={loading}
          >
            <ColumnGroup
              title={() => (
                <div className="text-lg text-left font-bold underline">
                  Laporan keuangan Iuran
                </div>
              )}
            >
              <Column
                title="Nama"
                dataIndex="nama"
                key="nama"
                filters={[
                  { text: "Admin", value: null },
                  ...dataRiwayatTransaksi
                    .map((item) => item.nama)
                    .filter(
                      (value, index, self) =>
                        value && self.indexOf(value) === index
                    )
                    .map((nama) => ({ text: nama, value: nama })),
                ]}
                onFilter={(value, record) => record.nama === value}
                render={(nama) => (
                  <span className={!nama ? "text-blue-600" : "text-purple-600"}>
                    {nama ? nama : "Admin"}
                  </span>
                )}
              />
              <Column
                title="Waktu Transaksi"
                dataIndex="waktu_pembayaran"
                key="waktu_pembayaran"
                filters={[
                  {
                    text: "Per Tahun - Bulan",
                    value: "yearMonth",
                    children: yearMonthFilters,
                  },
                  {
                    text: "Per Bulan - Tanggal",
                    value: "monthDay",
                    children: monthDayFilters,
                  },
                ]}
                onFilter={(value, record) => {
                  const formattedYearMonth = moment(
                    record.waktu_pembayaran
                  ).format("YYYY-MM");
                  const formattedMonthDay = moment(
                    record.waktu_pembayaran
                  ).format("MM-DD");
                  return (
                    value === formattedYearMonth || value === formattedMonthDay
                  );
                }}
                render={(text) => moment(text).format("YYYY-MM-DD")}
              />
              <Column
                title="Jenis Transaksi"
                dataIndex="jenis_transaksi"
                key="jenis_transaksi"
                filters={[
                  { text: "Pengeluaran", value: "pengeluaran" },
                  { text: "Pemasukan", value: "pemasukan" },
                ]}
                onFilter={(value, record) => record.jenis_transaksi === value}
              />
              <Column
                title="Jumlah"
                key="jumlah_transaksi"
                render={(item, record) => (
                  <span
                    className={`${
                      record.jenis_transaksi === "pengeluaran"
                        ? "text-red-600"
                        : "text-green-600"
                    } text-right`}
                  >
                    Rp.{formatAngka(record.jumlah_transaksi)}
                  </span>
                )}
              />
            </ColumnGroup>
          </Table>
        </div>
      </Content>
      <Modal
        title="Masukkan jumlah pengeluaran"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleKirimPengeluaran}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Jumlah Transaksi"
            name="jumlah_transaksi"
            rules={[
              {
                required: true,
                message: "Masukkan jumlah transaksi!",
              },
              {
                pattern: /^[0-9]*$/,
                message: "Hanya masukkan angka!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button block className="bg-success text-white" htmlType="submit">
              Masukkan
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
