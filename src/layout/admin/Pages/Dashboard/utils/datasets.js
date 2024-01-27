export const dataSet = {
  labels,
  datasets: [
    // {
    //   label: "Total Penduduk",
    //   data: `${dataPenduduk?.length}`,
    //   backgroundColor: "#2563eb",
    // },
    {
      label: "Penduduk Tetap",
      data: `${pendudukTetap?.length}`,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Penduduk Sementara",
      data: `${pendudukSementara.length}`,
      backgroundColor: "#0891b2",
    },
    {
      label: "penduduk Lansia",
      data: `${pendudukLansia.length}`,
      backgroundColor: "#14b8a6",
    },
    {
      label: "penduduk Dewasa",
      data: `${pendudukDewasa.length}`,
      backgroundColor: "#c084fc",
    },
    {
      label: "penduduk Balita",
      data: `${pendudukBalita.length}`,
      backgroundColor: "#FF90BC",
    },
    // {
    //   label: "penduduk Balita",
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
    //   backgroundColor: "#FF90BC",
    // },
  ],
};
