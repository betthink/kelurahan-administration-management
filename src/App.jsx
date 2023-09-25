import React from "react";
import CmsLayouts from "./layout/CmsLayouts";
import { Navigate, Route, Routes } from "react-router-dom";
import KelolaPenduduk from "./layout/admin/Pages/penduduk/KelolaPenduduk";
import KelolaIPL from "./layout/admin/Pages/IPL/KelolaIPL";
import KelolaPermohonanSurat from "./layout/admin/Pages/Surat/KelolaPermohonanSurat";
import KelolaInformasiVaksinSPage from "./layout/admin/Pages/vaksin/KelolaInformasiVaksinSPage";
import InformasiPosyandPage from "./layout/admin/Pages/posyandu/InformasiPosyandPage";
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

const App = () => {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/" element={<Navigate to={"Landingpage"} />} />
        <Route path="Landingpage" element={<LandingPage />} />
        <Route path="Homepage" element={<HomePage />} />
        <Route path="Homepage/Permohonan-Surat" element={<PermohonanSurat />} />
        <Route path="login-admin" element={<LoginAdmin />} />
        <Route path="/Informasi-Iuran" element={<InformasiIuran />} />
        {/* Cms */}
        <Route path="Dashboard" element={<CmsLayouts />}>
          <Route path="Landingpage" element={<Dashboard />} />
          <Route path="Kelola-Penduduk" element={<KelolaPenduduk />} />
          <Route path="Kelola-IPL" element={<KelolaIPL />} />
          <Route path="kelola-Surat" element={<KelolaPermohonanSurat />} />
          <Route
            path="Informasi-vaksin"
            element={<KelolaInformasiVaksinSPage />}
          />
          <Route
            path="Informasi-PosyandPage"
            element={<InformasiPosyandPage />}
          />
          <Route path="Update-Penduduk" element={<UpdatePendudukPage />} />
          <Route path="Tambah-Penduduk" element={<TambahPenduduk />} />
          <Route path="Tambah-VaksinPage" element={<TambahVaksinPage />} />
          <Route
            path="Verifikasi-Pembayaran"
            element={<VerifikasiPembayaran />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
