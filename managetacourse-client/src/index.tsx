import {Provider as PaperProvider,} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {StatusBar} from "expo-status-bar";
import {RootNavigator} from "./components/Drawer";


export type RootStackParamList = {
    Accueil: undefined;
    Students: undefined;
    Barcodes: undefined;
    Login: undefined;
};

export default function Main() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <RootNavigator/>
            </NavigationContainer>
            <StatusBar style="auto"/>
        </PaperProvider>
    );
}
