import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Auth } from "aws-amplify";
import { DrawerItem } from "@react-navigation/drawer";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useAuthContext } from "../context/AuthContextUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Drawer = createDrawerNavigator();
/*  */
const Stack = createNativeStackNavigator();

const RouteNavigation = () => {
  console.log("Entra?");
  const { dbUser } = useAuthContext();
  console.log(dbUser);
  return (
    <Stack.Navigator>
      {dbUser ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        ></Stack.Screen>
      ) : (
        <Stack.Screen name="Aca" component={Profile} options={{headerShown: false}}/>
      )}
    </Stack.Navigator>
  );
};

const CdrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={"Cerrar Sesion"}
        onPress={() => Auth.signOut()}
      ></DrawerItem>
    </DrawerContentScrollView>
  );
};

const Home = () => {
  return (
    <Drawer.Navigator
      initialRouteName="map"
      drawerContent={(props) => <CdrawerContent {...props} />}
    >
      <Drawer.Screen name="drawer" component={HomeStackNavigator} options={{headerShown: false}}/>
    </Drawer.Navigator>
  );
};
const Profile = () => {
  return (
    <Drawer.Navigator
      initialRouteName="registro"
      drawerContent={(props) => <CdrawerContent {...props} />
    }
    >
      <Drawer.Screen name="registro" component={RegisterScreen} options={{headerShown: false}}/>
      <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false, drawerItemStyle:{height: 0}}}/>
    </Drawer.Navigator>
  );
};

const HomeStack = createDrawerNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="map"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="perfil"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default RouteNavigation;
