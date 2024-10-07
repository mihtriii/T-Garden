import * as React from "react";
import { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import i18next, { languageResources } from "../services/i18next";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import languagesList from "../services/languagesList.json";
import MyContext from "../DataContext";
const screenWidth = Dimensions.get("window").width;
const squareWidth = screenWidth * 0.9;

export default class User extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      isBottomSheetOpen: false,
      selectedLanguage: "vi",
    };
    this.snapPoint = ["25%"];
    this.bottomSheetRef = React.createRef();
  }

  handleClosePress = () => this.bottomSheetRef.current?.close();
  handleOpenPress = () => this.bottomSheetRef.current?.expand();

  // Phương thức mở hoặc đóng BottomSheet
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

  renderBackdrop = () => (
    <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} />
  );

  changeLng = async (lng) => {
    i18next.changeLanguage(lng);
    this.setState({ selectedLanguage: lng });
  };

  renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.changeLng(item.key);
        this.handleClosePress();
      }}
    >
      <Text style={styles.bottomSheetLngText}>
        {i18next.t(item.nativeName)}
      </Text>
      <View style={styles.line}></View>
    </TouchableOpacity>
  );

  // ========== Change page ========== //
  PakagePremiumPage = () => {
    console.log("Pakage Premium Page");
    this.props.navigation.navigate("PremiumPakage");
  };
  signout = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    const { dataArray } = this.context;
    return (
      <View style={styles.container}>
        <GestureHandlerRootView style={styles.container}>
          <LinearGradient
            colors={["#2BA84A", "#2BA84A", "#2BA84A"]}
            style={styles.NavigationTop}
          >
            <SafeAreaView
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 100,
              }}
            >
              <Text style={styles.title}>{i18next.t("User information")}</Text>
            </SafeAreaView>
          </LinearGradient>
          <SafeAreaView style={styles.safeContainer}>
            <View style={[styles.userArea, styles.shadow]}>
              <View>
                <Image
                  source={require("../assets/img/avatar_user.jpg")}
                  style={styles.avatar}
                />
              </View>
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text style={styles.textInfo}>
                  {i18next.t("Username")}: {dataArray[0]["user"]["name"]}
                </Text>
                <Text style={styles.textInfo}>
                  Email: {dataArray[0]["user"]["gmail"]}
                </Text>
                {/* <Text style={styles.textInfo}>
                  {i18next.t("Phone")}: {dataArray[0]["user"]["phone_no"]}
                </Text> */}
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.text,
                  { color: "gray", marginTop: 20, marginBottom: 0 },
                ]}
              >
                {i18next.t("Setting")}
              </Text>
              {Platform.OS === "android" && (
                <View style={styles.settingContent}>
                  <Text style={styles.text}>{i18next.t("Language")}</Text>
                  <Picker
                    selectedValue={this.state.selectedLanguage}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                      this.changeLng(itemValue)
                    }
                  >
                    {Object.keys(languageResources)
                      .sort()
                      .map((key, index) => (
                        <Picker.Item
                          key={index}
                          label={i18next.t(languagesList[key].nativeName)}
                          value={key}
                        />
                      ))}
                  </Picker>
                </View>
              )}
              {Platform.OS === "ios" && (
                <View style={styles.settingContent}>
                  <TouchableOpacity
                    style={styles.languageArea}
                    // onPress={this.handleOpenPress}
                    onPress={this.toggleBottomSheet}
                  >
                    <Text style={styles.text}>{i18next.t("Language")}</Text>
                    <Text style={styles.text}>
                      {i18next.t(
                        languagesList[this.state.selectedLanguage].nativeName
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.line}></View>
              <View style={styles.settingContent}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={this.PakagePremiumPage}
                >
                  <Text style={[styles.text]}>{i18next.t("Update")}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.line}></View>
              <View style={styles.settingContent}>
                <TouchableOpacity style={styles.btn} onPress={this.signout}>
                  <Text style={[styles.text]}>{i18next.t("Sign out")}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.line}></View>
            </View>
          </SafeAreaView>
          {Platform.OS === "ios" && (
            <BottomSheet
              ref={this.bottomSheetRef}
              snapPoints={this.snapPoint}
              enablePanDownToClose={true}
              index={this.state.isBottomSheetOpen ? 0 : -1}
            >
              <View>
                <Text style={[{ color: "gray", fontSize: 20, marginLeft: 10 }]}>
                  {i18next.t("Languages")}
                </Text>
                <FlatList
                  style={{ marginBottom: 50 }}
                  data={Object.keys(languageResources)
                    .sort()
                    .map((key) => ({
                      key,
                      nativeName: languagesList[key].nativeName,
                    }))}
                  renderItem={this.renderLanguageItem}
                  keyExtractor={(item) => item.key}
                />
              </View>
            </BottomSheet>
          )}
        </GestureHandlerRootView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //Line
  line: {
    borderWidth: 0.5,
    borderColor: "#DEDEDE",
  },
  text: {
    fontSize: 16,
    marginRight: 10,
  },
  safeContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userArea: {
    width: "90%",
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 120,
  },
  textInfo: {
    width: "100%",
    marginTop: 3,
    marginBottom: 3,
    // paddingRight: 50,
    fontSize: 15,
    overflow: "hidden",
  },
  NavigationTop: {
    ...Platform.select({
      ios: {
        width: "100%",
        height: "14%",
        backgroundColor: "#73A942",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginBottom: 10,
        // alignItems: "center",
        // justifyContent: "center",
      },
      android: {
        width: "100%",
        height: 80,
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
    textAlign: "center",
    fontSize: 23,
    color: "#fff",
    textAlignVertical: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  square: {
    width: squareWidth * 0.5,
    height: squareWidth * 0.5,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  circleOutSide: {
    width: 110,
    height: 110,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  circleInSide: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 38,
    fontWeight: "bold",
  },
  picker: {
    width: 170,
    right: -10,
  },
  settingContent: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
  },
  languageArea: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomSheetLngText: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 16,
  },
});
