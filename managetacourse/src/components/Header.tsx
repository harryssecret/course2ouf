import { DrawerActions } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StackHeaderProps } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Appbar, Text } from "react-native-paper";

export const Header = ({ route, options, navigation }: any) => {
  return (
    <Appbar.Header>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      ></TouchableOpacity>
    </Appbar.Header>
  );
};
