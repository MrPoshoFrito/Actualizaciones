import {
  Text,
  Modal,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Amigos, User } from "../models";
import { useAuthContext } from "../context/AuthContextUser";

const AddFamModal = ({ isModalOpen, setIsModalOpen, functionModal }) => {
  const [codigo, setCodigo] = useState();
  const { sub, dbUser } = useAuthContext();
  const [user, setUser] = useState();
  console.log(codigo);

  const getUsers = async () => {
    try {
      const results = await DataStore.query(User, (user) =>
        user.codigo.eq(codigo)
      );
      setUser(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [codigo]);

  console.log(user);
 
  const addFriend = async () => {
    try {
      await DataStore.save(
        new Amigos({
          nombre: user[0].nombre,
          apellido: user[0].apellido,
          userID: user[0].id,
        })
      );
      setIsModalOpen(!isModalOpen);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <Modal visible={isModalOpen} transparent={true} animationType="slide">
        <View style={styles.container}>
          <View style={styles.modalStyle}>
            <Text style={styles.title}>Escriba el codigo de enlace</Text>
            <TextInput style={styles.input} onChangeText={setCodigo} />
            <TouchableOpacity onPress={addFriend} style={styles.textContainer}>
              <View>
                <Text style={styles.textModal}>Guardar y Cerrar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalStyle: {
    shadowColor: "#000",
    margin: 20,
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    height: 150,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: "white",
  },
  textModal: {
    color: "blue",
    bottom: 0,
    alignSelf: "flex-start",
    fontSize: 20,
    marginTop: 10,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
  },
  input: {
    borderColor: "black",
    borderRadius: 15,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    width: 200,
    height: 50,
    alignSelf: "center",
  },
});
export default AddFamModal;
