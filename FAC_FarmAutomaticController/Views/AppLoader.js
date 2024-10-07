import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import LottieView from "lottie-react-native";

export default class AppLoader extends Component {
  render() {
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView
          source={require("../assets/img/loading.json")}
          autoPlay
          loop
          style={{ width: "100%", height: "100 %"}}
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
