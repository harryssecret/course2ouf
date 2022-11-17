import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme, withTheme } from "react-native-paper";

function Home(): JSX.Element {
  return (
    <View>
      <Text>Bienvenue sur l'accueil!</Text>
    </View>
  );
}

export default withTheme(Home);
