import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import ListItemFamily from "../../components/ListItemFamily";
import AddFamModal from "../../components/AddFamModal";
import { DataStore } from "aws-amplify";
import { Amigos, User, Location } from "../../models";
import { useAuthContext } from "../../context/AuthContextUser"

const HomeScreen = ({ navigation }) => {
  const { dbUser } = useAuthContext();
  const [friends, setFriends] = useState([]);
  const [friendLocations, setFriendLocations] = useState([]);
  //const [setAllFriends, setAllFriendLocations] = useState([]);

  const getLocations = async () => {
    try {
      const results = await DataStore.query(Location);
      const extractedData = results.map(item => ({
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        locationUserId: item.locationUserId,
      }));
      setFriendLocations(extractedData);
    } catch (error) {
      console.log(error);
    }
  };


  const getFam = async () => {
    try {
      const results = await DataStore.query(Amigos);
      //const filteredResults = results.filter(item => item._deleted === null || item._deleted === undefined);
      //const savedResults = filteredResults.filter(item => item.userID === dbUser.id);
      setFriends(results);
      results.forEach(Element => {
        console.log("00000000000000000000000000000000000000000000000000000000000000000")
        console.log("Friends ", Element.userID, " Name: ", Element.nombre, "IsDeleted: ", Element._deleted)
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Current User: ", dbUser.id)
    getFam();
    getLocations();

    const intervalId = setInterval(() => {
      getLocations();
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);

  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReload = () => {
    getFam();
    getLocations();
  };

  const handleAddFamilyMember = async (codigo) => {
    try {
      const results = await DataStore.query(User, (user) => user.codigo.eq(codigo));//Check User to Make Friend
      if (results.length > 0) {
        const user = results[0];//Save User To Make Friend In user
        const existingFriend = friends.find((friend) => friend.userID === user.id);//Check If User To Make Friend Already Friend
        if (existingFriend) {
          console.log("Friend Already Exists")//Already Friend
          await DataStore.save(
            Amigos.copyOf(existingFriend, (updated) => {
              updated._deleted = false;//Now We are Friends Again
            })
          );
          setIsModalOpen(false);
          handleReload();
        } else {
          console.log("Friend Does Not Exists YET")//Not Friend Yet
          await DataStore.save(
            new Amigos({
              nombre: user.nombre,
              apellido: user.apellido,
              userID: dbUser.id,
              _deleted: false,
            })//Now New Friend
          );
        }
        setIsModalOpen(false);
        handleReload();
      } else {
        console.log("User not found");
        return;
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 11.431955905044058,
          longitude: -85.82842820273586,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {friendLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={"Here"}
          >
            <View>
              <Image style={styles.icon} source={require("../../../assets/icon.png")}></Image>
            </View>
          </Marker>
        ))}
      </MapView>
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
          renderItem={({ item }) => {
            if (item._deleted === false) {
              //console.log("00000000000000000000000000000000000000000000000000000000000000000")
              //console.log("Friends ", item.userID, " Name: ", item.nombre, "IsDeleted: ", item._deleted)
              //console.log(item)
              return (
                <ListItemFamily
                  nombre={item.nombre}
                  id={item.id}
                  onDelete={handleDeleteFamilyMember}
                />
              );
            } else {
              return null;
            }
          }}
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
  icon: {
    width: 25,
    height: 25,
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
