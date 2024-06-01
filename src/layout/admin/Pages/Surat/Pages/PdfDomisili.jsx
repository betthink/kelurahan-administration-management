import React, { useEffect, useState } from "react";
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
export default function PdfDomisili() {
  const location = useLocation();
  const dataLoc = location.state;
  // Create styles
 
  useEffect(() => {}, []);
  return (
    <div>
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.text}>
              <View
                style={{
                  lineHeight: 1.5,
                  width: "43%",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.section}>
                  <Text style={styles.text}>Kecamatan</Text>

                  <Text style={styles.text}>Jekan Raya</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.header}>Kelurahan</Text>

                  <Text style={styles.text}>Menteng</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>
                    RT. {dataLoc?.rt} / RW. {dataLoc?.rw}
                  </Text>
                </View>
              </View>

              {/*  */}
              <View style={{ marginVertical: "0.63cm" }}>
                <View style={styles.textCenter}>
                  <Text style={styles.text}>SURAT KETERANGAN DOMISISLI</Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    marginTop: 3,
                  }}
                >
                  <Text style={styles.text}>
                    {/* <Text style={styles.text}>No. </Text> */}
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 1.5 }}>
                <Text style={styles.paragraf}>
                  Yang bertanda tangan di bawah ini, Ketua RT. {dataLoc?.rt} /
                  RW. {dataLoc?.rw} Kelurahan Menteng, Kecamatan Jekan Raya,
                  menerangkan dengan sebenarnya bahwa :
                </Text>
              </View>
              {/* data surat */}
              <View>
                <View style={styles.gridWrapper1}>
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
                    {dataLoc?.tanggal_lahir} &{dataLoc.tempat_lahir}
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
              <View style={{ marginTop: 10 }}> 
                <Text style={styles.paragraf}>
                  Bahwa nama tersebut di atas benar berdomisili / alamat menetap
                  di Jalan {dataLoc.alamat} RT {dataLoc.rt} / RW {dataLoc.rw}
                  Kelurahan Menteng Kecamatan Jekan Raya Kota Palangka Raya,
                  sejak tanggal {dataLoc.tanggal_register} sampai sekarang.
                  Demikian Surat Keterangan Domisili ini diberikan, untuk dapat
                  dipergunakan seperlunya.
                </Text>
              </View>
              {/* sign */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "2cm",
                  marginHorizontal: "2cm",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    marginTop: dataLoc?.status_permohonan === "1" ? 60 : null,
                  }}
                >
                  <Text>Mengetahui :</Text>
                </View>
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
                  justifyContent: "flex-end",

                  marginHorizontal: "2cm",
                }}
              >
                <React.Fragment>
                  <Image src={ttdrw} style={{ width: 100 }} />
                </React.Fragment>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",

                  marginHorizontal: "2cm",
                }}
              >
                <Text>{dataLoc.adminrt}</Text>
              </View>
              <View style={{ marginTop: "2cm" }}>
                <Text>Syarat Kelengkapan Berkas :</Text>
                <Text>1.Fotocopy KTP terakhir (1 lembar)</Text>
                <Text>2.Fotocopy Kartu Keluarga terakhir (1 lembar)</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
