import React from "react";
import { ToastAndroid, View } from "react-native";
import { Button, Text, withTheme } from "react-native-paper";
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
      .then(() => NfcManager.getTag())
      .then(
        async () =>
          await NfcManager.mifareClassicHandlerAndroid.mifareClassicGetSectorCount()
      )
      .then(async () => {
        return await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(
          1,
          [0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
        );
      })
      .then(async (data) => {
        await NfcManager.mifareClassicHandlerAndroid
          .mifareClassicSectorToBlock(1)
          .then((data) => console.log(data));
      })
      .catch((error) => console.error(error));
  } catch (e) {
    console.log(e);
    ToastAndroid.show("Erreur lors de la lecture du tag", ToastAndroid.SHORT);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

const ScanTagRoute = () => {
  return (
    <View>
      <Text>Scanner des tags</Text>
      <Button onPress={ReadTagMifare}>Lire</Button>
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
    await NfcManager.requestTechnology(NfcTech.MifareClassic)
      .then(
        async () =>
          await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(
            1,
            [0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
          )
      )
      .then()
      .then(async () =>
        NfcManager.mifareClassicHandlerAndroid.mifareClassicWriteBlock(
          encodeTagData(userId)
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
