import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import i18next from "../services/i18next";
import { useNavigation,useFocusEffect  } from '@react-navigation/native';

export default function CameraConnectDevice() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // setScanned(true);
    const parts = data.split(',');
  // const part1 = parts[0].replace(/\n/g, '');
  const value = []
  const key = []
  // console.log(parts.length);
  for (let i = 0; i < parts.length;i++)
  {
    let part = parts[i].split(':')
    key.push(part[0])
    value.push(part[1])
  }
  // const partdht = 
  // const partph = parts[2].split(':')
  
    if (value[0] == "FAC")
    {
      // console.log(key)
      // console.log(value)
      setScanned(false);
      navigation.navigate('AddDevice',{ key: key , value :value });
      
    }
    else
     {
      alert(i18next.t(`Invalide QR code`));
      setScanned(false);

    }
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (

    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={i18next.t('Tap to Scan Again') } onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
