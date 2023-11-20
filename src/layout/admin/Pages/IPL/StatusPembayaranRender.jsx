const StatusPembayaranRender = async ({ id }) => {
  const url = `/administrasikelurahan/src/api/fetchDataRiwayatPembayaranByIduser.php?id_user=${id}`;
  const res = await axiosInstance.get(url);
  const { status, data } = res;

  if (status === 200) {
    const id_pembayaran_values = data.map((item) => item.id_pembayaran);
    const max_id_pembayaran = Math.max(...id_pembayaran_values);
    const lastData = data.filter(
      (item) => parseInt(item.id_pembayaran) === max_id_pembayaran
    );

    const dateVerifikasi = new Date(lastData[0].waktu_verifikasi);
    const yearVerifikasi = dateVerifikasi.getFullYear();
    const monthVerifikasi = dateVerifikasi.getMonth() + 1;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const isMatch =
      yearVerifikasi === currentYear && monthVerifikasi === currentMonth;
    console.log(isMatch);
    return (
      <div
        className={`p-1 rounded items-center justify-center flex w-fit ${
          isMatch ? "bg-green-100" : "bg-red-200"
        }`}
      >
        <p className={`${isMatch ? "text-green-500" : "text-red-700"}`}>
          {isMatch ? "Lunas" : "Terhutang"}
        </p>
      </div>
    );
  }
};
