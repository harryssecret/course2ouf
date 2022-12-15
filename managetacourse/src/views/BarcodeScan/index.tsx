import React, { useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { Button, Text, withTheme } from "react-native-paper";
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
  userBarcodeId: string | undefined;
  arrivalTime: number;
};

const ScanBarcodeRoute = (): JSX.Element => {
  const [isChronoStarted, setIsChronoStarted] = useState<boolean>(false);
  const [startRunningTime, setStartRunningTime] = useState<Date>(
    new Date(0, 0, 0)
  );
  const [scannedBarcode, setScannedBarcode] = useState<
    Array<ScannedBarcodeInfosProps>
  >([]);

  const [hasPermission, setHasPermission] = useState<boolean>();

  const startTimer = async () => {
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
  });

  const handleBarcodeScan = ({ type, data }: BarCodeScannerResult) => {
    const currentTime = new Date();
    const arrivalTime = currentTime.getTime() - startRunningTime.getTime();
    if (type == "code128") {
      const newScannedBarcode: ScannedBarcodeInfosProps = {
        userBarcodeId: data,
        arrivalTime,
      };
      setScannedBarcode((barcodes) => [...barcodes, newScannedBarcode]);
    } else {
      ToastAndroid.show("Format de code barre inconnu.", ToastAndroid.SHORT);
    }
  };

  if (hasPermission == null) {
    return <Text>Demande de permission...</Text>;
  } else if (hasPermission == false) {
    return <Text>Impossible d'accéder à la caméra.</Text>;
  }

  return (
    <View>
      <View style={styles.buttonContainer}>
        <BarCodeScanner onBarCodeScanned={handleBarcodeScan} />
        <Button icon="clock-outline" onPress={startTimer} mode="contained">
          Démarrer le timer
        </Button>
        <Button onPress={resetTime}>Remettre à zéro</Button>
      </View>
      <ScannedBarcodeList tagList={scannedBarcode} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 24,
    alignItems: "center",
  },
});

const WriteTagRoute = () => <View></View>;
