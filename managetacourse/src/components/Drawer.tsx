import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Drawer as PaperDrawer, Text, Appbar } from "react-native-paper";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";
import { RootStackParamList } from "..";
import { getHeaderTitle } from "@react-navigation/elements";
import Home from "../HomeView";
import TagView from "../views/NfcScan";

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {
  const [active, setActive] = useState<string>("Accueil");
  return (
    <DrawerContentScrollView {...props}>
      <PaperDrawer.Section title="Général">
        <PaperDrawer.Item
          label="Accueil"
          onPress={() => {
            props.navigation.navigate("Accueil");
            setActive("Accueil");
          }}
          active={active === "Accueil"}
          icon="home"
        />
        <PaperDrawer.Item
          label="Tags"
          onPress={() => {
            props.navigation.navigate("Tags");
            setActive("Tags");
          }}
          active={active === "Tags"}
          icon="tag"
        />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
};

export const RootNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Accueil" component={Home} />
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
