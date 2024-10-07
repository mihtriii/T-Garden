import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
  Switch,
  TextInput,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import i18next from "../services/i18next";
import * as Notifications from "expo-notifications";
import MyContext from "../DataContext.js";
import apiUrl from "../apiURL.js";

export default class AdvanceSettingDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connect: "connected",
      name_farm: "",
      description: "",
      msg: "",
    };
  }

  // ============== Change Page ============== //
  DetailPage = () => {
    // console.log(index)
    this.props.navigation.navigate("Details");
  };


  static contextType = MyContext;
  componentDidMount() {
    const { dataArray } = this.context;
    this.setState({ name_farm: dataArray[1]["name"] });
    this.setState({ description: dataArray[1]["decription"] });
  }
  updateFarm = async () => {
    const { name_farm, description } = this.state;
    const { dataArray } = this.context;

    console.log(name_farm);
    console.log(description);
    if (name_farm !== "") {
      this.setState({ msg: "" });
      const url = apiUrl + "esps";
      let result = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_esp: dataArray[1]["id_esp"],
          name_esp: name_farm,
          decription: description,
        }),
      });
      result = await result.json();
      if (result) {
        if (result == "Update Esp Success") {
          this.props.navigation.navigate("Home");
        } else if (result["Message"] == "Can't update esp") {
          this.setState({ msg: "Update fail" });
        } else this.setState({ msg: "Update fail" });
      }
    } else this.setState({ msg: "Invalid farm name" });
  };

  render() {
    const { name_farm, description, msg } = this.state;

    return (
      <View style={styles.container}>
        <GestureHandlerRootView style={styles.container}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              style={styles.container}
            >
              <View style={styles.container}>
                <LinearGradient
                  colors={["#2BA84A", "#2BA84A", "#2BA84A"]}
                  style={styles.NavigationTop}
                >
                  <SafeAreaView
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.title}>
                      {i18next.t("Farm infomation")}
                    </Text>
                  </SafeAreaView>
                  <SafeAreaView style={styles.btnSetting}>
                    <TouchableOpacity
                      style={{ marginLeft: 20 }}
                      onPress={this.DetailPage}
                    >
                      <Image
                        source={require("../assets/img/left-arrow.png")}
                        style={styles.imgSetting}
                      />
                    </TouchableOpacity>
                  </SafeAreaView>
                </LinearGradient>
                <View style={styles.content}>
                  <View style={styles.flex}>
                    <View style={styles.deviceNameArea}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.deviceName}>FARM NAME</Text>
                        {/* <View style={styles.connectArea}>
                          {connect === "connected" && (
                            <>
                              <View
                                style={[
                                  styles.dot,
                                  { backgroundColor: "#80b918" },
                                ]}
                              ></View>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  marginLeft: 2,
                                  marginRight: 2,
                                  fontSize: 14,
                                }}
                              >
                                {i18next.t("Connected")}
                              </Text>
                            </>
                          )}
                          {connect === "disconnected" && (
                            <>
                              <View
                                style={[
                                  styles.dot,
                                  { backgroundColor: "#E31C1C" },
                                ]}
                              ></View>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  marginLeft: 2,
                                  marginRight: 2,
                                  fontSize: 14,
                                }}
                              >
                                {i18next.t("Disconneted")}
                              </Text>
                            </>
                          )}
                        </View> */}
                      </View>
                    </View>
                  </View>

                  <ScrollView>
                    <View style={styles.flex}>
                      <View style={styles.deviceNameArea}>
                        <Text style={styles.titleSetting}>
                          {i18next.t("Farm")}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.flex}>
                      <View style={{ width: "90%" }}>
                        <TextInput
                          maxLength={19}
                          placeholder={i18next.t("Farm name")}
                          style={styles.input}
                          value={name_farm}
                          onChangeText={(text) =>
                            this.setState({ name_farm: text })
                          }
                        />
                        <TextInput
                          maxLength={99}
                          placeholder={i18next.t("Description")}
                          style={styles.textArea}
                          value={description}
                          onChangeText={(text) =>
                            this.setState({ description: text })
                          }
                        />
                      </View>
                      <Text>{msg}</Text>
                    </View>

                    <View style={styles.flex}>
                      <View style={{ width: "90%" }}>
                        <TouchableOpacity
                          style={styles.btnSave}
                          onPress={this.updateFarm}
                        >
                          <Text style={styles.btnSaveText}>Save</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    justifyContent: "center",
    alignItems: "center",
  },
  switch: {
    ...Platform.select({
      ios: {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
      },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  NavigationTop: {
    ...Platform.select({
      ios: {
        width: "100%",
        height: "18%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#73A942",
      },
      android: {
        width: "100%",
        height: "14%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#73A942",
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
        marginTop: 5,
      },
      android: {
        textAlign: "center",
        marginTop: -25,
        fontSize: 23,
        color: "#fff",
        fontWeight: "bold",
      },
    }),
  },
  btnSetting: {
    width: "100%",
    position: "absolute",
    top: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgSetting: {
    width: 23,
    height: 23,
    tintColor: "white",
  },
  content: {
    flex: 1,
    top: -23,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },
  deviceNameArea: {
    width: "90%",
    marginBottom: 8,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleSetting: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: -5,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 10,
    borderRadius: 24,
    opacity: 0.9,
    backgroundColor: "#edede9",
  },
  textArea: {
    width: "100%",
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#edede9",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: "top", // Căn văn bản từ trên xuống
  },
  btnSave: {
    height: 36,
    backgroundColor: "#2BA84A",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSaveText: {
    color: "white",
    fontWeight: "500",
  },

  // ========== Connect Status ==========//
  connectArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12,
    paddingTop: 3,
    paddingBottom: 3,
  },
  dot: {
    width: 7,
    height: 7,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 12,
  },
});
