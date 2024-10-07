import * as React from "react";
import { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import i18next from "../services/i18next";
import MyContext from "../DataContext.js";
import apiUrl from "../apiURL.js";
import { index } from "d3";
var flag = false;

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      historyList: [],
    };
  }

  // ========== Change Page ========== //
  DetailPage = () => {
    console.log("Detail Page");
    flag = true;
    this.props.navigation.navigate("Details"); // 'History' là tên của màn hình History trong định tuyến của bạn
  };

  // ========== Context ========== //
  static contextType = MyContext;
  gethistory = async () => {
    // api/history/{id_esp}/{strtimebegin}/{strtimeend}
    //string dateString = "2024-03-21-14-59-59"

    const { dataArray } = this.context;
    const historyList = [];
    const date = new Date();
    // Lấy năm, tháng, ngày, giờ, phút và giây từ đối tượng Date
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const timebegin = `2023-${month}-${day}-${hours}-${minutes}-${seconds}`;
    const timeend = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

    var url =
      apiUrl + `history/${dataArray[1]["id_esp"]}/${timebegin}/${timeend}`;
    // console.log(url)
    const response = await fetch(url);
    if (!response.ok) {
      this.setState({ msg: "error" });
      return;
    }
    const json = await response.json();
    // Chuyển đổi object equipment thành một mảng các cặp key-value
    const equipmentArray = Object.entries(json[0]["equipment"]);

    Object.values(json[0]["schedule"]).forEach((obj, index) => {
      const history = [];
      const idEquipment = obj["id_equipment"];

      // Tìm thiết bị tương ứng trong bảng equipment
      const equipment = equipmentArray.find(
        ([key, value]) => value.id === idEquipment
      );

      // Nếu tìm thấy thiết bị, thêm tên của thiết bị vào lịch sử
      if (equipment) {
        history.push(equipment[1].name);
      } else {
        history.push("Unknown"); // Nếu không tìm thấy thiết bị
      }

      // Tách chuỗi dựa trên ký tự 'T' để lấy phần ngày và thời gian
      const [datePart, timePart] = obj["datetime"].split("T");

      // Chuyển đổi ngày sang đối tượng Date
      const date = new Date(datePart);

      // Lấy thứ, ngày/tháng/năm và thời gian
      const options = {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      // const weekday = date.toLocaleString('vi-VN', { weekday: 'long' });
      const timeString = timePart;

      if (i18next.t("dateFormat") == "en-EN") {
        const dateString = date.toLocaleDateString("en-EN", options);
        history.push(dateString);
      } else if (i18next.t("dateFormat") == "vi-VI") {
        const dateString = date.toLocaleDateString("vi-VI", options);
        history.push(dateString);
      }
      // history.push()
      history.push(timeString);
      history.push(obj["status"]);
      historyList.push(history);
    });
    // console.log(historyList)

    this.setState({ historyList: historyList });
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.gethistory();
    }, 2000);
  }

  render() {
    const { historyList } = this.state;
    const history = [];
    // if (flag) {
    //   flag = false;
    //   // Sử dụng forEach để thêm các phần tử vào mảng items
    //   [...Array(historyList.length)].forEach((_, index) => {
    //     const timeParts = historyList[index][2].split(".");
    //     const timeString = timeParts[0];

    //     history.push(
    //       <View key={index}>
    //         <View style={{ alignItems: "center", justifyContent: "center" }}>
    //           <View style={styles.lineHistoy}>
    //             {Platform.OS === "ios" && (
    //               <>
    //                 <Text style={{ width: 170 }}>
    //                   {historyList[index][1]}
    //                 </Text>
    //                 <Text style={{ width: 65 }}>
    //                   {historyList[index][0]}
    //                 </Text>
    //                 <Text style={{ width: 72 }}>
    //                   {timeString}
    //                 </Text>
    //               </>
    //             )}
    //             {Platform.OS === "android" && (
    //               <>
    //                 <Text style={{ width: 150 }}>
    //                   {historyList[index][1]}
    //                 </Text>
    //                 <Text style={{ width: 55 }}>
    //                   {historyList[index][0]}
    //                 </Text>
    //                 <Text style={{ width: 60, }}>
    //                   {timeString}
    //                 </Text>
    //               </>
    //             )}
    //           </View>
    //           <View
    //             style={{
    //               width: "95%",
    //               height: 0.5,
    //               backgroundColor: "#D9D9D9",
    //               marginBottom: 2,
    //             }}
    //           ></View>
    //         </View>
    //       </View>
    //     );
    //   });
    // }

    // lịch sử version 2
    // const historyDate = [];
    // const historyTime = [];
    // if (historyList.length != 0) {
    //   [...Array(4)].forEach((_, indexDate) => {
    //     const historyTimes = [];

    //     [...Array(3)].forEach((_, indexTime) => {
    //       historyTimes.push(
    //         <View key={`${indexDate}-${indexTime}`} style={{ marginLeft: 16 }}>
    //           <View style={{ flexDirection: "row" }}>
    //             <View
    //               style={[
    //                 {
    //                   flexDirection: "row",
    //                   alignItems: "center",
    //                   gap: 4,
    //                   width: 140,
    //                 },
    //               ]}
    //             >
    //               <View style={styles.dot}></View>
    //               <Text>{indexTime}/12/2024</Text>
    //             </View>
    //             <Text>TBC000{indexTime}: Đã mở</Text>
    //           </View>

    //           <View style={styles.verticalLine}></View>
    //         </View>
    //       );
    //     });

    //     historyDate.push(
    //       <View key={indexDate}>
    //         <View style={{}}>
    //           <View
    //             style={{
    //               width: "100%",
    //               flexDirection: "row",
    //               justifyContent: "space-between",
    //             }}
    //           >
    //             <Text style={{ fontSize: 16, fontWeight: "500" }}>
    //               1{indexDate}/04/2024
    //             </Text>
    //             <Text
    //               style={{ marginRight: 10, fontSize: 16, fontWeight: "500" }}
    //             >
    //               T4
    //             </Text>
    //           </View>
    //           <View style={[styles.verticalLine, { marginLeft: 20 }]}></View>
    //           <View>{historyTimes}</View>
    //         </View>
    //       </View>
    //     );
    //   });
    // }

    // Tạo một đối tượng để nhóm các mục theo ngày
    const groupedHistory = {};
    historyList.forEach((item) => {
      const date = item[1]; // Lấy ngày từ mục
      const time = item[2]; // Lấy thời gian từ mục
      const device = item[0]; // Lấy hành động từ mục
      const status = item[3]; // Lấy trạng thái từ mục

      // Tách ngày thành "Thứ Tư" và "17/04/2024"
      const [dayOfWeek, dateString] = date.split(", ");

      // Nếu chưa có mục nào cho ngày này, tạo một mảng mới
      if (!groupedHistory[dateString]) {
        groupedHistory[dateString] = [];
      }
      // console.log(time +" - " + dayOfWeek);
      // Thêm mục vào mảng tương ứng với ngày
      groupedHistory[dateString].push({ dayOfWeek, time, device, status });
    });

    const renderedHistory = Object.entries(groupedHistory).map(
      ([date, devices], index) => (
        <View key={index}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginLeft: 3, fontSize: 16, fontWeight: "500" }}>{date}</Text>
            {devices.length > 0 && (
              <Text
                style={{ marginRight: 10, fontSize: 16, fontWeight: "500" }}
              >
                {i18next.t(devices[0].dayOfWeek)}
              </Text>
            )}
          </View>
          <View style={[styles.verticalLine, { marginLeft: 20 }]}></View>
          <View>
            {devices.map((devices, index) => (
              <View key={index} style={{ marginLeft: 16 }}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[
                      {
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        width: 140,
                      },
                    ]}
                  >
                    <View style={styles.dot}></View>
                    <Text>{devices.time.substring(0, 8)}</Text>
                  </View>
                  {devices.status === 1 && (
                    <Text>{devices.device}: {i18next.t("On")}</Text>
                  )}
                  {devices.status === 0 && (
                    <Text>{devices.device}: {i18next.t("Off")}</Text>
                  )}
                </View>
                <View style={styles.verticalLine}></View>
              </View>
            ))}
          </View>
        </View>
      )
    );

    return (
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
            <Text style={styles.title}>{i18next.t("History")}</Text>
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
        <View style={styles.body}>
          <View
            style={{
              // justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 26,
                marginBottom: 10,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text style={styles.date}>{i18next.t("Date")}</Text>
              <Text style={styles.device}>{i18next.t("Device")}</Text>
              <Text style={styles.time}>{i18next.t("Time")}</Text>
            </View> */}
            <ScrollView 
              style={{paddingTop: 26}}
              showsVerticalScrollIndicator={false}
            >
              {/* {history} */}
              {renderedHistory}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
        backgroundColor: "#2BA84A",
      },
      android: {
        width: "100%",
        height: "14%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2BA84A",
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
  body: {
    flex: 1,
    top: -23,
    // paddingTop: 23,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  lineHistoy: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
    gap: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 18,
    backgroundColor: "#2BA84A",
  },
  verticalLine: {
    width: "0.6%",
    height: 20,
    marginLeft: 4,
    backgroundColor: "#D9D9D9",
    marginTop: 2,
    marginBottom: 2,
  },
  date: {
    ...Platform.select({
      ios: {
        fontWeight: "bold",
        fontSize: 14,
        width: 170,
        textAlign: "center",
      },
      android: {
        fontWeight: "bold",
        fontSize: 14,
        width: 150,
        textAlign: "center",
      },
    }),
  },
  time: {
    ...Platform.select({
      ios: { fontWeight: "bold", fontSize: 14, width: 70, textAlign: "center" },
      android: {
        fontWeight: "bold",
        fontSize: 14,
        width: 60,
        textAlign: "center",
        textAlignVertical: "center",
      },
    }),
  },
  device: {
    ...Platform.select({
      ios: {
        fontWeight: "bold",
        fontSize: 14,
        width: 65,
        textAlign: "center",
      },
      android: {
        fontWeight: "bold",
        fontSize: 14,
        width: 55,
        textAlign: "center",
      },
    }),
  },
});
