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
      <Drawer.Navigator drawerContent={() => <DrawerContent />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Tags" component={TagView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

export const DrawerStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Accueil"
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}
      >
        <Stack.Screen name="Accueil" component={Home} />
        <Stack.Screen name="Tags" component={TagView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const Header = ({ route, options, navigation }: any) => {
  return (
    <Appbar.Header>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      ></TouchableOpacity>
    </Appbar.Header>
  );
};
