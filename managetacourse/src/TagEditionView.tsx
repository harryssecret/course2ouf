import React, { useState } from "react";
import { ToastAndroid, View } from "react-native";
import {
  Button,
  Card,
  List,
  Paragraph,
  Text,
  Title,
  withTheme,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";

NfcManager.start();

function TagView(): JSX.Element {
  return <BottomTagNavigator />;
}

export default withTheme(TagView);

const Tab = createMaterialBottomTabNavigator();

const BottomTagNavigator = () => (
  <Tab.Navigator initialRouteName="Lire">
    <Tab.Screen
      name="Lire"
      component={ScanTagRoute}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="nfc-search-variant"
            color={color}
            size={26}
          />
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

const HistoryTagRoute = () => {
  return (
    <View>
      <Text>Lister les tags</Text>
    </View>
  );
};

async function ReadTagNdef() {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    return tag;
  } catch (e) {
    console.log(e);
    ToastAndroid.show("Erreur lors de la lecture du tag", ToastAndroid.SHORT);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

async function ReadTagMifare() {
  try {
    await NfcManager.requestTechnology(NfcTech.MifareClassic)
      .then(async () => {
        return await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(
          0,
          [0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
        );
      })
      .then(async (data) => {
        await NfcManager.mifareClassicHandlerAndroid
          .mifareClassicSectorToBlock(0)
          .then((data) => console.log(data));
      })
      .catch((error) => console.error(error));

    const tag = await NfcManager.getTag();
    ToastAndroid.show(`Tag trouvé : ${tag?.id}`, ToastAndroid.SHORT);
  } catch (e) {
    console.log(e);
    ToastAndroid.show("Erreur lors de la lecture du tag", ToastAndroid.SHORT);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

type ScannedTagInfosProps = {
  nfcCardId: string;
  arrivalTime: Date;
};

const ScannedTagInfoCard = ({
  nfcCardId,
  arrivalTime,
}: ScannedTagInfosProps) => {
  const formattedArrivalTime = `Arrivée de ${nfcCardId}`;
  return (
  );
};

const ScanTagRoute = () => {
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [stopTime, setStopTime] = useState<Date>(new Date());

  const startTimer = async () => {
    await ReadTagMifare().then(() => stopTimer());
  };

  const stopTimer = () => {
    setStopTime(new Date());
    const endTime = stopTime?.getTime() - startTime?.getTime();
  };

  return (
    <View>
      <Text>Scanner des tags</Text>
      <Button onPress={startTimer}>Démarrer le timer</Button>
      <Button onPress={ReadTagMifare}>Lancer la lecture</Button>
    </View>
  );
};

type NfcTagProps = {
  userId: string;
};

async function writeDataNdef({ userId }: NfcTagProps) {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const data = Ndef.encodeMessage([Ndef.textRecord(userId)]);

    if (data) {
      await NfcManager.ndefHandler.writeNdefMessage(data);
    }
  } catch (e) {
    ToastAndroid.show(
      `Erreur lors de l'écriture du tag: ${e}`,
      ToastAndroid.SHORT
    );
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

function encodeTagData(text: string) {
  const MIFARE_BLOCK_SIZE = 16;
  let block = Array(MIFARE_BLOCK_SIZE).fill(0);

  for (let i = 0; i < text.length; i++) {
    block[i] = text.charCodeAt(i);
  }
  return block;
}

async function writeDataMifare({ userId }: NfcTagProps) {
  try {
    await NfcManager.requestTechnology(NfcTech.MifareClassic).then(
      async () =>
        await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(
          1,
          [0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
        )
    );
  } catch (error) {
    ToastAndroid.show(
      `Erreur lors de l'écriture du tag: ${error}`,
      ToastAndroid.SHORT
    );
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

const WriteTagRoute = () => (
  <View>
    <Text>Ecrire sur des tags</Text>
    <Button onPress={ReadTagMifare}>Ecrire</Button>
  </View>
);
