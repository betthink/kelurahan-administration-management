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
import KelolaAdmin from "./layout/admin/Pages/admin/KelolaAdmin";
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
import RegistrasiPenduduk from "./layout/public/pages/RegistrasiPenduduk";
import VerifikasiPenduduk from "./layout/admin/Pages/penduduk/VerifikasiPenduduk";
import ListBelumLunasPage from "./layout/admin/Pages/IPL/ListBelumLunasPage";
import TambahRw from "./layout/admin/Pages/admin/TambahRw";
import ProfilePage from "./layout/public/pages/ProfilePage";
import VerifikasiPembayaranPublic from "./layout/public/pages/VerifikasiPembayaranPublic";
import VerifikasiPembayaranTransfer from "./layout/admin/Pages/IPL/VerifikasiPembayaranTransfer";
import FormInputData from "./layout/admin/Pages/penduduk/FormInputData";
import KelolaLembaga from "./layout/admin/Pages/lembaga/KelolaLembaga";
import TambahLembaga from "./layout/admin/Pages/lembaga/TambahLembaga";
import EditLembaga from "./layout/admin/Pages/lembaga/EditLembaga";
import PdfDomisili from "./layout/admin/Pages/Surat/Pages/PdfDomisili";
import PdfSKTM from "./layout/admin/Pages/Surat/Pages/PdfSKTM";
import PdfPernyataanGaib from "./layout/admin/Pages/Surat/Pages/PdfPernyataanGaib";
import PdfPernyataanTidakAdaBangunan from "./layout/admin/Pages/Surat/Pages/PdfPernyataanTidakAdaBangunan";
import PdfKeteranganBelumMenikah from "./layout/admin/Pages/Surat/Pages/PdfKeteranganBelumMenikah";
import PdfSKKB from "./layout/admin/Pages/Surat/Pages/PdfSKKB";
import PdfPernyataanPenghasilan from "./layout/admin/Pages/Surat/Pages/PdfPernyataanPenghasilan";
import PdfSKTMSiswa from "./layout/admin/Pages/Surat/Pages/PdfSKTMSiswa";
import PdfJandaDuda from "./layout/admin/Pages/Surat/Pages/PdfJandaDuda";
import PdfBedaNama from "./layout/admin/Pages/Surat/Pages/PdfBedaNama";

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
                    ? "Informasi-Iuran"
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
        <Route path="/Informasi-Iuran" element={<InformasiIuran />} />
        <Route path="/List-surat" element={<LihatSuratPage />} />
        <Route path="/Lihat-surat" element={<SuratViewer />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Registrasi" element={<RegistrasiPenduduk />} />
        <Route path="/Upload-bukti" element={<VerifikasiPembayaranPublic />} />
        <Route path="/Form-input" element={<FormInputData />} />

        {/* Cms */}
        <Route path="Dashboard" element={<CmsLayouts />}>
          <Route path="Landingpage" element={<Dashboard />} />
          <Route path="Kelola-Penduduk" element={<KelolaPenduduk />} />
          <Route
            path="Kelola-Penduduk/verifikasi-penduduk"
            element={<VerifikasiPenduduk />}
          />

          <Route path="Kelola-IPL" element={<KelolaIPL />} />
          <Route
            path="Kelola-IPL/list-belum-lunas"
            element={<ListBelumLunasPage />}
          />

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
          <Route path="Kelola-Admin" element={<KelolaAdmin />} />
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

          <Route
            path="/Dashboard/Kelola-Admin/Tambah-RW"
            element={<TambahRw />}
          />
          <Route
            path="Kelola-IPL/Verifikasi-Pembayaran-Transfer"
            element={<VerifikasiPembayaranTransfer />}
          />
          <Route path="/Dashboard/Kelola-Lembaga" element={<KelolaLembaga />} />
          <Route path="/Dashboard/Tambah-Lembaga" element={<TambahLembaga />} />
          <Route path="/Dashboard/Edit-Lembaga" element={<EditLembaga />} />
        </Route>
        <Route path="/Kelola-surat/pdf" element={<PdfViewer />} />
        <Route path="/surat-domisili/pdf" element={<PdfDomisili />} />
        <Route path="/surat-sktm/pdf" element={<PdfSKTM />} />

        <Route
          path="/surat-pernyataan-gaib/pdf"
          element={<PdfPernyataanGaib />}
        />
        <Route
          path="/surat-pernyataan-tidak-ada-bangunan/pdf"
          element={<PdfPernyataanTidakAdaBangunan />}
        />
        <Route
          path="/surat-keterangan-belum-menikah/pdf"
          element={<PdfKeteranganBelumMenikah />}
        />
        <Route path="/surat-skkb/pdf" element={<PdfSKKB />} />
        <Route
          path="/surat-pernyataan-penghasil/pdf"
          element={<PdfPernyataanPenghasilan />}
        />
        <Route path="/surat-sktm-siswa/pdf" element={<PdfSKTMSiswa />} />
        <Route
          path="/surat-pernyataan-janda-duda/pdf"
          element={<PdfJandaDuda />}
        />
        <Route path="/surat-beda-nama/pdf" element={<PdfBedaNama />} />
      </Routes>
    </>
  );
};

export default App;
