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
import Logo from "../../../../../assets/png/logo.png";
import styles from "./styles/Styles";
export default function PdfBedaNama() {
  const location = useLocation();
  const dataLoc = location.state;
  console.log(dataLoc);
  // Create styles

  return (
    <div>
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.text}>
              <View style={{ borderBottom: 2, justifyContent: "flex-end" }}>
                <View style={{ position: 'absolute', left: 10, bottom: 4 }}>
                    <Image src={Logo} style={{ width: 60 }} />
                </View>
                <View
                  style={{
                    lineHeight: 1.5,
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <View style={styles.section1}>
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      PEMERINTAH KOTA PALANGKA RAYA
                    </Text>
                  </View>
                  <View style={styles.section1}>
                    <Text style={styles.header}>KECAMATAN JEKAN RAYA</Text>
                  </View>

                  <View style={styles.section1}>
                    <Text style={styles.header}>KELURAHAN MENTENG</Text>
                  </View>
                  <View style={styles.section1}>
                    <Text style={styles.text}>
                      Jl. Yos Sudarso III No. 1 Palangka Raya 73111
                    </Text>
                  </View>
                </View>
              </View>
              {/*  */}
              <View style={{ marginVertical: "0.63cm" }}>
                <View style={styles.textCenter}>
                  <Text style={styles.text}>SURAT KETERANGAN BEDA NAMA</Text>
                </View>
              </View>
              <View style={{ marginBottom: 1.5 }}>
                <Text style={styles.paragraf}>
                  Yang bertanda tangan di bawah ini Lurah Menteng Kecamatan
                  Jekan Raya Kota Palangka Raya menerangkan dengan sebenarnya
                  bahwa :
                </Text>
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
                  <Text>No. KTP / KK</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.noktp} / {dataLoc?.nokk}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Bahwa Nama tersebut diatas adalah yang benar Dan Nama{" "}
                  {dataLoc.nama}
                  adalah orang yang sama, yang terdapat disertipikat Tanah Di
                  buktikan dengan : Foto copy KTP dan Sertifikat Tanah. sebagai
                  Bukti Kebenaran dan Keaslian nama tersebut diatas
                </Text>
              </View>
              <View>
                <Text style={styles.paragraf}>
                  Demikian Surat Keterangan ini diberikan, untuk dapat
                  dipergunakan sebagaimana mestinya.
                </Text>
              </View>
              {/* sign */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginHorizontal: "2cm",
                  marginTop: "1cm",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      position: "relative",
                    }}
                  >
                    <Text>Dikeluarkan di </Text>
                    <Text style={styles.dot1}>:</Text>
                    <Text> Palangka Raya</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      position: "relative",
                    }}
                  >
                    <Text>Tanggal </Text>
                    <Text style={styles.dot1}>:</Text>
                    <Text>{dataLoc.now}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
