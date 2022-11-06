import React, { useState } from "react";
import { ToastAndroid, View } from "react-native";
import { BottomNavigation, Button, Text } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

NfcManager.start();

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

export default function TagView(): JSX.Element {
  return <BottomTagNavigator />;
}

const HistoryTagRoute = () => {
  return (
    <View>
      <Text>Lister les tags</Text>
    </View>
  );
};

async function ReadTag() {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    return tag;
  } catch (e) {
    ToastAndroid.show("Erreur lors de la lecture du tag", ToastAndroid.SHORT);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

const ScanTagRoute = () => {
  return (
    <View>
      <Text>Scanner des tags</Text>
      <Button onPress={ReadTag}>Lire</Button>
    </View>
  );
};

type NfcTagProps = {
  name: string;
};

async function writeData({ name }: NfcTagProps) {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
  } catch (e) {
    ToastAndroid.show(
      `Erreur lors de l'écriture du tag: ${e}`,
      ToastAndroid.SHORT
    );
  }
}

const TagCardComponent = ({ name }: NfcTagProps) => {};

const WriteTagRoute = () => (
  <View>
    <Text>Ecrire sur des tags</Text>
  </View>
);
