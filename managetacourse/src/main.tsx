import {
  adaptNavigationTheme,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { DrawerStack, RootNavigator } from "./components/Drawer";
import TagView from "./TagEditionView";

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: "red", secondary: "#e0f7fa" },
};

export type RootStackParamList = {
  Accueil: undefined;
  Tags: undefined;
};

type AppTheme = typeof theme;

export const { LightTheme } = adaptNavigationTheme({ light: theme });

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={LightTheme}>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
