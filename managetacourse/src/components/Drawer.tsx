import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import Home from "../HomeView";
import TagHomeView from "../TagEditionView/TagEditionView";

const Drawer = createDrawerNavigator();

function DrawerContent() {
  return (
    <View>
      <Text>Here is the drawer content</Text>
    </View>
  );
}

export const RootNavigator = () => {
  const [active, setActive] = useState("");

  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="Accueil" component={Home} />
      <Drawer.Screen name="Tags" component={TagHomeView} />
    </Drawer.Navigator>
  );
};
