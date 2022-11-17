import {
  adaptNavigationTheme,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { DrawerStack, RootNavigator } from "./components/Drawer";
import TagView from "./TagEditionView";

const theme = {
  ...DefaultTheme,
};

export type RootStackParamList = {
  Accueil: undefined;
  Tags: undefined;
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  light: NavigationDefaultTheme,
  dark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...theme,
  ...LightTheme,
  colors: {
    ...theme.colors,
    ...LightTheme.colors,
  },
};

export default function Main() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
