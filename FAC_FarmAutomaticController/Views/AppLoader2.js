import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import LottieView from "lottie-react-native";

export default class AppLoader2 extends Component {
  render() {
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView
          source={require("../assets/img/loader2.json")}
          autoPlay
          loop
          style={{ width: "20%", height: "20 %"}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 1,
  },
});
