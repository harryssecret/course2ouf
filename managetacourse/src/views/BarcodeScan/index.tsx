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

export type ScannedBarcodeInfosProps = {
  id: number;
  userBarcodeId: string | undefined;
  arrivalTime: number;
};

const Timer = ({ startRunningTime }: { startRunningTime: Date }) => {
  const [time, setTime] = useState(new Date(0, 0, 0));

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const runningTime = currentTime.getTime() - startRunningTime.getTime();
      const finalTime = new Date(runningTime);
      setTime(finalTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [startRunningTime]);

  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const milliseconds = time.getMilliseconds().toString().padStart(2, "0");

  return (
    <View>
      <Text>Temps écoulé :</Text>
      <Text>
        {minutes}:{seconds}:{milliseconds}
      </Text>
    </View>
  );
};

const ScanBarcodeRoute = (): JSX.Element => {
  const [isChronoStarted, setIsChronoStarted] = useState(false);
  const [startRunningTime, setStartRunningTime] = useState(new Date(0, 0, 0));
  const [scannedBarcode, setScannedBarcode] = useState<
    Array<ScannedBarcodeInfosProps>
  >([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  let id = 0;

  const [hasPermission, setHasPermission] = useState<boolean>();

  const startTimer = () => {
    const startTime = new Date();
    setStartRunningTime(startTime);
    setIsChronoStarted(true);
  };

  const resetTime = () => {
    console.log(scannedBarcode);
    setScannedBarcode([]);
    setIsChronoStarted(false);
  };

  const hideModal = () => setIsScannerOpen(false);
  const showModal = () => setIsScannerOpen(true);

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ justifyContent: "flex-end" }}
    >
      {isChronoStarted && <Timer startRunningTime={startRunningTime} />}
      {isScannerOpen && (
        <Portal>
          <BarCodeScanner
            onBarCodeScanned={isScanned ? undefined : handleBarcodeScan}
            style={[StyleSheet.absoluteFillObject, styles.barcodeContainer]}
          >
            <Button
              icon="close"
              style={styles.closeButton}
              onPress={hideModal}
              mode="contained"
            >
              Fermer
            </Button>
          </BarCodeScanner>
        </Portal>
      )}

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
        <Button icon="camera" onPress={showModal} mode="contained">
          Lecteur de code barre
        </Button>
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
  barcodeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  closeButton: {
    width: "70%",
    textAlign: "center",
  },
});

const WriteTagRoute = () => <View></View>;
