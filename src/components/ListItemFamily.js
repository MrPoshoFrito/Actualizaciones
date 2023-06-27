import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Alert,
  Button,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { DataStore } from "aws-amplify";
import { Amigos } from "../models";
const ListItemFamily = ({ nombre, id}) => {
  console.log(id); 
  const [showModal, setShowModal] = useState(false);
  const confirmDelete = async() => {
    
        try {
          const toDelete = await DataStore.query(Amigos, id)
          console.log("Este se va a borra",toDelete);
          DataStore.delete(toDelete)
        } catch (error) {
          console.log(error);
        }
    
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.nombre}>{nombre}</Text>
      
      <TouchableOpacity style={Styles.bin} onPress={confirmDelete}>
        <EvilIcons name="trash" size={60} color="red" />
      </TouchableOpacity>

      
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    alignItems: "center",
    flexDirection: "row",
  },
  nombre: {
    marginVertical: 20,
    fontSize: 20,
    marginLeft: 5,
  },
  bin: {
    position: "absolute",
    right: 0,
  },
});
export default ListItemFamily;
