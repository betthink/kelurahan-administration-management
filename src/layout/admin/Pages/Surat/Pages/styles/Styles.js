import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    backgroundColor: "#fff",
    paddingTop: "1cm", // Set top margin
    paddingRight: "3.18cm", // Set right margin
    paddingBottom: "2.54cm", // Set bottom margin
    paddingLeft: "3.18cm", // Set left margin
  },
  section: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  section1: {
    justifyContent: "center",
    flexDirection: "row",
  },
  gridItem: {
    width: "33.33%",
    padding: 5,
  },
  text: {
    fontFamily: "Times-Roman", // Set font family to Times New Roman
    fontSize: "0.42cm", // Set font size to 11
  },
  header: {
    fontFamily: "Times-Roman", // Set font family to Times New Roman
    fontSize: "0.44cm",
    fontWeight: "extrabold",
  },
  textCenter: {
    justifyContent: "center",
    flexDirection: "row",
    textDecoration: "underline",
    fontWeight: "bold",
  },
  gridWrapper: {
    flexDirection: "row",
    textAlign: "left",
    marginBottom: "0.13cm",
  },
  gridWrapper1: {
    flexDirection: "row",
    textAlign: "left",
    marginBottom: "0.33cm",
  },
  dot: {
    position: "absolute",
    left: 160,
  },
  dot1: {
    position: "absolute",
    right:76 ,
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
  paragraf: {
    textAlign: "justify",
    marginVertical: "0.23cm",
    lineHeight: 1.5,
  },
  paragrafNoAlinea: {
    textAlign: "justify",
    lineHeight: 1.5,
  },
});
export default styles;
