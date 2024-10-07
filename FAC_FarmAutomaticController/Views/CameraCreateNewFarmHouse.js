import React, { useState, useEffect,useCallback  } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import i18next from "../services/i18next";
import { useNavigation,useFocusEffect  } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    console.log("Trang được truy cập");
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
   
    getBarCodeScannerPermissions();
  }, []);
 
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    // console.log(typeof data)
    const parts = data.split(':');
  // Phần thứ nhất là "id_esp"
  const part1 = parts[0].replace(/\n/g, '');

  const part2 = parts[1];
    console.log(part1)
    if (part1 == "id_esp")
    {
      setScanned(false);
      navigation.navigate('AddFarmForm',{ id_esp: part2 });
    }
    else
     {
      alert(i18next.t(`Invalide QR code`));
    }
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
      {scanned && <Button title={i18next.t('Tap to Scan Again')} onPress={() => setScanned(false)} />}
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
