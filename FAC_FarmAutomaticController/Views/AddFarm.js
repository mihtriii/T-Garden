import * as React from "react";
import { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import i18next, { languageResources } from "../services/i18next";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class AddFarm extends Component {
  OpenCamera = () => {
    console.log("Open Camera");
    this.props.navigation.navigate("CameraCreateNewFarmHouse");
  };

  OpenCameraDevice = () => {
    console.log("Open Camera");
    this.props.navigation.navigate("CameraConnectDevice");
  };

  AddDevicePage = () => {
    console.log("Add Device Page");
    this.props.navigation.navigate("AddDevice");
  };

  AddFarmFormPage = () => {
    console.log("Add Farm Form Page");
    this.props.navigation.navigate("AddFarmForm");
  };

  render() {
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="#2BA84A" />
        <LinearGradient
          colors={["#2BA84A", "#2BA84A", "#2BA84A"]}
          style={styles.NavigationTop}
        >
          <SafeAreaView
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.title}>{i18next.t("Create Farm House")}</Text>
          </SafeAreaView>
        </LinearGradient>
        <SafeAreaView style={styles.safeContainer}>
          <View style={{ width: "90%" }}>
            <TouchableOpacity style={styles.btnAdd} onPress={this.OpenCamera}>
              <Text style={styles.btnText}>
                {i18next.t("Create new farm house")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={this.OpenCameraDevice}
            >
              <Text style={styles.btnText}>{i18next.t("Add device")}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeContainer: {
    backgroundColor: "white",
    alignItems: "center",
  },
  NavigationTop: {
    ...Platform.select({
      ios: {
        width: "100%",
        height: "18%",
        backgroundColor: "#73A942",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      android: {
        width: "100%",
        height: "14%",
        backgroundColor: "#73A942",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
      },
    }),
  },
  title: {
    ...Platform.select({
        ios: {
            textAlign: "center",
    fontSize: 23,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 28,
        },
        android: {
            textAlign: "center",
            fontSize: 23,
            color: "#fff",
            fontWeight: "bold",
        }
    })
  },
  textLogin: {
    marginLeft: 20,
  },
  input: {
    width: "95%",
    height: 40,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 10,
    borderRadius: 24,
    opacity: 0.9,
    backgroundColor: "#edede9",
  },
  btnAdd: {
    height: 40,
    margin: 10,
    backgroundColor: "#2BA84A",
    justifyContent: "center",
    borderRadius: 20,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
});
