import React, { useState } from "react";
import { ToastAndroid, View } from "react-native";
import { Button, List, Text, withTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { ReadTagMifare } from "./tools/scantag";

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

type ScannedTagInfosProps = {
  nfcCardId: string | undefined;
  arrivalTime: number;
};

/*
 * @todo add a route to the details of the runner
 */
const ScannedTagInfoListElement = ({
  nfcCardId,
  arrivalTime,
}: ScannedTagInfosProps) => {
  const localTime = new Date(arrivalTime);
  return (
    <List.Item
      title={`${nfcCardId}, temps : ${localTime.getHours()}:${
        localTime.getMinutes
      }:${localTime.getSeconds()}`}
    />
  );
};

type ScannedTagListProps = {
  tagList: Array<ScannedTagInfosProps>;
};

/*
 * @todo Add a list of the runners who didn't finished the race yet
 */
const ScannedTagList = ({ tagList }: ScannedTagListProps) => {
  return (
    <List.Section title="Arrivées">
      <List.Accordion title="Dernières arrivées">
        {tagList.map((props) => (
          <ScannedTagInfoListElement {...props} />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

const ScanTagRoute = () => {
  const [isChronoStarted, setIsChronoStarted] = useState<boolean>(false);
  const [startRunningTime, setStartRunningTime] = useState<Date>(
    new Date(0, 0, 0)
  );
  const [scannedTags, setScannedTags] = useState<Array<ScannedTagInfosProps>>(
    []
  );

  const startTimer = async () => {
    const startTime = new Date();
    setStartRunningTime(startTime);
    setIsChronoStarted(true);
  };

  const scanTag = async () => {
    const tag = await ReadTagMifare();
    if (tag) {
      const currentTime = new Date();
      const arrivalTime = currentTime.getTime() - startRunningTime.getTime();
      const newScannedTag: ScannedTagInfosProps = {
        nfcCardId: tag?.id,
        arrivalTime,
      };
      setScannedTags((tags) => [...tags, newScannedTag]);
    }
  };

  return (
    <View>
      <Button onPress={startTimer}>Démarrer le timer</Button>
      <Button onPress={scanTag}>Lire un tag</Button>
      <ScannedTagList tagList={scannedTags} />
    </View>
  );
};

const WriteTagRoute = () => (
  <View>
    <Text>Ecrire sur des tags</Text>
    <Button onPress={ReadTagMifare}>Ecrire</Button>
  </View>
);
