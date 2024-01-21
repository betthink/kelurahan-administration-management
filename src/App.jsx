import React from "react";
import CmsLayouts from "./layout/CmsLayouts";
import { Navigate, Route, Routes } from "react-router-dom";
import KelolaPenduduk from "./layout/admin/Pages/penduduk/KelolaPenduduk";
import KelolaIPL from "./layout/admin/Pages/IPL/KelolaIPL";
import KelolaPermohonanSurat from "./layout/admin/Pages/Surat/KelolaPermohonanSurat";
import KelolaInformasiVaksinSPage from "./layout/admin/Pages/vaksin/KelolaInformasiVaksinSPage";
import UpdatePendudukPage from "./layout/admin/Pages/penduduk/UpdatePendudukPage";
import TambahPenduduk from "./layout/admin/Pages/penduduk/TambahPenduduk";
import TambahVaksinPage from "./layout/admin/Pages/vaksin/TambahVaksinPage";
import VerifikasiPembayaran from "./layout/admin/Pages/IPL/VerifikasiPembayaran";
import LandingPage from "./layout/public/LandingPage";
import HomePage from "./layout/public/pages/HomePage";
import InformasiIuran from "./layout/public/pages/InformasiIuran";
import PermohonanSurat from "./layout/public/pages/PermohonanSurat";
import Dashboard from "./layout/admin/Pages/Dashboard";
import LoginAdmin from "./layout/admin/Pages/Login/LoginAdmin";
import KelolaAdminRT from "./layout/admin/Pages/admin/KelolaAdminRT";
import { useSelector } from "react-redux";
import TambahAdmin from "./layout/admin/Pages/admin/TambahAdmin";
import DetailRiwayatPembayaran from "./layout/admin/Pages/IPL/DetailRiwayatPembayaran";
import UpdateAkunAdmin from "./layout/admin/Pages/admin/UpdateAkunAdmin";
import KelolaImunisasi from "./layout/admin/Pages/posyandu/KelolaImunisasi";
import TambahPesertaImunisasi from "./layout/admin/Pages/posyandu/TambahPesertaImunisasi";
import KelolaInformasiPosyand from "./layout/admin/Pages/posyandu/KelolaInformasiPosyand";
import LihatDetailKeluarga from "./layout/admin/Pages/penduduk/LihatDetailKeluarga";
import DetailPendudukRT from "./layout/admin/Pages/penduduk/DetailPendudukRT";
import KelolaIPLRt from "./layout/admin/Pages/IPL/KelolaIPLRt";
import LaporanKeuangan from "./layout/admin/Pages/IPL/LaporanKeuangan";
import Pdfgenerator from "./layout/admin/Pages/Surat/PdfViewer";
import PdfViewer from "./layout/admin/Pages/Surat/PdfViewer";
import LihatSuratPage from "./layout/public/pages/LihatSurat";
import SuratViewer from "./layout/public/pages/SuratViewer";

const App = () => {
  const user = useSelector((state) => state.userReducer.value);
  return (
    <>
      <Routes>
        {/* public */}
        <Route
          path="/"
          element={
            <Navigate
              to={
                user?.isLoggin
                  ? user?.role === "penduduk"
                    ? "HomePage"
                    : "Dashboard/Landingpage"
                  : "Landingpage"
              }
            />
          }
        />
        <Route path="Landingpage" element={<LandingPage />} />
        <Route path="Homepage" element={<HomePage />} />
        <Route path="Homepage/Permohonan-Surat" element={<PermohonanSurat />} />
        <Route path="login-admin" element={<LoginAdmin />} />
        <Route path="Informasi-Iuran" element={<InformasiIuran />} />
        <Route path="/List-surat" element={<LihatSuratPage />} />
        <Route path="/Lihat-surat" element={<SuratViewer />} />

        {/* Cms */}
        <Route path="Dashboard" element={<CmsLayouts />}>
          <Route path="Landingpage" element={<Dashboard />} />
          <Route path="Kelola-Penduduk" element={<KelolaPenduduk />} />
          <Route path="Kelola-IPL" element={<KelolaIPL />} />
          <Route
            path="Kelola-IPL/DetailRiwayatPembayaran"
            element={<DetailRiwayatPembayaran />}
          />
          <Route path="kelola-Surat" element={<KelolaPermohonanSurat />} />
          <Route
            path="Informasi-vaksin"
            element={<KelolaInformasiVaksinSPage />}
          />
          <Route
            path="Informasi-PosyandPage"
            element={<KelolaInformasiPosyand />}
          />
          <Route
            path="Tambah-peserta-posyandu"
            element={<TambahPesertaImunisasi />}
          />
          <Route path="Kelola-Admin" element={<KelolaAdminRT />} />
          <Route path="Kelola-Admin/Tambah-Admin" element={<TambahAdmin />} />
          <Route
            path="Kelola-Admin/UpdateAkunAdmin"
            element={<UpdateAkunAdmin />}
          />
          <Route path="Update-Penduduk" element={<UpdatePendudukPage />} />
          <Route path="Tambah-Penduduk" element={<TambahPenduduk />} />
          <Route path="Tambah-VaksinPage" element={<TambahVaksinPage />} />
          <Route path="Kelola-Imunisasi" element={<KelolaImunisasi />} />
          <Route path="Detail-keluarga" element={<LihatDetailKeluarga />} />
          <Route
            path="/Dashboard/Detail-penduduk-rt"
            element={<DetailPendudukRT />}
          />
          <Route path="/Dashboard/list-peserta-ipl" element={<KelolaIPLRt />} />
          <Route
            path="/Dashboard/Laporan-keuangan"
            element={<LaporanKeuangan />}
          />
          <Route
            path="Kelola-IPL/Verifikasi-Pembayaran"
            element={<VerifikasiPembayaran />}
          />
          <Route path="Kelola-surat/pdf" element={<PdfViewer />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
