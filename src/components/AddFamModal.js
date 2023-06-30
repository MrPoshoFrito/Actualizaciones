import { Text, Modal, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";

const AddFamModal = ({ isModalOpen, setIsModalOpen, handleAddFamilyMember }) => {
  const [codigo, setCodigo] = useState("");

  const handleSaveAndClose = () => {
    handleAddFamilyMember(codigo);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal visible={isModalOpen} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalStyle}>
          <Text style={styles.title}>Escriba el codigo de enlace</Text>
          <TextInput style={styles.input} onChangeText={setCodigo} />
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSaveAndClose} style={[styles.button, styles.saveButton]}>
              <Text style={styles.textModal}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClose} style={[styles.button, styles.closeButton]}>
              <Text style={styles.textModal}>Cerrar</Text>
            </TouchableOpacity>
          </View>          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 8,
  },
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
