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
export default function PdfPernyataanTidakAdaBangunan() {
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
              <View style={{ marginVertical: ".63cm" }}>
                <View style={styles.textCenter}>
                  <Text style={styles.header}>
                    SURAT KETERANGAN TIDAK ADA BANGUNAN / TANAH KOSONG
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: ".4cm"}}>
                <Text>Saya yang bertanda tangan di bawah ini: </Text>
              </View>
              {/* data surat */}
              <View>
                <View style={styles.gridWrapper1}>
                  <Text>Nama</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc.nama}</Text>
                </View>

                <View style={styles.gridWrapper1}>
                  <Text>Jenis Kelamin</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.jenis_kelamin}</Text>
                </View>
                <View style={styles.gridWrapper1}>
                  <Text>Tempat & Tanggal Lahir</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.tanggal_lahir} & {dataLoc.tempat_lahir}
                  </Text>
                </View>
                <View style={styles.gridWrapper1}>
                  <Text>Nomor KTP</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.noktp}</Text>
                </View>

                <View style={styles.gridWrapper1}>
                  <Text>Agama</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.agama}</Text>
                </View>

                <View style={styles.gridWrapper1}>
                  <Text>Pekerjaan</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.pekerjaan}</Text>
                </View>

                <View style={styles.gridWrapper1}>
                  <Text>Alamat asal</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.alamat}</Text>
                </View>

                <View style={styles.gridWrapper1}>
                  <Text>Letak Objek Tanah</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.letak_object_tanah}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Dengan ini menyatakan dengan sesungguhnya, bahwa saya sampai
                  pernyataan ini dibuat tidak ada bangunan/tanah kosong.
                </Text>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Demikian Surat Pernyataan tidak ada bangunan/tanah kosong ini
                  saya buat dengan sebenarnya dan penuh rasa tanggung jawab,
                  apabila dikemudian hari ternyata pernyataan ini tidak benar
                  maka saya bersedia dituntut sesuai dengan hukum dan undang –
                  undang yang berlaku.
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
                  }}
                >
                  <Text style={{ textAlign: "center" }}>
                    Yang membuat pernyataan :
                  </Text>
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
