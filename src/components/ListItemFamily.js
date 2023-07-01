import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
const ListItemFamily = ({ nombre, id, onDelete}) => {
  const confirmDelete = async () => {
    try {
      await onDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={Styles.container}>
      {nombre ? (
        <>
          <Text style={Styles.nombre}>{nombre}</Text>
          <TouchableOpacity style={Styles.bin} onPress={confirmDelete}>
            <EvilIcons name="trash" size={60} color="red" />
          </TouchableOpacity>
        </>
      ) : (
        <Text style={Styles.errorText}>Invalid data</Text>
      )}
    </View>
  );
};


const Styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 16,
    marginLeft: 5,
  },
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