import React from "react";
import {
  Page,
  Text,
  Font,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

// Register Font
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 35,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    display: "table",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    width: "45%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
  },
});

const PDFFile = ({
  user,
  brand,
  partyDate,
  weddingHall,
  weddingHallType,
  weddingServices = [],
}) => {
  let total =
    weddingHallType === "MORNING"
      ? weddingHall.morningPrice
      : weddingHallType === "NOON"
      ? weddingHall.noonPrice
      : weddingHallType === "EVENING"
      ? weddingHall.eveningPrice
      : weddingHall.weekendPrice;
  weddingServices?.forEach((ws) => (total += ws.weddingServicePrice));
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          <Text style={{ textAlign: "center" }}>
            ================ RESTAURANT BILL ================
          </Text>
        </Text>
        <Text style={{ marginTop: "30px" }}>
          Date Order:{" "}
          {new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .replace("T", " ")
            .slice(0, 16)}
        </Text>
        <Text style={{ marginTop: "30px" }}>
          Party Date: {partyDate?.replace("T", " ")}
        </Text>
        <Text style={{ textAlign: "center", marginTop: "30px" }}>Brand</Text>{" "}
        <Text>Brand Name: {brand.brandName}</Text>{" "}
        <Text>Brand Address: {brand.brandAddress}</Text>
        <Text style={{ textAlign: "center", marginTop: "30px" }}>Customer</Text>
        <Text>Customer Name: {user.firstName + " " + user.lastName}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Phone Number: {user.phoneNumber}</Text>{" "}
        <Text>Address: {user.address}</Text>
        <Text style={{ textAlign: "center", marginTop: "30px" }}>
          Wedding Hall
        </Text>
        <Text>Wedding Hall Type: {weddingHallType}</Text>
        <Text>Wedding Hall Name: {weddingHall.weddingHallName}</Text>{" "}
        <Text>Wedding Hall Location: {weddingHall.weddingHallLocation}</Text>
        <Text>
          Wedding Hall Price:{" "}
          {weddingHallType === "MORNING"
            ? weddingHall.morningPrice
            : weddingHallType === "NOON"
            ? weddingHall.noonPrice
            : weddingHallType === "EVENING"
            ? weddingHall.eveningPrice
            : weddingHall.weekendPrice}
        </Text>
        <Text style={{ marginTop: "30px" }}>Wedding Hall Services</Text>
        <View style={{ ...styles.table, marginTop: "10px" }}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={{ ...styles.tableCell, width: "10%" }}>
              <Text></Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Wedding Service Name</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Wedding Service Price</Text>
            </View>
          </View>
          {weddingServices?.map((x, index) => (
            <View style={styles.tableRow} key={x.id}>
              <View style={{ ...styles.tableCell, width: "10%" }}>
                <Text>{index + 1}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{x.weddingServiceName}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{x.weddingServicePrice}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text>Total: {total} vnđ</Text>
        <Text style={{ textAlign: "right", marginTop: "50px" }}>
          Thanks you! See you later!
        </Text>
      </Page>
    </Document>
  );
};

export default PDFFile;
