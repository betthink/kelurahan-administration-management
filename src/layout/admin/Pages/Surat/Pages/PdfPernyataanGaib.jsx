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
export default function PdfPernyataanGaib() {
  const location = useLocation();
  const dataLoc = location.state;
  // Create styles

  return (
    <div>
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.text}>
              {/*  */}
              <View style={{ marginVertical: "0.63cm" }}>
                <View style={styles.textCenter}>
                  <Text style={styles.text}>SURAT KETERANGAN GAIB</Text>
                </View>
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
                  <Text>Umur</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.umur} Tahun</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Pendidikan Terakhir</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.pendidikan_terakhir}
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
              <View style={{ marginVertical: ".3cm", marginLeft: 11 }}>
                <Text>Adalah suami / istri sah dari :</Text>
              </View>
              {/* data surat */}
              <View>
                <View style={styles.gridWrapper}>
                  <Text>Nama</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc.nama_lainnya}</Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Tempat & Tanggal Lahir</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.tempat_lahir_2nd} & {dataLoc.tempat_lahir_2nd}
                  </Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Umur</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.umur_lainnya}</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Pendidikan Terakhir</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.pendidikan_terakhir} Tahun
                  </Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Agama</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.agama_2nd}</Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Pekerjaan</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.pekerjaan_2nd}</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Alamat asal</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.alamat}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Dengan ini menyatakan bahwa Suami / Isteri saya yang bernama{" "}
                  {dataLoc.nama_lain}. telah pergi meninggalkan saya sejak{" "}
                  {dataLoc.waktu_pergi} hingga sekarang tidak pernah pulang,
                  tidak ada kabar beritanya dan tidak diketahui alamatnya dengan
                  jelas dan pasti di wilayah Republik Indonesia.
                </Text>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Demikian Surat Pernyataan Gaib ini saya buat dengan
                  sesungguhnya, dan apabila pernyataan saya ini tidak benar saya
                  sanggup dituntut sesuai dengan hukum dan undang – undang yang
                  berlaku.
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
                  }}
                >
                  <Text>Ketua RT {dataLoc.rt}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    textAlign: "center",
                  }}
                >
                  <Text>Yang membuat pernyataan :</Text>
                  <Text style={{ marginLeft: 60 }}>{dataLoc.nama}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "2cm",
                  position: "relative",
                }}
              >
                <React.Fragment>
                  <Image src={ttdrw} style={{ width: 100 }} />
                </React.Fragment>
                <View
                  style={{
                    marginTop: 20,
                    padding: 10,
                    width: 80,
                    height: 60,
                    border: 1,
                    borderStyle: "dashed",
                    right: 70,
                    position: "absolute",
                  }}
                >
                  <Text style={{ fontSize: 8 }}>Materai</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "2cm",
                }}
              >
                <Text>{dataLoc.adminrt}</Text>
                <Text
                  style={{ borderBottom: 1, borderStyle: "dashed", width: 80 }}
                ></Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
