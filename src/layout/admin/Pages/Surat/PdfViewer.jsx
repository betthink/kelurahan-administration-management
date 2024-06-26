import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
// import PDFDocument from "./PDFDocument";
import { useLocation } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ttdrw from "../../../../assets/png/ttd.png";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../../utils/axiosInstance";
export default function PdfViewer() {
  const location = useLocation();
  const dataLoc = location.state.data;
  // console.log(dataLoc);
  const [datauserRW, setdatauserRW] = useState([]);
  const [datauserRT, setdatauserRT] = useState([]);
  // Create styles
  const styles = StyleSheet.create({
    page: {
      // flexDirection: "row",
      backgroundColor: "#fff",
      paddingTop: "2.54cm", // Set top margin
      paddingRight: "3.18cm", // Set right margin
      paddingBottom: "2.54cm", // Set bottom margin
      paddingLeft: "3.18cm", // Set left margin
    },
    section: {
      justifyContent: "space-between",
      flexDirection: "row",
      // marginBottom: "0.63cm",

      // margin: 10,
      // padding: 10,
      // flexGrow: 1,
    },
    gridItem: {
      width: "33.33%", // Set each grid item to take up 33.33% of the container width
      padding: 5,
    },
    text: {
      fontFamily: "Times-Roman", // Set font family to Times New Roman
      fontSize: "0.42cm", // Set font size to 11
    },
    textCenter: {
      justifyContent: "center",
      flexDirection: "row",
      textDecoration: "underline",
      fontWeight: "bold",
      // textAlign: 'center'
    },
    gridWrapper: {
      flexDirection: "row",

      // justifyContent: "space-between",
      // maxWidth: '50%',
      textAlign: "left",
      marginBottom: "0.63cm",
    },
    dot: {
      position: "absolute",
      left: 160,
    },
    value: {
      position: "absolute",
      marginLeft: 180,
      flexDirection: "row",
      width: "100%",
    },
    signPlace: {
      marginTop: 30,
    },
  });
  const user = useSelector((state) => state.userReducer.value);
  //  console.log(user);

  async function handleGetVerifikatorRW() {
    const url = `administrasikelurahan/src/api/admin/fetchAccountAdminRWbyId.php?iduUserRW=${dataLoc.rw_verifikator}`;
    const response = await axiosInstance.get(url);
    const data = response.data[0];
    // console.log(data);
    setdatauserRW(data);
  }
  async function handleGetVerifikatorRT() {
    const url = `administrasikelurahan/src/api/admin/fetchAccountAdminRTById.php?iduUserRT=${dataLoc.rt_verifikator}`;
    const response = await axiosInstance.get(url);
    const data = response.data[0];
    console.log(data);
    setdatauserRT(data);
  }
  useEffect(() => {
    handleGetVerifikatorRW();
    handleGetVerifikatorRT();
  }, []);
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
                  <Text style={styles.text}>Kota</Text>
                  <Text style={styles.text}>Palangka Raya</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>Kecamatan</Text>

                  <Text style={styles.text}>Jekan Raya</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>Kelurahan</Text>

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
                  <Text style={styles.text}>SURAT PENGANTAR</Text>
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
                <Text
                  style={{
                    textAlign: "left",
                    marginBottom: "0.63cm",
                    lineHeight: 1.5,
                  }}
                >
                  Yang bertanda tangan di bawah ini, Ketua RT. {dataLoc?.rt} /
                  RW. {dataLoc?.rw} Kelurahan Menteng, Kecamatan Jekan Raya,
                  menerangkan dengan sebenarnya bahwa :
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
                  <Text>Tempat & Tanggal Lahir</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.tanggal_lahir}</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Jenis Kelamin</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.jenis_kelamin}</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Status Perkawinan</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.status_diri}</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>No. KTP / KK</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>
                    {dataLoc?.nik} / {dataLoc?.no_kk}
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
                  <Text>Alamat</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.alamat}</Text>
                </View>
                <View style={styles.gridWrapper}>
                  <Text>Keperluan</Text>
                  <Text style={styles.dot}>:</Text>
                  <Text style={styles.value}>{dataLoc?.jenis_surat}</Text>
                </View>
              </View>

              {/* sign */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "2cm",
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
                  <Text>Pengurus RT</Text>
                  {dataLoc?.status_permohonan == "1" ? (
                    <React.Fragment>
                      <Image src={ttdrw} style={{ width: 70 }} />
                      <Text
                        style={
                          (styles.signPlace,
                          { position: "absolute", bottom: 5 })
                        }
                      >
                        {datauserRT?.username}
                      </Text>
                    </React.Fragment>
                  ) : (
                    <Text
                      style={
                        (styles.signPlace,
                        { position: "absolute", bottom: -30 })
                      }
                    >
                      ....................
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Text>Pengurus RW</Text>
                  {dataLoc?.persetujuan_rw == "1" ? (
                    <React.Fragment>
                      <Image src={ttdrw} style={{ width: 70 }} />
                      <Text
                        style={
                          (styles.signPlace,
                          { position: "absolute", bottom: 3, left: 20 })
                        }
                      >
                        {datauserRW?.username}
                      </Text>
                    </React.Fragment>
                  ) : (
                    <Text
                      style={
                        (styles.signPlace,
                        { position: "absolute", bottom: dataLoc?.persetujuan_rw !== "1" ? -30  : -10})
                      }
                    >
                      ....................
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
