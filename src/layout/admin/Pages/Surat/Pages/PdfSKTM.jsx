import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ttdrw from "../../../../../assets/png/ttd.png";
import styles from "./styles/Styles";
export default function PdfSKTM() {
  const location = useLocation();
  const dataLoc = location.state;
  // Create styles
 
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
                  <Text style={styles.text}>SURAT KETERANGAN TIDAK MAMPU</Text>
                </View>
              </View>
              <View style={{ marginBottom: 1.5 }}>
                <Text style={styles.paragraf}>
                  Yang bertanda tangan dibawah ini Ketua Rukun Tetangga RT (
                  {dataLoc.rt}), Rukun Warga RW ( {dataLoc.rw} ) Kelurahan
                  Menteng Kecamatan Jekan Raya Kota Palangka Raya menerangkan
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
                  <Text>Status</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.status_diri}</Text>
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
                  <Text>No. KTP / KK</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.noktp} / {dataLoc?.nokk}
                  </Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Alamat asal</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.alamat}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Bahwa yang namanya tersebut diatas adalah benar warga yang
                  bertempat tinggal di RT. {dataLoc.rt}/ RW.{dataLoc.rt}{" "}
                  Kelurahan Menteng Kecamatan Jekan Raya Palangka Raya dan
                  tergolong keluarga tidak mampu. Surat Keterangan Tidak Mampu
                  ini diperlukan untuk : {dataLoc.nama}
                </Text>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Demikian Surat Keterangan ini di berikan untuk dapat
                  dipergunakan sebagaimana mestinya. SKTM ini berlaku 1 (satu)
                  bulan Sejak Tanggal di keluarkan dan dapat diperpanjang
                  kembali.
                </Text>
              </View>
              {/* sign */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginHorizontal: "2cm",
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
              <View
                style={{
                  justifyContent: "center",
                  marginHorizontal: "4cm",
                  marginTop: ".7cm",
                  lineHeight: 1.5,
                }}
              >
                <View>
                  <Text style={{ textAlign: "center" }}>Mengetahui :</Text>
                  <Text style={{ textAlign: "center" }}>CAMAT JEKAN RAYA</Text>
                </View>
                <View
                  style={{
                    marginTop: 30,
                    borderBottom: 1,
                    borderBottomStyle: "dotted",
                  }}
                ></View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
