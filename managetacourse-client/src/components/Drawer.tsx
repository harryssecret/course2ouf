import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Appbar, Drawer as PaperDrawer } from "react-native-paper";
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { createStackNavigator, StackHeaderProps } from "@react-navigation/stack";
import { RootStackParamList } from "..";
import { getHeaderTitle } from "@react-navigation/elements";
import Home from "../HomeView";
import BarcodeView from "../views/BarcodeScan";
import StudentsHome from "../views/Students";
import LoginView from "../views/Login";
import StudentsView from "../views/Students";
import Login from "../views/Login";

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {
  const [active, setActive] = useState("Accueil");
  return (
    <DrawerContentScrollView {...props}>
      <PaperDrawer.Section>
        <PaperDrawer.Item label="Se connecter" onPress={() => {
          props.navigation.navigate("Se connecter");
          setActive("Login");
        }}
                          active={active === "Login"} icon={"account-circle"} />
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
          label="Code barres"
          onPress={() => {
            props.navigation.navigate("Tags");
            setActive("Tags");
          }}
          active={active === "Tags"}
          icon="barcode"
        />
        <PaperDrawer.Item label="Etudiants" onPress={() => {
          props.navigation.navigate("Etudiants");
          setActive("Students");
        }}
                          active={active === "Students"} />

      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
};

export const RootNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <DrawerContent {...props} />
      )}
    >
      <Drawer.Screen name="Accueil" component={Home} />
      <Drawer.Screen name="Tags" component={BarcodeView} />
      <Drawer.Screen name="Etudiants" component={StudentsHome} />
      <Drawer.Screen name={"Se connecter"} component={LoginView} />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

export const DrawerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Accueil"
      screenOptions={{
        header: (props: StackHeaderProps) => <Header {...props} />,
        headerMode: "screen"
      }}
    >
      <Stack.Screen name="Accueil" component={Home} />
      <Stack.Screen name="Barcodes" component={BarcodeView} />
      <Stack.Screen name={"Login"} component={LoginView} />
      <Stack.Screen name={"Students"} component={StudentsView} />

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
