import React, { useState } from "react";
import { View } from "react-native";
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

const ScanTagRoute = () => {
  const [error, setError] = useState(false);
  const ReadNdef = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      return tag;
    } catch (e) {
      setError(true);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };
  return (
    <View>
      <Text>Scanner des tags</Text>
      <Button onPress={ReadNdef}>Lire</Button>
    </View>
  );
};

const WriteTagRoute = () => (
  <View>
    <Text>Ecrire sur des tags</Text>
  </View>
);
