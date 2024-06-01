import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import ttdrw from "../../../../../assets/png/ttd.png";
import styles from "./styles/Styles";
export default function PdfSKTMSiswa() {
  const location = useLocation();
  const dataLoc = location.state;


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
                    SURAT KETERANGAN TIDAK MAMPU (SKTM)
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: ".2cm" }}>
                <Text>
                  Yang bertanda tangan di bawah ini Ketua RT.{dataLoc.rt} RW.
                  {dataLoc.rw} Kelurahan Menteng Kecamatan Jekan Raya Kota
                  Palangka Raya, dengan ini menerangkan :
                </Text>
                <Text
                  style={{ fontWeight: "demibold" }}
                >
                  DATA SISWA/MAHASISWA
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
                  <Text>NIM/NIS</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc.nim}</Text>
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
                  <Text>Sekolah / Perguruan Tinggi</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={[styles.value]}></Text>
                </View>
              </View>
              <View >
                <Text style={{ fontWeight: "demibold" }}>DATA ORANG TUA</Text>
              </View>

              <View>
                <View style={styles.gridWrapper}>
                  <Text>Nama orang Tua/Wali</Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Ayah</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.nama_ayah} </Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Ibu</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.nama_ibu} </Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Pekerjaan orang Tua/Wali</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Ayah</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.pekerjaan_ayah} </Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Ibu</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.pekerjaan_ibu} </Text>
                </View>
              </View>
              <View style={styles.gridWrapper}>
                <Text>Alamat :</Text>
              </View>
              <View>
                <View style={styles.gridWrapper}>
                  <Text>Jalan</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc.jalan}</Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Kelurahan</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.kelurahan}</Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Kecamatan</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.kecamatan}</Text>
                </View>

                <View style={styles.gridWrapper}>
                  <Text>Provinsi</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.provinsi}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.paragrafNoAlinea}>
                  Bahwa nama tersebut di atas adalah benar warga kami yang
                  bertempat tinggal di alamat tersebut dan tergolong keluarga
                  tidak mampu/ekonomi lemah.
                </Text>
              </View>
              <View>
                <Text style={styles.paragrafNoAlinea}>
                  Demikian Surat Keterangan Tidak Mampu ini diberikan untuk
                  dapat dipergunakan sebagaimana mestinya.
                </Text>
              </View>

              <View>
                {/* sign */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginHorizontal: "1cm",
                    marginTop: ".1cm",
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
                    flexDirection: "row",
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
                      <Text style={{ textAlign: "left" }}>Lurah Menteng</Text>
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
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
