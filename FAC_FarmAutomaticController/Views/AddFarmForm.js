import * as React from "react";
import { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import i18next, { languageResources } from "../services/i18next";
import { BarCodeScanner } from "expo-barcode-scanner";
import apiUrl from "../apiURL";
import MyContext from "../DataContext.js";

export default class AddFarmForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_esp: "",
      name_esp: "",
      descript: "",
      msg: "",
    };
  }
  static contextType = MyContext;

  OpenCamera = () => {
    console.log("Open Camera");
    this.props.navigation.navigate("CameraCreateNewFarmHouse");
  };

  componentDidMount() {
    const { route } = this.props;
    const { id_esp } = route.params || {};
    this.setState({ id_esp: id_esp });
  }
  createFarm = async () => {
    const { descript, name_esp, id_esp } = this.state;
    const { dataArray } = this.context;
    console.log();
    if (id_esp !== "") {
      this.setState({ msg: "" });

      if (name_esp !== "") {
        this.setState({ msg: "" });

        const url = apiUrl + "esps";
        let result = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_user: dataArray[0]["user"]["id"],
            id_esp: id_esp,
            name_esp: name_esp,
            decription: descript,
          }),
        });
        result = await result.json();
        console.log(result);
        if (result) {
          if (result == "Success") {
            this.props.navigation.navigate("Home");
          } else if (result["Message"] == "esp is already use") {
            this.setState({ msg: "This device is already use" });
          } else this.setState({ msg: "Network connect fail" });
        }
      } else this.setState({ msg: "Name farm is null" });
    } else this.setState({ msg: "Scan QR Code again" });
  };
  render() {
    const { msg } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2BA84A" />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={styles.container}
          >
            <View>
              <LinearGradient
                colors={["#2BA84A", "#2BA84A", "#2BA84A"]}
                style={styles.NavigationTop}
              >
                <SafeAreaView
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={styles.title}>
                    {i18next.t("Create Farm House")}
                  </Text>
                </SafeAreaView>
              </LinearGradient>
              <View style={{ alignItems: "flex-end", right: 40 }}>
                <TouchableOpacity
                  style={styles.btnQrCode}
                  onPress={this.OpenCamera}
                >
                  <Text style={styles.btnQrCodeText}>
                    {i18next.t("Scan Qr code")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerContent}>
                <TextInput
                  maxLength={19}
                  placeholder={i18next.t("Farm name")}
                  style={styles.input}
                  onChangeText={(text) => this.setState({ name_esp: text })}
                />
                <TextInput
                  maxLength={99}
                  placeholder={i18next.t("Description")}
                  style={styles.textArea}
                  onChangeText={(text) => this.setState({ descript: text })}
                  multiline={true}
                />
                <Text>{i18next.t(msg)}</Text>
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={this.createFarm}
                >
                  <Text style={styles.btnText}>{i18next.t("Create")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  containerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  NavigationTop: {
    ...Platform.select({
      ios: {
        width: "100%",
        height: "28%",
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
      },
    }),
  },
  textLogin: {
    marginLeft: 20,
  },
  input: {
    width: "85%",
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
    width: "85%",
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
  textArea: {
    width: "85%",
    height: 100,
    margin: 10,
    backgroundColor: "#edede9",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: "top", // Căn văn bản từ trên xuống
  },
  btnQrCode: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#2BA84A",
    borderRadius: 20,
  },
  btnQrCodeText: {
    color: "white",
  },
});
