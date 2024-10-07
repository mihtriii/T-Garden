import * as React from "react";
import { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import i18next, { languageResources } from "./services/i18next";
import "react-native-gesture-handler";
import MyContext from "./DataContext.js";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Toast from 'react-native-toast-message';

import Login from "./Views/Login";
import SignUp from "./Views/SignUp";
import Home from "./Views/Home";
import Details from "./Views/Details";
import History from "./Views/History";
import AddFarm from "./Views/AddFarm";
import User from "./Views/User.js";
import ForgotPassword from "./Views/ForgotPassword.js";
import OTP from "./Views/OTP.js";
import CameraCreateNewFarmHouse from "./Views/CameraCreateNewFarmHouse.js";
import CameraConnectDevice from "./Views/CameraConnectDevice.js";
import AddDevice from "./Views/AddDevice.js";
import PremiumPakage from "./Views/PremiumPakage.js";
import ChangePassword from "./Views/ChangePassword.js";
import AddFarmForm from "./Views/AddFarmForm.js";
import AdvanceSettingDevice from "./Views/AdvanceSettingDevice.js";
import CheckOut from "./Views/CheckOut.js";
import UpdateFarmForm from "./Views/UpdateFarmForm.js";
import DateTime from "./Views/DateTime.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tạo Stack Navigator
function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="AddFarm" component={AddFarm} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="UpdateFarmForm" component={UpdateFarmForm} />
      <Stack.Screen
        name="CameraCreateNewFarmHouse"
        component={CameraCreateNewFarmHouse}
      />
      <Stack.Screen
        name="CameraConnectDevice"
        component={CameraConnectDevice}
      />
      <Stack.Screen name="AddDevice" component={AddDevice} />
      <Stack.Screen name="AddFarmForm" component={AddFarmForm} />
      <Stack.Screen
        name="AdvanceSettingDevice"
        component={AdvanceSettingDevice}
      />
      <Stack.Screen name="DateTime" component={DateTime} />
      {/* <Toast/> */}
    </Stack.Navigator>
  );
}

// Tạo Tab Navigator
function TabNavigator() {
  const { height } = Dimensions.get("window");
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ebf2f2",
          height:  height>1000 ? "7%" : "10%",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/img/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#2BA84A" : "#333",
                }}
              />
              <Text
                style={{
                  color: focused ? "#2BA84A" : "#333",
                  fontSize: 12,
                  width: 70,
                  textAlign: "center",
                }}
              >
                {i18next.t("Home")}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddFarm"
        component={AddFarm}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity onPress={() => navigation.navigate("AddFarm")}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor: "#2BA84A",
                  borderRadius: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  top: "-50%",
                }}
              >
                <Image
                  source={require("./assets/img/plus.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "#fff",
                    
                  }}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Us"
        component={User}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/img/user.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#2BA84A" : "#333",
                }}
              />
              <Text
                style={{
                  color: focused ? "#2BA84A" : "#333",
                  fontSize: 12,
                  width: 60,
                  textAlign: "center",
                }}
              >
                {i18next.t("User")}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Tạo Thông Báo Ngoài Màn Hình
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default RootComponent = function () {
  const [expoPushToken, setExpoPushToken] = useState();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  // const [contextData, setContextData] = useState([]);

  // const updateContextData = (newData) => {
  //   setContextData({ ...contextData, ...newData });
  // };
  // const [dataArray, setDataArray] = useState([{ id_user: 'CT0001' }, {id_esp1: "ESP0001", id_esp2: "ESP002"}]);
  const [dataArray, setDataArray] = useState([]);

  // Hàm để thêm phần tử mới vào mảng
  // const addData = (newItem) => {
  //   setDataArray([...dataArray, newItem]);
  // };
  const addDataAtIndex = (newItem, index) => {
    // Sao chép mảng ban đầu để tránh thay đổi trực tiếp mảng gốc
    const newDataArray = [...dataArray];

    // Ghi đè giá trị mới vào index được chỉ định
    newDataArray.splice(index, 1, newItem);

    // Cập nhật mảng mới vào state
    setDataArray(newDataArray);
  };

  return (
    <MyContext.Provider value={{ dataArray, addDataAtIndex }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="PremiumPakage" component={PremiumPakage} />
          <Stack.Screen name="CheckOut" component={CheckOut} />
        </Stack.Navigator>
        <Toast/>
      </NavigationContainer>
    </MyContext.Provider>
  );
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "your-project-id",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const style = StyleSheet.create({});
