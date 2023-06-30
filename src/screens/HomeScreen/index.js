import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import ListItemFamily from "../../components/ListItemFamily";
import AddFamModal from "../../components/AddFamModal";
import { DataStore } from "aws-amplify";
import { Amigos, User } from "../../models";

const HomeScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);

  const getFam = async () => {
    try {
      const results = await DataStore.query(Amigos);
      console.log("All Friends: ", results.length)
      const filteredResults = results.filter(item => item._deleted === null || item._deleted === undefined);
      setFriends(filteredResults);
      console.log("Filtered: ", friends.length)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFam();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReload = () => {
    getFam();
  };

  const handleAddFamilyMember = async (codigo) => {
    try {
      const results = await DataStore.query(User, (user) => user.codigo.eq(codigo));
      if (results.length > 0) {
        const user = results[0];
        const existingFriend = friends.find((friend) => friend.userID === user.id);
        if (existingFriend) {
          console.log("Friend Already Exists")
          await DataStore.save(
            Amigos.copyOf(existingFriend, (updated) => {
              updated._deleted = null;
            })
          );
          setIsModalOpen(false);
          handleReload();
        } else {
          console.log("Friend Does Not Exists YET")
          await DataStore.save(
            new Amigos({
              nombre: user.nombre,
              apellido: user.apellido,
              userID: user.id,
            })
          );
        }
        setIsModalOpen(false);
        handleReload();
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFamilyMember = async (id) => {
    try {
      const amigoToDelete = await DataStore.query(Amigos, id);
      if (amigoToDelete) {
        await DataStore.save(
          Amigos.copyOf(amigoToDelete, (updated) => {
            updated._deleted = true;
          })
        );
        handleReload();
      } else {
        console.log("Amigo not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <Text style={styles.title}>Kins</Text>
      </View>

      <View style={styles.contenedorLista}>
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <ListItemFamily 
              nombre={item.nombre}
              id={item.id}
              onDelete={handleDeleteFamilyMember}
            />
          )}
        />
      </View>
      <View style={styles.containerB}>
        <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Agregar</Text>
          </View>
        </TouchableOpacity>
      </View>

      <AddFamModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddFamilyMember={handleAddFamilyMember}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    flex: 0.7,
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
    flex: 0.3,
  },
  button: {
    marginHorizontal: 10,
    width: 150,
    height: 50,
    borderRadius: 15,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
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
