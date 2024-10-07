import * as React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Statusbar,
  TextInput,
  Image,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import i18next, { languageResources } from "../services/i18next";
import apiUrl from "../apiURL";

const { height } = Dimensions.get("window");

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernamme: "",
      email: "",
      password: "",
      verifypassword: "",
      msg: "",
      showPassword: false,
      showPasswordHint: false,
    };
  }

  LoginPage = async () => {
    const { usernamme, email, password, verifypassword } = this.state;
    if (usernamme != "") {
      this.setState({ msg: "hh" });
      if (this.validateEmail(email)) {
        this.setState({ msg: "" });
        if (password.length >= 6) {
          this.setState({ msg: "" });
          if (verifypassword != "" && password == verifypassword) {
            this.setState({ msg: "" });
            const url = apiUrl + "user";
            let result = await fetch(url, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id_user: "CT0001",
                gmail: email,
                password: password,
                name: usernamme,
                phone_no: "",
                date_created: "2024-03-25T10:00:00",
                membership: "basic",
              }),
            });
            result = await result.json();
            if (result) {
              console.log(result);
              if (result == "Added Success") {
                this.props.navigation.navigate("Login");
              } else if (result["Message"] == "email is already use") {
                this.setState({ msg: "Email is already use" });
              } else this.setState({ msg: "Network connect fail" });
            }
          } else
            this.setState({
              msg: "Password and  verify password  do not match",
            });
        } else
          this.setState({ msg: "Password must have at least 6 characters" });
      } else this.setState({ msg: "Invalid email" });
    } else this.setState({ msg: "Invalid username" });
  };

  validateEmail = (email) => {
    // Biểu thức chính quy để kiểm tra email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  togglePasswordVisibility = () => {
    this.setState(
      (prevState) => ({ showPassword: !prevState.showPassword }),
      this.toggleVerifyPasswordVisibility
    );
  };

  // ========== Password Hint ========== //
  handlePasswordChange = (text) => {
    this.setState({ verifypassword: text });
    if (text.length >= 6) {
      this.setState({ passwordValid: true });
    } else {
      this.setState({ passwordValid: false });
    }
  };

  render() {
    const { showPassword } = this.state;
    const { msg } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={styles.container}
          >
            <View style={styles.container}>
              <Image
                source={require("../assets/img/pH.png")}
                style={styles.img}
              />
              <Text style={styles.textLogin}>{i18next.t("SignUp")}</Text>
              <View style={styles.inputArea}>
                <Image
                  source={require("../assets/img/user01.png")}
                  style={styles.imgInput}
                />
                <Text
                  style={{ color: "#2BA84A", marginLeft: 4, marginRight: 2 }}
                >
                  |
                </Text>
                <TextInput
                  style={styles.inputAccount}
                  onChangeText={(text) => this.setState({ usernamme: text })}
                  placeholder={i18next.t("Username")}
                />
              </View>
              <View style={styles.inputArea}>
                <MCIcon name="email" size={28} color={"#2BA84A"} />
                <Text
                  style={{ color: "#2BA84A", marginLeft: 4, marginRight: 2 }}
                >
                  |
                </Text>
                <TextInput
                  style={styles.inputAccount}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </View>
              {/* <View style={styles.inputArea}>
                                <Image source={require('../assets/img/iphone.png')} style={styles.imgInput}/>
                                <Text style={{color: '#2BA84A', marginLeft:4, marginRight: 2}}>|</Text>
                                <TextInput style={styles.inputAccount} placeholder='Phone number'/>
                            </View> */}
              <View style={styles.inputArea}>
                <Image
                  source={require("../assets/img/padlock.png")}
                  style={styles.imgInput}
                />
                <Text
                  style={{ color: "#2BA84A", marginLeft: 4, marginRight: 2 }}
                >
                  |
                </Text>
                <TextInput
                  style={styles.inputAccount}
                  placeholder={i18next.t("Password")}
                  onChangeText={(text) => {
                    this.handlePasswordChange(text);
                    this.setState({ password: text });
                  }}
                  onFocus={() => this.setState({ showPasswordHint: true })}
                  onBlur={() => this.setState({ showPasswordHint: false })}
                  secureTextEntry={true}
                />
                <TouchableOpacity onPress={this.togglePasswordVisibility}>
                  <Image
                    source={
                      showPassword
                        ? require("../assets/img/hidden.png")
                        : require("../assets/img/eye.png")
                    }
                    style={[styles.imgShowPassword, styles.imgInput]}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputArea}>
                <Image
                  source={require("../assets/img/password.png")}
                  style={styles.imgInput}
                />
                <Text
                  style={{ color: "#2BA84A", marginLeft: 4, marginRight: 2 }}
                >
                  |
                </Text>
                <TextInput
                  style={styles.inputAccount}
                  onChangeText={(text) =>
                    this.setState({ verifypassword: text })
                  }
                  onFocus={() => this.setState({ showPasswordHint: true })}
                  onBlur={() => this.setState({ showPasswordHint: false })}
                  placeholder={i18next.t("Verify password")}
                  secureTextEntry={true}
                />
                <TouchableOpacity onPress={this.togglePasswordVisibility}>
                  <Image
                    source={
                      showPassword
                        ? require("../assets/img/hidden.png")
                        : require("../assets/img/eye.png")
                    }
                    style={[styles.imgShowPassword, styles.imgInput]}
                  />
                </TouchableOpacity>
              </View>
              {this.state.showPasswordHint && (
                <View
                  style={{
                    width: "65%",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 10,
                      backgroundColor: this.state.passwordValid
                        ? "#2BA84A"
                        : "#333",
                    }}
                  ></View>
                  <Text
                    style={{
                      color: this.state.passwordValid ? "#2BA84A" : "#333",
                    }}
                  >
                    {i18next.t("Password minimum 6 characters")}
                  </Text>
                </View>
              )}
              <Text>{i18next.t(msg)}</Text>
              <TouchableOpacity
                onPress={this.LoginPage}
                style={styles.bntLogin}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {i18next.t("SignUp")}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 20,
    tintColor: "#2BA84A",
  },
  imgInput: {
    width: 28,
    height: 28,
    tintColor: "#2BA84A",
  },
  imgShowPassword: {
    position: "absolute",
    top: -14,
  },
  textLogin: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2BA84A",
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 25,
    borderRadius: 24,
  },
  inputArea: {
    width: "75%",
    backgroundColor: "#edede9",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  inputAccount: {
    width: height > 1000 ? "86%" : "68%",
    height: 40,
    margin: 5,
    paddingTop: 5,
    paddingBottom: 5,
    opacity: 0.9,
    backgroundColor: "#edede9",
  },
  bntLogin: {
    width: "75%",
    height: 35,
    marginTop: 15,
    backgroundColor: "#2BA84A",
    justifyContent: "center",
    borderRadius: 24,
  },
});
