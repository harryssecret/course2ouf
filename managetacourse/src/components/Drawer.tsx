import React, { useState } from "react";
import { Drawer as PaperDrawer, Text } from "react-native-paper";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Home from "../HomeView";
import TagView from "../TagEditionView";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../main";
import { Header } from "./Header";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const DrawerContent = (props: any) => {
  const [active, setActive] = useState("");
  return (
    <DrawerContentScrollView {...props}>
      <PaperDrawer.Section>
        <PaperDrawer.Item label="Accueil" />
        <PaperDrawer.Item label="Tags" />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Tags" component={TagView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

export const DrawerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ navigation, options, route }) => (
          <Header navigation={navigation} options={options} route={route} />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Tags" component={TagView} />
    </Stack.Navigator>
  );
};
