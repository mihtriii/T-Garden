import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  StatusBar,
  SafeAreaView,
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
import Toast from "react-native-toast-message";

export default class AdvanceSettingDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connect: "connected",
      showSetting: "Setting",
      showPicker: false,
      offset: "",
      listEquipment: [],
      msg: "",
      modalVisible: false,
      index: "",
      selectedFarm: "",
      Farm: [],
    };
    this.snapPoint = ["28%", "50%", "75%"];
    this.bottomSheetRef = React.createRef();
  }

  // ========== Toast ========== //
  showSuccessToast(msg) {
    Toast.show({
      type: "success",
      text1: i18next.t("Success"),
      text2: msg,
    });
  }

  showFailToast(msg) {
    Toast.show({
      type: "error",
      text1: i18next.t("Error"),
      text2: msg,
    });
  }

  // ============== Bottom Sheet ============== //
  // handleClosePress = () => this.bottomSheetRef.current?.close();
  // handleOpenPress = () => this.bottomSheetRef.current?.expand();

  static contextType = MyContext;

  async componentDidMount() {
    const { route } = this.props;
    const { index, Equipment } = route.params || {};
    const { dataArray } = this.context;
    const sensorArray = Object.values(dataArray[1]["sensor"]);
    console.log(dataArray);

    const listEquipment = [];
    // console.log(Equipment);
    console.log("___________________");

    let flag_id = 0;
    listEquipment.push(dataArray[1]["bc"][index]["name_bc"]);
    sensorArray.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (flag_id == 1) {
          flag_id = 0;
          listEquipment.push(item[key]);
        }
        if (Equipment.includes(item[key])) {
          // namesArray.push(item[key]);
          flag_id = 1;
        }
      });
    });

    // console.log(namesArray)

    const url = apiUrl + `getoffset/${dataArray[1]["bc"][index]["id_bc"]}`;
    const response = await fetch(url);

    if (!response.ok) {
      this.showFailToast(i18next.t("NetWork Fail") + "!");
      return;
    }

    // console.log(dataArray[1])
    const json = await response.json();

    // if (dataArray[1]["bc"]["sl"] === 1) {
    //   this.setState({ name_equipment: dataArray[1]["bc"][index]["name_bc"] })
    //   this.setState({ name_dht: dataArray[1]["sensor"][index]["name_dht"] })
    //   this.setState({ name_ph: dataArray[1]["sensor"][(parseInt(index, 10) + 1).toString()]["name_ph"] })
    // }
    // else if (dataArray[1]["bc"]["sl"] === 2) {
    //   this.setState({ name_equipment: dataArray[1]["bc"][index]["name_bc"] })
    //   this.setState({ name_dht: dataArray[1]["sensor"][index]["name_dht"] })
    //   this.setState({ name_ph: dataArray[1]["sensor"][(parseInt(index, 10) + 2).toString()]["name_ph"] })
    // }

    const Farmlist = [];
    Object.values(dataArray[0]["equipment"]).forEach((obj, index) => {
      const farm = {};
      // console.log(obj["name_esp"])
      farm["itemName"] = obj["name"];
      Farmlist.push(farm);
      // console.log(obj["name"])
    });
    this.setState({ listEquipment: listEquipment });
    this.setState({ offset: json["times_offset"].toString() });
    this.setState({ index: index });
    this.setState({ selectedFarm: dataArray[1].name });
    this.setState({ Farm: Farmlist });
  }

  // ============== Picker ============== //
  async onValueChangeCat(value) {
    this.setState({ selecedCat: value });
  }

  // ============== Set Modal View ============== //
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  DetailPage = () => {
    // console.log(index)
    this.props.navigation.navigate("Details");
  };

  // ============== Picker Change Farm ============== //
  async onValueChangeFarm(value) {
    flag = true;
    this.setState({ selectedFarm: value });
  }

  // ============== Flatlist Change Farm ============== //
  // Hàm xử lý khi chọn một farm
  handleFarmSelect = (farm) => {
    this.setState({ selectedFarm: farm });
  };

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  UpdateDevice = async () => {
    const { route } = this.props;
    const { Equipment } = route.params || {};
    const { dataArray, addDataAtIndex } = this.context;
    const { listEquipment, selectedFarm, index } = this.state;

    let flag_update = 0;

    listEquipment.forEach(async (value, index_e) => {
      if (value !== "") {
        flag_update++;
        // console.log(flag_update)
        if (flag_update == listEquipment.length) {
          console.log("2");

          var id_esp = "";
          Object.values(dataArray[0]["equipment"]).forEach((obj, _) => {
            if (obj["name"] === selectedFarm) {
              id_esp = obj["id_esp"];
            }
          });
          const url = apiUrl + "updateequipment";
          let result = await fetch(url, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_esp: id_esp,
              id_equipment: dataArray[1]["bc"][index]["id_bc"],
              name_equipment: listEquipment[0],
            }),
          });
          result = await result.json();
          console.log(result);
          if (result == "success") {
            let count_sensor = 0;
            if (Equipment.length !== 0) {
              Equipment.forEach(async (value, index_sensor) => {
                const url_sensor = apiUrl + "updatesensor";
                let result_sensor = await fetch(url_sensor, {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id_esp: id_esp,
                    id_sensor: value,
                    name_sensor: listEquipment[index_sensor + 1],
                  }),
                });
                result_sensor = await result_sensor.json();
                if (result_sensor == "success") {
                  count_sensor++;
                  if (count_sensor == Equipment.length) {
                    this.showSuccessToast(i18next.t("Update Success"));
                    this.props.navigation.navigate("Home");
                  }
                }
                this.showFailToast(i18next.t("NetWord Fail") + "!");
              });
            } else {
              this.showSuccessToast(i18next.t("Update Success"));
              this.props.navigation.navigate("Home");
            }
          }
          this.showFailToast(i18next.t("NetWord Fail") + "!");
        }
      }
      this.showFailToast(i18next.t("Invalid Name"));
    });

    // if (name_equipment !== "") {
    //   this.setState({ msg: "" })
    //   if (name_dht !== "") {
    //     this.setState({ msg: "" })
    //     if (name_ph !== "") {
    //       this.setState({ msg: "" })
    //       var id_ph = "";
    //       if (dataArray[1]["bc"]["sl"] === 1) {
    //         id_ph = dataArray[1]["sensor"][(parseInt(index, 10) + 1).toString()]["id_ph"]
    //       }
    //       else if (dataArray[1]["bc"]["sl"] === 2) {
    //         id_ph = dataArray[1]["sensor"][(parseInt(index, 10) + 2).toString()]["id_ph"]
    //       }
    //       var id_esp = "";
    //       Object.values(dataArray[0]["equipment"]).forEach((obj, index) => {
    //         const farm = {};
    //         if (obj["name"] === selectedFarm) {
    //           id_esp = obj["id_esp"];
    //         }
    //       });
    //       console.log(id_ph)
    //       const url = apiUrl + "updateequipmentsensor"
    //       let result = await fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           "id_esp": id_esp,
    //           "id_equipment": dataArray[1]["bc"][index]["id_bc"],
    //           "id_dht": dataArray[1]["sensor"][index]["id_dht"],
    //           "id_ph": id_ph,
    //           "name_equipment": name_equipment,
    //           "name_dht": name_dht,
    //           "name_ph": name_ph
    //         }),
    //       });
    //       result = await result.json();

    //       if (result) {
    //         if (result == "Update equipment/sensor success") {
    //           const url_getfarm = apiUrl + `getfarm/${dataArray[0]["user"]["gmail"]}`;
    //           const response = await fetch(url_getfarm);
    //           if (!response.ok) {
    //             Toast.show('NetWork Fail!', Toast.LONG)

    //             return;
    //           }
    //           // console.log(url)
    //           const json = await response.json();
    //           await this.delay(2000);
    //           addDataAtIndex(json[0], 0)
    //           this.props.navigation.navigate('Home');
    //         }
    //         else if (result["Message"] == "Can't not update equipment/sensor") {
    //           this.setState({ msg: "Can't not update equipment/sensor" });
    //         }
    //         else this.setState({ msg: "Net Work fail" });
    //       }

    //     } else this.setState({ msg: "Invalid ph sensor name" })

    //   } else this.setState({ msg: "Invalid dht sensor name" })

    // } else this.setState({ msg: "Invalid Pump name" })
  };

  // Render mỗi mục trong danh sách farm
  // renderFarmItem = ({ item }) => (
  //   <TouchableOpacity onPress={() => this.handleFarmSelect(item.itemName)} key={index}>
  //     <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
  //       <Text>{item.itemName}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  // ============== Change Component To Earch other ============== //
  toggleSetting = (settingType) => {
    this.setState({ showSetting: settingType });
  };

  UpdateDeviceOffset = async () => {
    const { dataArray } = this.context;

    const { offset, index } = this.state;
    const url = apiUrl + "schedules";
    let result = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_equipment: dataArray[1]["bc"][index]["id_bc"],
        times_offset: parseInt(offset, 10),
      }),
    });
    result = await result.json();
    if (result) {
      flag = true;
      if (result == "update time success") {
        console.info("update time success");
        this.showSuccessToast(i18next.t("update duration time success"));
        this.props.navigation.navigate("Details");
      } else if (result["Message"] == "can't add equipment") {
        console.warn("Network fail!");
        this.showFailToast(i18next.t("Network fail") + "!");
      } else {
        // console.warn("cuong");
        console.warn("Network fail!");
        this.showFailToast(i18next.t("Network fail") + "!");
      }
    }
  };

  onChange = (text, index) => {
    this.setState((prevState) => {
      const updatedEquipmentName = [...prevState.listEquipment];
      updatedEquipmentName[index] = text;
      return { listEquipment: updatedEquipmentName };
    });
  };

  // ========== BottomSheet ========== //
  toggleBottomSheet = () => {
    this.setState(
      (prevState) => ({ isBottomSheetOpen: !prevState.isBottomSheetOpen }),
      () => {
        if (this.state.isBottomSheetOpen) {
          this.bottomSheetRef.current.expand();
        } else {
          this.bottomSheetRef.current.close();
        }
      }
    );
  };

  handleClosePress = () => this.bottomSheetRef.current?.close();

  render() {
    const { connect, msg } = this.state;
    const { Farm, selectedFarm, offset } = this.state;
    const { showSetting, listEquipment } = this.state;
    const equip = [];
    // console.log(listEquipment.length);
    if (listEquipment.length !== 0) {
      [...Array(listEquipment.length)].forEach((_, index) => {
        equip.push(
          <TextInput
            key={index}
            maxLength={19}
            // placeholder={i18next.t("pump name")}
            style={styles.input}
            value={listEquipment[index]}
            onChangeText={(text) => this.onChange(text, index)}
          />
        );
      });
    }

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
                      {i18next.t("Device infomation")}
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
                  <View style={styles.optionComponent}>
                    <TouchableOpacity
                      onPress={() => this.toggleSetting("Setting")}
                      style={[
                        styles.btnOptionComponent,
                        {
                          borderBottomColor:
                            showSetting === "Setting" ? "#2BA84A" : "#DEDEDE",
                          borderBottomWidth:
                            showSetting === "Setting" ? 3 : 0.5,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionComponentText,
                          {
                            color:
                              showSetting === "Setting" ? "#2BA84A" : "#DEDEDE",
                          },
                        ]}
                      >
                        {i18next.t("Setting")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.toggleSetting("Farm")}
                      style={[
                        styles.btnOptionComponent,
                        {
                          borderBottomColor:
                            showSetting === "Farm" ? "#2BA84A" : "#DEDEDE",
                          borderBottomWidth: showSetting === "Farm" ? 3 : 0.5,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionComponentText,
                          {
                            color:
                              showSetting === "Farm" ? "#2BA84A" : "#DEDEDE",
                          },
                        ]}
                      >
                        {i18next.t("Farm")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {showSetting === "Setting" && (
                    <View style={styles.flex}>
                      <View style={styles.option}>
                        <View style={styles.optionPart}>
                          <Text
                            style={{
                              fontSize: 16,
                            }}
                          >
                            {i18next.t("Duration")}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              gap: 5,
                              alignItems: "center",
                            }}
                          >
                            <TextInput
                              maxLength={2}
                              style={{
                                width: 60,
                                textAlign: "center",
                                fontSize: 16,
                                backgroundColor: "#edede9",
                                borderRadius: 6,
                              }}
                              onChangeText={(text) =>
                                this.setState({ offset: text })
                              }
                              value={offset}
                            />
                            <Text
                              style={{
                                fontSize: 16,
                              }}
                            >
                              {i18next.t("seconds")}
                            </Text>
                            <TouchableOpacity
                              style={[styles.btnSaveDuration]}
                              onPress={this.UpdateDeviceOffset}
                            >
                              <Image
                                source={require("../assets/img/diskette.png")}
                                style={{
                                  width: 14,
                                  height: 14,
                                  tintColor: "white",
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                  {showSetting === "Farm" && (
                    <>
                      <View style={styles.flex}>
                        <View style={styles.deviceNameArea}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {/* <Text style={styles.deviceName}>{i18next.t("DEVICE NAME")}</Text> */}
                          </View>
                        </View>
                      </View>

                      <ScrollView>
                        <View style={styles.flex}>
                          <View style={styles.deviceNameArea}>
                            <Text style={styles.titleSetting}>
                              {i18next.t("Device")}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.flex}>
                          <View style={{ width: "90%" }}>{equip}</View>
                        </View>
                        <View style={styles.flex}>
                          <View style={styles.option}>
                            <View
                              style={[
                                styles.optionPart,
                                { marginBottom: 6, marginTop: 6 },
                              ]}
                            >
                              <Text>{i18next.t("Farm")}</Text>
                              {Platform.OS === "android" &&
                                Farm.length !== 0 && (
                                  <Picker
                                    style={{ width: 180 }}
                                    mode="dropdown"
                                    selectedValue={selectedFarm}
                                    onValueChange={this.onValueChangeFarm.bind(
                                      this
                                    )}
                                  >
                                    {this.state.Farm.map((item, index) => (
                                      <Picker.Item
                                        key={index}
                                        color="#333"
                                        label={item.itemName}
                                        value={item.itemName}
                                        index={index}
                                      />
                                    ))}
                                  </Picker>
                                )}
                              {Platform.OS === "ios" && Farm.length !== 0 && (
                                <TouchableOpacity
                                  style={styles.changeFarmArea}
                                  // onPress={this.handleOpenPress}
                                  onPress={this.toggleBottomSheet}
                                >
                                  <Text style={styles.text}>
                                    {selectedFarm}
                                  </Text>
                                  <Image
                                    source={require("../assets/img/down.png")}
                                    style={{
                                      width: 12,
                                      height: 12,
                                      tintColor: "#767577",
                                    }}
                                  />
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                          <Text>{msg}</Text>
                        </View>
                        <View style={styles.flex}>
                          <View style={{ width: "90%" }}>
                            <TouchableOpacity
                              style={styles.btnSave}
                              onPress={this.UpdateDevice}
                            >
                              <Text style={styles.btnSaveText}>Save</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </ScrollView>
                    </>
                  )}
                </View>
                {Platform.OS === "ios" && (
                  <BottomSheet
                    ref={this.bottomSheetRef}
                    snapPoints={this.snapPoint}
                    enablePanDownToClose={true}
                    index={this.state.isBottomSheetOpen ? 0 : -1}
                  >
                    <View>
                      <Text
                        style={{ color: "gray", fontSize: 20, marginLeft: 10 }}
                      >
                        {i18next.t("Farm")}
                      </Text>
                      <FlatList
                        style={{ marginBottom: 50 }}
                        data={Farm}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              this.onValueChangeFarm(item.itemName);
                              this.handleClosePress(); // Đóng BottomSheet sau khi chọn
                            }}
                          >
                            <Text style={styles.bottomSheetLngText}>
                              {item.itemName}
                            </Text>
                            <View style={styles.line}></View>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </BottomSheet>
                )}
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
  line: {
    borderWidth: 0.5,
    borderColor: "#DEDEDE",
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
  },
  optionComponent: {
    height: 58,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  btnOptionComponent: {
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    // borderBottomWidth: 0.5,
    // borderColor: "#DEDEDE",
  },
  optionComponentText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "500",
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
  option: {
    ...Platform.select({
      ios: {
        padding: 8,
      },
      android: {
        paddingLeft: 8,
        paddingRight: 8,
      },
    }),
    width: "90%",
    marginTop: 6,
    marginBottom: 8,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  optionPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  btnSaveDuration: {
    width: 42,
    height: 26,
    marginLeft: 5,
    borderRadius: 6,
    backgroundColor: "#2BA84A",
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 23,
    opacity: 0.9,
    backgroundColor: "#edede9",
  },
  changeFarmArea: {
    width: "70%",
    gap: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  btnSave: {
    height: 36,
    marginTop: 5,
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

  // ========== Modal Area ==========//
  modalTopArea: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeModalTimer: {
    width: 20,
    height: 20,
    marginRight: 20,
    tintColor: "#DEDEDE",
  },
  timerTitleText: {
    fontSize: 23,
    fontWeight: "800",
    marginLeft: 20,
  },
  bottomSheetLngText: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 16,
  },
});
