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

import { DrawerActions } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StackHeaderProps } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";

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
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Tags" component={TagView} />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

export const DrawerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Accueil"
      screenOptions={{
        header: (props) => <Header {...props} />,
        headerMode: "screen",
      }}
    >
      <Stack.Screen name="Accueil" component={Home} />
      <Stack.Screen name="Tags" component={TagView} />
    </Stack.Navigator>
  );
};

export const Header = ({ route, options, navigation }: StackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      <TouchableOpacity onPress={() => navigation}></TouchableOpacity>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
