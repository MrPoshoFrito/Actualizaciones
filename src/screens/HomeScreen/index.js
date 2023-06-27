import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import MapView from "react-native-maps";
import ListItemFamily from "../../components/ListItemFamily";
import AddFamModal from "../../components/AddFamModal";
import { Auth, DataStore } from "aws-amplify";
import { Amigos } from "../../models";

const HomeScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const [counter, setCounter] = useState(1);

  const getFam = async () => {
    try {
      const result = await DataStore.query(Amigos);
      setFriends(result);
    } catch (error) {
      console.log(error);
    }
    console.log('entramossss')
  };

  useEffect(() => {
    getFam();
    
  }, [counter]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <Feather
        name="list"
        size={40}
        color="black"
        style={styles.openDrawer}
        onPress={() => navigation.openDrawer()}
      />

      <View>
        <Text style={styles.title}>Familiares</Text>
      </View>

      <View style={styles.contenedorLista}>
        <FlatList
          data={friends}
          renderItem={({ item }) => <ListItemFamily nombre={item.nombre} id={item.id}/>}
        />
      </View>
      <View style={styles.containerB}>
        <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Agregar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => getFam()}>
          <View style={styles.buttonReload}>
            <AntDesign name="reload1" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <AddFamModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        functionModal={console.log("prueba")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 400,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f1",
  },
  title: {
    marginTop: 10,
    fontSize: 25,
  },
  contenedorLista: {
    width: "100%",
    height: 250,
  },
  button: {
    marginHorizontal: 10,
    width: 150,
    height: 50,
    borderRadius: 15,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonReload: {
    marginHorizontal: 10,
    width: 150,
    height: 50,
    borderRadius: 15,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 20,
    color: "black",
  },
  openDrawer: {
    position: "absolute",
    alignSelf: "flex-start",
    marginTop: 30,
    marginLeft: 20,
  },
  containerB: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
