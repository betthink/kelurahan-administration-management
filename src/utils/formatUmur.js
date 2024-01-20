// Contoh data tanggal lahir
// const tanggalLahir = "2003-09-11";

// Fungsi untuk menghitung umur dari tanggal lahir
export function formatUmur(tanggalLahir) {
  const dob = new Date(tanggalLahir);
  const sekarang = new Date();
  const selisih = sekarang - dob;

  // Menghitung umur dalam tahun
  const umurDalamTahun = Math.floor(selisih / (365.25 * 24 * 60 * 60 * 1000));

  return umurDalamTahun;
}

// Menghitung umur dari tanggal lahir
// const umur = formatUmur(tanggalLahir);

// // Memutuskan kelompok berdasarkan umur
// let kelompok = "";
// if (umur > 60) {
//   kelompok = "lansia";
// } else if (umur < 5) {
//   kelompok = "balita";
// }

// // Menampilkan hasil kelompok
// console.log(`Umur: ${umur} tahun, Kelompok: ${kelompok}`);
