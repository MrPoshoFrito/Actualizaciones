import { DataStore } from "aws-amplify";
import { Amigos, User, Location } from "../../models";
import { useAuthContext } from "../../context/AuthContextUser"
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location_ from 'expo-location';
import ListItemFamily from "../../components/ListItemFamily";
import AddFamModal from "../../components/AddFamModal";

const HomeScreen = ({ navigation }) => {
  const { dbUser } = useAuthContext();
  const [friends, setFriends] = useState([]);
  const [friendLocations, setFriendLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const getLocations = async () => {
    try {
      const allLocations = []
      const results = await DataStore.query(Location);
      friends.forEach(element => {
        if (element.isDeleted == false && element.userID == dbUser.id) {
          results.forEach(value => {
            if (value.locationUserLocationId == element.friendID) {
              allLocations.push(value);
            }
          });
        }
      });
      setFriendLocations(allLocations);
      // console.log(friendLocations)
    } catch (error) {
      console.log(error);
    }
  };

  const getFam = async () => {
    try {
      const results = await DataStore.query(Amigos);
      setFriends(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location_.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        const location = await Location_.getCurrentPositionAsync({});
        setUserLocation(location.coords); // Save the user's location to state
      } catch (error) {
        console.log("Error getting location", error);
      }
    };

    const fetchData = async () => {
      await requestLocationPermission();
      await getFam();
      await getLocations();
      console.log("Current User:", dbUser.id);
  
      if (userLocation) {
        await saveUserLocation();
      }
    };
  
    fetchData();
  }, []);

  const handleReload = async () => {
    getLocations();
    getFam();
    if (userLocation) {
      await saveUserLocation();
    }
  };

  const saveUserLocation = async () => {
    try {
      const existingLocation = friendLocations.find(
        (location) => location.userID === dbUser.id
      );
  
      if (existingLocation) {
        // Update existing location
        await DataStore.save(
          Location.copyOf(existingLocation, (updated) => {
            updated.latitude =  userLocation.latitude.toString();
            updated.longitude = userLocation.longitude.toString();
          })
        );
      } else {
        // Save new location
        await DataStore.save(
          new Location({
            latitude: userLocation.latitude.toString(),
            longitude: userLocation.longitude.toString(),
            locationUserLocationId: dbUser.id,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleAddFamilyMember = async (codigo) => {
    try {
      const results = await DataStore.query(User, (user) => user.codigo.eq(codigo));
      if (results.length > 0) {
        const user = results[0];
        const existingAmigo = friends.find(
          (amigo) =>
            amigo.friendID === user.id &&
            amigo.userID === dbUser.id
        );

        if (existingAmigo) {
          console.log("HERE")
          const updateAmigo = await DataStore.query(Amigos, existingAmigo.id);
          if (existingAmigo.isDeleted != false) {
            updateAmigo.isDeleted = false;
            await DataStore.save(updateAmigo);
            setIsModalOpen(!isModalOpen)
            handleReload();
            console.log('Amigo should be false now');
          } else {
            console.log('Amigo already exists');
          }
        } else {
          await DataStore.save(
            new Amigos({
              nombre: user.nombre,
              apellido: user.apellido,
              friendID: user.id,
              userID: dbUser.id,
              isDeleted: false,
            })
          );
          setIsModalOpen(!isModalOpen)
          handleReload();
        }
      } else {
        console.log('User not found');
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
            updated.isDeleted = true;
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
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
          />
        )}
        {friendLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
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
            if (item.isDeleted == false && item.userID == dbUser.id) {
              return (
                <ListItemFamily
                  nombre={item.nombre}
                  id={item.id}
                  onDelete={handleDeleteFamilyMember}
                />
              );
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
