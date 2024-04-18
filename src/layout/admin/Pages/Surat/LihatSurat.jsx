import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";
function LihatSurat() {
  const viewer = useRef(null);
  const data = {
    nama: "John",
    jenis_kelamin: "Laki - Laki",
    tempatlahir: "kediri",
    tanggal_lahir: "11-11-2000",
    status_diri: "Lajang",
    agama: "Katholik",
    pekerjaan: "Membadut",
    noktp: "62130343346",
    nokk: "6213025446",
    alamat: "Jl. xxxx",
    rt: "001",
    rw: "002",
    //   "now": formattedDate,
  };

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: "../../../../assets/docx/templete/t.docx",
      },
      viewer.current
    ).then(async (instance) => {
      const { documentViewer } = instance.Core;
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        documentViewer.updateView();
        await documentViewer.getDocument().applyTemplateValues(data);
      });
    });
  }, []);
  return <div>LihatSurat</div>;
}

export default LihatSurat;
