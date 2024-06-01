import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import ttdrw from "../../../../../assets/png/ttd.png";
import styles from "./styles/Styles";
export default function PdfKeteranganBelumMenikah() {
  const location = useLocation();
  const dataLoc = location.state;

  return (
    <div>
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.text}>
              <View style={{ borderBottom: 2 }}>
                <View
                  style={{
                    lineHeight: 1.5,
                    width: "43%",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.section}>
                    <Text style={styles.header}>RT</Text>
                    <Text style={styles.text}> {dataLoc?.rt} </Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.header}>RW</Text>
                    <Text style={styles.text}> {dataLoc?.rw} </Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.text}>KECAMATAN</Text>
                    <Text style={styles.text}>Jekan Raya</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.header}>KELURAHAN</Text>
                    <Text style={styles.text}>Menteng</Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.header}>KOTA</Text>
                    <Text style={styles.text}>Palangka Raya</Text>
                  </View>
                </View>
              </View>
              {/*  */}
              <View style={{ marginVertical: "0.63cm" }}>
                <View style={styles.textCenter}>
                  <Text style={styles.text}>
                    SURAT KETERANGAN BELUM MENIKAH
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 1.5 }}>
                <Text style={styles.paragraf}>
                  Yang bertanda tangan dibawah ini menerangkan dengan sebenarnya
                  bahwa :
                </Text>
              </View>
              {/* data surat */}
              <View>
                <View style={styles.gridWrapper}>
                  <Text>Nama</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc.nama}</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>No. KTP </Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.noktp}</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Jenis Kelamin</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.jenis_kelamin}</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Tempat & Tanggal Lahir</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.tanggal_lahir} & {dataLoc.tempat_lahir}
                  </Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Agama</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.agama}</Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Pekerjaan</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.pekerjaan}</Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Alamat asal</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.alamat}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Adalah benar warga lingkungan RT{dataLoc.rt} RW{dataLoc.rw}{" "}
                  Kelurahan Menteng Kecamatan Jekan Raya Kota Palangka Raya dan
                  yang bersangkutan saat ini berstatus Belum Pernah Menikah.
                </Text>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Demikian Surat Keterangan ini dibuat untuk dapat dipergunakan
                  sebagaimana mestinya.
                </Text>
              </View>
              {/* sign */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginHorizontal: "2cm",
                  marginTop: "1cm"
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Text>Palangka Raya, {dataLoc.now}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: ".4cm",
                  marginHorizontal: "2cm",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    textAlign: "center",
                  }}
                >
                  <Text>Mengetahui :</Text>
                  <Text>An. Lurah Menteng :</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Text>Ketua RT {dataLoc.rt}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginHorizontal: "2cm",
                }}
              >
                {/* <React.Fragment>
                  <Image src={ttdrw} style={{ width: 100 }} />
                </React.Fragment> */}
                <React.Fragment>
                  <Image src={ttdrw} style={{ width: 100 }} />
                </React.Fragment>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "2cm",
                }}
              >
                <Text
                  style={{ borderBottom: 1, borderStyle: "dashed", width: 80 }}
                ></Text>
                <Text>{dataLoc.adminrt}</Text>
              </View>
             
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
