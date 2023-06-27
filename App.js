import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";

import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import "@azure/core-asynciterator-polyfill";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify, Analytics } from "aws-amplify";

import AuthContextProvider from "./src/context/AuthContextUser";
import RouteNavigation from "./src/Navigation";
const Drawer = createDrawerNavigator();

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });
function App() {
  const [fontsLoaded] = useFonts({
    HappyMonkey: require("./assets/fonts/HappyMonkey-Regular.ttf"),
  });

  return (
    <NavigationContainer>
      <AuthContextProvider>
        <RouteNavigation />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
