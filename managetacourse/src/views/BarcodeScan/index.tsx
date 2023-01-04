import React, { useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid, ScrollView } from "react-native";
import { Button, Portal, Text, withTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";

import { ScannedBarcodeList } from "./components/History/ScannedBarcodeHistory";

function TagView(): JSX.Element {
  return <BottomTagNavigator />;
}

export default withTheme(TagView);

const Tab = createMaterialBottomTabNavigator();

const BottomTagNavigator = (): JSX.Element => (
  <Tab.Navigator initialRouteName="Lire">
    <Tab.Screen
      name="Lire"
      component={ScanBarcodeRoute}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="barcode-scan" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Ecrire"
      component={WriteTagRoute}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="pencil" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Historique"
      component={HistoryTagRoute}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="history" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

const HistoryTagRoute = (): JSX.Element => {
  return (
    <View>
      <Text>Lister les tags</Text>
    </View>
  );
};

type ScannedBarcodeInfosProps = {
  id: number;
  userBarcodeId: string | undefined;
  arrivalTime: number;
};

const ScanBarcodeRoute = (): JSX.Element => {
  const [isChronoStarted, setIsChronoStarted] = useState(false);
  const [startRunningTime, setStartRunningTime] = useState(new Date(0, 0, 0));
  const [scannedBarcode, setScannedBarcode] = useState<
    Array<ScannedBarcodeInfosProps>
  >([]);
  const [isScanned, setIsScanned] = useState(false);
  let id = 0;

  const [hasPermission, setHasPermission] = useState<boolean>();

  const startTimer = () => {
    const startTime = new Date();
    setStartRunningTime(startTime);
    setIsChronoStarted(true);
  };

  const resetTime = () => {
    setScannedBarcode([]);
    setIsChronoStarted(false);
  };

  useEffect(() => {
    const getBarcodePermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarcodePermissions();
  }, []);

  const handleBarcodeScan = ({ type, data }: BarCodeScannerResult) => {
    const currentTime = new Date();
    const arrivalTime = currentTime.getTime() - startRunningTime.getTime();

    if (scannedBarcode.some((barcode) => barcode.userBarcodeId === data)) {
      return;
    }

    if (data) {
      const newScannedBarcode: ScannedBarcodeInfosProps = {
        id: id++,
        userBarcodeId: data,
        arrivalTime,
      };
      setScannedBarcode((barcodes) => [...barcodes, newScannedBarcode]);
    } else {
      ToastAndroid.show("Format de code barre inconnu.", ToastAndroid.SHORT);
    }
    setIsScanned(true);
  };

  if (hasPermission == null) {
    return <Text>Demande de permission...</Text>;
  } else if (hasPermission == false) {
    return <Text>Impossible d'accéder à la caméra.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={isScanned ? undefined : handleBarcodeScan}
        style={styles.barCodeScan}
      />
      {isScanned && (
        <Portal>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Text style={{ color: "white" }}>Code barre scanné</Text>
            <Button mode="contained" onPress={() => setIsScanned(false)}>
              OK
            </Button>
          </View>
        </Portal>
      )}
      <View style={styles.buttonContainer}>
        <Button icon="clock-outline" onPress={startTimer} mode="contained">
          Démarrer le timer
        </Button>
        <Button onPress={resetTime}>Timer à zéro</Button>
      </View>
      <ScannedBarcodeList tagList={scannedBarcode} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 24,
    alignItems: "center",
  },
  barCodeScan: {
    position: "relative",
    width: "100%",
    height: "30%",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

const WriteTagRoute = () => <View></View>;
