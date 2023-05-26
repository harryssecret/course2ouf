import React from "react";
import {View} from "react-native";
import { Button, Text, withTheme } from "react-native-paper";

function Home(): JSX.Element {
  return (
    <View>
      <Button mode={"contained"}>
        Scan now
      </Button>

    </View>
  );
}

export default withTheme(Home);
