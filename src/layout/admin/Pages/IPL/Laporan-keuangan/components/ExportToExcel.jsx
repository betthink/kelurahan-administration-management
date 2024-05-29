import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = ({ data, filename, headline }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    // Menambahkan judul sebagai baris pertama
    XLSX.utils.sheet_add_aoa(ws, [[headline]], { origin: "A1" });

    // Menambahkan header kolom
    XLSX.utils.sheet_add_aoa(ws, [Object.keys(data[0])], { origin: "A2" });

    // Menambahkan data mulai dari baris ketiga
    XLSX.utils.sheet_add_json(ws, data, { origin: "A3", skipHeader: true });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Ekspor file Excel
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `${filename}.xlsx`
    );
  };

  return <button onClick={exportToExcel}>Export to Excel</button>;
};

export default ExportToExcel;
