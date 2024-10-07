import * as React from 'react';
import { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    SafeAreaView, 
    TextInput,
    Image} from 'react-native';
    import i18next from "../services/i18next";

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            membership: '',
        }
    }

    // ========== Change page ========== //
    CheckOutPage = () => {
        console.log("CheckOut Page");
        this.props.navigation.navigate("CheckOut");
      };
    render() {
        const { membership } = this.state;
        const packagePrices = [100, 90, 76];
        return (
            <View style={styles.component}>
                <SafeAreaView style={styles.safeComponent}>
                    <Text style={styles.headerTitle}>Go Premium</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 10}}>Your fax is in the process of bafain sent</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 13, marginBottom: 10}}>NQD2308</Text>
                    <Image source={require('../assets/img/premium.png')} style={styles.img}/>
                    <View>
                        {['Weekly', 'Monthly', 'Yearly'].map((pakage, index) => (
                            <View style={styles.option} key={pakage}>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity style={styles.outter}
                                    onPress={() => this.setState({ membership: pakage })}>
                                        { membership === pakage && <View style={styles.inner}></View>}
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={styles.headerInner}>{pakage}</Text>
                                        <Text style={styles.description}>Pay {pakage} for updating your experient</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.headerInner}>đ{packagePrices[index].toFixed(3)}</Text>
                                    <Text style={{color: '#adb5bd', fontSize: 12, fontWeight: 'bold'}}>/w</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={{width: '100%'}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity style={styles.btn} onPress={this.CheckOutPage}>
                                <Text style={styles.textBtn}>{i18next.t("Checkout")}</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    component: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeComponent: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    img: {
        width: 200,
        height: 200,
        tintColor: '#2BA84A',
        marginBottom: 50
    },
    option:{
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 8,
        marginTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 24,
        paddingBottom: 24,
        borderRadius: 12,
    },
    outter: {
        width: 16,
        height: 16,
        top: 4,
        marginRight: 10,
        borderRadius: 50,
        borderColor: '#333',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        width: 10,
        height: 10,
        backgroundColor: 'gray',
        borderRadius: 50,
    },
    headerInner: {
        fontSize: 16, 
        fontWeight: 'bold'
    },
    description: {
        fontSize: 12,
        color: '#adb5bd'
    },
    btn: {
        width: '80%',
        height: 50,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: '#2BA84A',
        justifyContent: 'center',
        borderRadius: 12
    },
    textBtn: {
        textAlign: 'center', 
        textAlignVertical: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
})