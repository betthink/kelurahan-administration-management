import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import ttdrw from "../../../../../assets/png/ttd.png";
import styles from "./styles/Styles";
export default function PdfSKKB() {
  const location = useLocation();
  const dataLoc = location.state;

  return (
    <div>
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.text}>
              {/*  */}
              <View style={{ marginVertical: "0.63cm" }}>
                <View style={styles.textCenter}>
                  <Text style={styles.text}>
                    SURAT KETERANGAN BERKELAKUAN BAIK (SKKB)
                  </Text>
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
                  <Text>Suku / Bangsa</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.suku} / {dataLoc?.bangsa}
                  </Text>
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

              <View style={{ marginTop: "0.33cm" }}>
                <View style={styles.textCenter}>
                  <Text style={styles.text}>
                    KETERANGAN MENGENAI DIRI YANG BERSANGKUTAN
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: ".3cm" }}>
                <View>
                  <Text style={styles.paragrafNoAlinea}>
                    <Text>I.</Text>
                    Menurut pengetahuan kami, selama bertempat tinggal di
                    lingkungan RT. {dataLoc.rt} / RW.{dataLoc.rw}. Kelurahan
                    Menteng nama tersebut di atas dikenal sebagai orang yang
                    tidak pernah menimbulkan keributan dengan anggota masyarakat
                    dan tidak pernah tersangkut dengan urusan-urusan / persoalan
                    adat istiadat kampung.
                  </Text>
                </View>
                <View>
                  <Text style={styles.paragrafNoAlinea}>
                    <Text>II.</Text>Menurut keterangan dihadapan kami, bahwa ia
                    tidak pernah terlibat dengan apa yang dinamakan G.30.S/PKI
                    serta Partai yang terlarang lainnya.
                  </Text>
                </View>
                <View>
                  <Text style={styles.paragrafNoAlinea}>
                    <Text>III.</Text>Surat Keterangan Catatan Kepolisian ini,
                    diberikan berdasarkan permintaan yang bersangkutan, sebagai
                    dasar untuk mengurus Surat Keterangan Catatan Kepolisian dan
                    Surat Keterangan lainnya dari pihak yang berwajib untuk
                    keperluan melengkapi berkas
                  </Text>
                </View>
                <View>
                  <Text style={styles.paragrafNoAlinea}>
                    <Text>IV.</Text>Bila ternyata dikemudian hari terdapat
                    kekeliruan dalam pemberian Surat Keterangan Catatan
                    Kepolisian ini, akan diadakan perbaikan seperlunya /
                    dicabut.
                  </Text>
                </View>
              </View>

              {/* sign */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginHorizontal: "1cm",
                  marginTop: '.6cm'
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
                  marginHorizontal: "1cm",
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
                  <Text>Ketuga RW {dataLoc.rw}</Text>
                  <Text>Kelurahan Menteng</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Text>Ketua RT {dataLoc.rt}</Text>
                  <Text>
                    <Text>Kelurahan Menteng</Text>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "1cm",
                }}
              >
                <React.Fragment>
                  <Image src={ttdrw} style={{ width: 100 }} />
                </React.Fragment>
                <React.Fragment>
                  <Image src={ttdrw} style={{ width: 100 }} />
                </React.Fragment>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "1cm",
                }}
              >
                <Text style={{ width: 80 }}>{dataLoc.adminrw}</Text>
                <Text>{dataLoc.adminrt}</Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  marginHorizontal: "1cm",
                  marginTop: ".3cm",
                  lineHeight: 1.5,
                  flexDirection: "row"
                }}
              >
                <View>
                  <View>
                    <Text style={{ textAlign: "left" }}>Mengetahui :</Text>
                    <Text style={{ textAlign: "left" }}>
                      CAMAT JEKAN RAYA
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 30,
                      borderBottom: 1,
                      borderBottomStyle: "dotted",
                    }}
                  ></View>
                </View>
                <View>
                  <View>
                    <Text style={{ textAlign: "left" }}>Mengetahui :</Text>
                    <Text style={{ textAlign: "left" }}>
                      Lurah Menteng
                    </Text>
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
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
