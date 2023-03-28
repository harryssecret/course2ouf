import React from "react";
import {View} from "react-native";
import {Text, withTheme} from "react-native-paper";

function Home(): JSX.Element {
  return (
    <View>
      <Text>Bienvenue sur l'accueil!</Text>
    </View>
  );
}

export default withTheme(Home);
