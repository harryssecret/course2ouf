import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { RootNavigator } from "./components/Drawer";

export default function Main(): JSX.Element {
  return (
    <View>
      <RootNavigator />
      <Appbar.Header>
        <Appbar.Content title="Accueil" subtitle="Subtitle" />
      </Appbar.Header>
    </View>
  );
}
