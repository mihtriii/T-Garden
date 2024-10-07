import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartType: "",
    };
  }

  // ========== Change page ========== //
  PakagePremiumPage = () => {
    console.log("Pakage Premium Page");
    this.props.navigation.navigate("PremiumPakage");
  };

  render() {
    const { cartType } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={styles.container}
          >
            <View style={styles.container}>
              <View style={{ justifyContent: "space-between", flex: 1 }}>
                <View>
                    <View style={{marginTop: 50, marginBottom: 18}}>
                        <Text style={styles.titleText}>Payment</Text>
                    </View>
                  <Text style={styles.text}>Name</Text>
                  <TextInput
                    placeholder="ex: Danny"
                    style={[styles.inputLong, styles.shadow]}
                  />
                  <Text style={styles.text}>Choose Payment Method</Text>
                  <View style={[styles.flex, { gap: 20 }]}>
                    {["ACB.png", "Techcombank.png", "Vietcombank.png"].map(
                      (bank, index) => (
                        <TouchableOpacity
                          key={bank}
                          onPress={() => this.setState({ cartType: bank })}
                          style={[
                            styles.bankOption,
                            cartType === bank && styles.choose,
                          ]}
                        >
                          <Image
                            source={require(`../assets/img_bank/Techcombank.png`)}
                            style={styles.imgBank}
                          />
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                  <Text style={[styles.text, styles.flex]}>Cart Number</Text>
                  <View style={[styles.flex, styles.shadow, styles.cartNumber]}>
                    <TextInput
                      placeholder="XXXX - XXXX - XXXX - XXX"
                      style={styles.inputLong}
                    />
                    <Image
                      source={require(`../assets/img_bank/Techcombank.png`)}
                      style={{ width: 40, height: 20, marginRight: 10 }}
                    />
                  </View>
                  <View style={[styles.flex, styles.cvv]}>
                    <View>
                        <Text style={styles.text}>CVV</Text>
                        <TextInput placeholder="XXX" style={[styles.inputShort, styles.shadow]} />
                    </View>
                    <View>
                        <Text style={styles.text}>Expires</Text>
                        <TextInput placeholder="MM/YYYY" style={[styles.inputShort, styles.shadow]} />
                    </View>
                  </View>
                </View>
                <View>
                  <TouchableOpacity style={styles.btnPay}>
                    <Text style={{color: 'white', fontWeight: '600'}}>Pay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default CheckOut;

const styles = StyleSheet.create({
  // ========== Default Setting ========== //
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  // ========== Setting ========== //
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#2BA84A'
  },
  bankOption: {
    width: 100,
    height: 50,
    marginTop: 10,
    // backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#333",
  },
  choose: {
    width: 100,
    height: 50,
    marginTop: 10,
    // backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#333",
  },
  imgBank: {
    width: 80,
    height: 40,
  },
  text: {
    marginTop: 20,
    marginBottom: 5,
    color: "gray",
    fontWeight: "600",
  },
  inputLong: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  cartNumber: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 8,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  cvv: {
    justifyContent: 'space-between'
  },
  inputShort: {
    width: 160,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8
  },
  btnPay: {
    height: 50,
    marginTop: 20,
    marginBottom:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2BA84A',
    borderRadius: 12,
  }
});
