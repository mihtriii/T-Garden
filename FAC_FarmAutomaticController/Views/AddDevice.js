import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import i18next, { languageResources } from "../services/i18next";
import { index } from "d3";
import MyContext from "../DataContext.js";
import apiUrl from "../apiURL.js";
import AppLoader2 from "./AppLoader2.js";
import Toast from "react-native-toast-message";

export default class AddDevice extends Component {
  OpenCamera = () => {
    console.log("Open Camera");
    this.props.navigation.navigate("CameraConnectDevice");
  };

  // ========== Toast ========== //
  showSuccessToast(msg) {
    Toast.show({
      type: "success",
      text1: i18next.t('Success'),
      text2: msg,
    });
  }

  showFailToast(msg) {
    Toast.show({
      type: "error",
      text1: i18next.t('Error'),
      text2: msg,
    });
  }

  state = {
    msg: "",
    selecedCat: "",
    dht_name: "",
    ph_name: "",
    bc_name: "",
    selectedLanguage: "",
    index: "",
    category: [],
    value: [],
    key: [],
    equipment_name: [],
    // dht_id: "",
    // ph_id: "",
    // bc_id: "",
  };

  async onValueChangeCat(value, index) {
    this.setState({ selecedCat: value }, () => {
      this.setState({ index: index }, () => {
        this.getName();
      });
    });
  }

  static contextType = MyContext;
  async componentDidMount() {
    const { route } = this.props;
    const { key, value } = route.params || {};
    const { dataArray } = this.context;
    this.setState({ selecedCat: dataArray[0]["equipment"]["0"]["name"] });
    this.setState({ value: value });
    this.setState({ key: key });
    // Toast.show('This is a long toast.', Toast.LONG);
    // this.setState({ ph_id: id_ph });
    this.getFarm();
    this.getName();
  }

  getName = async () => {
    const { key, value, index } = this.state;
    const { dataArray } = this.context;
    const equipment_name = [];
    console.log(index);
    if (dataArray.length > 0) {
      for (let i = 1; i < key.length; i++) {
        // console.log(key[i])
        if (key[i] === "id_bc") {
          // console.log("cuong")
          const sl = dataArray[0]["equipment"][index.toString()]["bc"]["sl"];
          equipment_name.push("Pump" + (sl + 1).toString());
        } else if (key[i] === "id_dht") {
          // console.log("cuong")
          const sl =
            dataArray[0]["equipment"][index.toString()]["sensor"]["sl_dht"];
          equipment_name.push("DHT" + (sl + 1).toString());
        } else if (key[i] === "id_ph") {
          // console.log("cuong")
          const sl =
            dataArray[0]["equipment"][index.toString()]["sensor"]["sl_ph"];
          equipment_name.push("PH" + (sl + 1).toString());
        }
      }
    }
    this.setState({ equipment_name: equipment_name });
  };
  getFarm = () => {
    const { dataArray } = this.context;
    const Farmlist = [];
    Object.values(dataArray[0]["equipment"]).forEach((obj, index) => {
      const farm = {};
      // console.log(obj["name_esp"])
      farm["itemName"] = obj["name"];
      Farmlist.push(farm);
      // console.log(obj["name"])
    });
    this.setState({ category: Farmlist });
  };
  // console.log(dataArray[0])
  createEquip = async () => {
    // Hiển thị loading
    const { dataArray } = this.context;
    const { value, selecedCat, key, index, equipment_name } = this.state;
    let count = 0;
    let id_sensorinbc = "";
    // console.log(equipment_name)
    for (let i = 0; i < equipment_name.length; i++) {
      if (equipment_name[i] !== "") {
        if (key[i + 1] === "id_dht" || key[i + 1] === "id_ph") {
          id_sensorinbc += value[i + 1];

          // Kiểm tra nếu không phải phần tử cuối cùng thì thêm dấu '-'
          if (i !== equipment_name.length - 1) {
            id_sensorinbc += "-";
          }
        }
        count++;
      } else {
        if (key[i + 1] === "id_bc") {
          this.showFailToast(i18next.t("Invalid Pump Name"));
        } else if (key[i + 1] === "id_dht") {
          this.showFailToast(i18next.t("Invalid DHT Name"));
        } else if (key[i + 1] === "id_ph") {
          this.showFailToast(i18next.t("Invalid PH Name"));
        }
      }
    }
    this.setState({ isLoading: true });

    if (count === equipment_name.length) {
      var id_esp = "";

      Object.values(dataArray[0]["equipment"]).forEach((obj, index) => {
        const farm = {};
        if (obj["name"] === selecedCat) {
          id_esp = obj["id_esp"];
        }
      });
      let count_success = 0;
      for (let i = 0; i < equipment_name.length; i++) {
        if (key[i + 1] === "id_bc") {
          const body_bc = {
            id_esp: id_esp,
            id_equipment: value[i + 1],
            name_equipment: equipment_name[i],
            automode: 0,
            id_sensor: id_sensorinbc,
          };
          // console.log(body_bc)
          var result_bc = await this.postfunction("equidmentmanager", body_bc);
          if (result_bc === "success") {
            count_success++;
          } else {
            this.setState({ isLoading: false });
          }
        } else if (key[i + 1] === "id_dht" || key[i + 1] === "id_ph") {
          const body = {
            id_esp: id_esp,
            id_sensor: value[i + 1],
            name_sensor: equipment_name[i],
            expectedValues: 50.0,
            min_max_values: "60/90",
            status: false,
          };
          console.log(body);
          var result_sensor = await this.postfunction("sensormanager", body);
          if (result_sensor === "success") {
            count_success++;
          } else this.setState({ isLoading: false });
        }
      }
      if (count_success === equipment_name.length) {
        this.props.navigation.navigate("Home");
      } else {
        this.setState({ isLoading: false });
        this.showFailToast("This QR code has already used");
      }
    }
  };

  postfunction = async (route, body) => {
    const url = apiUrl + route;
    let result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      // body: JSON.stringify({
      //   id_esp: id_esp,
      //   id_sensor : dht_id,
      //   name_sensor: dht_name,
      //   expectedValues: 50.0,
      //   min_max_values: "60/90"
      // }),
    });
    result = await result.json();

    return result;
  };
  onChange = (text, index) => {
    this.setState((prevState) => {
      const updatedEquipmentName = [...prevState.equipment_name];
      updatedEquipmentName[index] = text;
      return { equipment_name: updatedEquipmentName };
    });
  };

  render() {
    const { isLoading, key, value, equipment_name } = this.state;
    // const { dataArray } = this.context;

    const equip = [];

    if (key.length !== 0 && value.length !== 0 && equipment_name.length !== 0) {
      [...Array(key.length - 1)].forEach((_, index) => {
        equip.push(
          <TextInput
            key={index}
            maxLength={19}
            value={equipment_name[index]}
            // placeholder={i18next.t((equipment_name[index]).toString())}
            style={styles.input}
            onChangeText={(text) => this.onChange(text, index)}
          />
        );
      });
    }
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
                  <Text style={styles.title}>{i18next.t("Add Device")}</Text>
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
                {equip}
                <View style={styles.optionArea} key="cuong">
                  <View>
                    <Text style={{ color: "#333" }}>
                      {i18next.t("Farm house")}
                    </Text>
                  </View>
                  <View>
                    <Picker
                      style={{ width: 220 }}
                      mode="dropdown"
                      selectedValue={this.state.selecedCat}
                      onValueChange={(value, index) =>
                        this.onValueChangeCat(value, index)
                      }
                      // onValueChange={this.onValueChangeCat.bind(this)}
                    >
                      {this.state.category.map((item, index) => (
                        <Picker.Item
                          color="#333"
                          label={item.itemName}
                          value={item.itemName}
                          index={index}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <Text>{i18next.t(this.state.msg)}</Text>
              </View>
              {isLoading && <AppLoader2 />}
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={this.createEquip}
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
        height: "21.3%",
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
  btnAdd: {
    width: "83%",
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
  optionArea: {
    width: "83%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#edede9",
    paddingLeft: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 16,
    elevation: 1,
  },
});
