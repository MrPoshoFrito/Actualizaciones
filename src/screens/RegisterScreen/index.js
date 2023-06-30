import { Image, Text, View, TouchableOpacity, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RegisterScreenStyle from "../../styles/RegisterScreenStyle";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContextUser";
import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../models";
import { Pressable } from "react-native";
const RegisterScreen = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);
  const { sub, dbUser, setDbUser } = useAuthContext();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [codigo, setCodigo] = useState("");

  /* const navigation = useNavigation(); */

  const onSave = async () => {
    if (dbUser) {
      updateUser();
    } else {
      createUser();
    }
  };

  const createUser = async () => {
    try {
      await DataStore.save(
        new User({
          nombre: name,
          apellido: lastname,
          codigo,
          sub,  
        })
      );

      navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          (updated.nombre = name), (updated.apellido = lastname);
        })
      );
      setDbUser(user);
      navigation.navigate('map');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LinearGradient
      style={RegisterScreenStyle.page}
      colors={["#FEA14C", "#ED5C86", "#eb3fc7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <TouchableOpacity style={RegisterScreenStyle.imageContainer}>
        <Image
          source={require("../../../assets/RegisterImagen/camara.png")}
          style={RegisterScreenStyle.image}
        />
      </TouchableOpacity>

      <View style={RegisterScreenStyle.inputsContainer}>
        <InputComponent
          labelText={"Nombre"}
          labelStyle={RegisterScreenStyle.label}
          placeholder={"Escriba su nombre"}
          placeholderColor={"white"}
          value={name}
          styleInput={RegisterScreenStyle.input}
          functionHook={setName}
        />
        <InputComponent
          labelText={"Apellido"}
          value={lastname}
          functionHook={setLastname}
          labelStyle={RegisterScreenStyle.label}
          placeholder={"Escriba su apellido"}
          placeholderColor={"white"}
          styleInput={RegisterScreenStyle.input}
        />
        {!dbUser ? (
          <InputComponent
            labelText={"Código de enlace"}
            labelStyle={RegisterScreenStyle.label}
            placeholder={"Escriba el codigo "}
            placeholderColor={"white"}
            value={codigo}
            functionHook={setCodigo}
            styleInput={RegisterScreenStyle.input}
          />
        ) : null}

        {/*         <InputComponent
          labelText={"Celular"}
          labelStyle={RegisterScreenStyle.label}
          placeholder={"Escriba su numero de celular"}
          placeholderColor={"white"}
          styleInput={RegisterScreenStyle.input}
        /> */}
        {/*         <InputComponent
          labelText={"Contraseña"}
          labelStyle={RegisterScreenStyle.label}
          placeholder={"Escriba su contraseña"}
          placeholderColor={"white"}
          styleInput={RegisterScreenStyle.input}
          secureText={true}
        />
        <InputComponent
          labelText={"Repetir contraseña"}
          labelStyle={RegisterScreenStyle.label}
          placeholder={"Repita su contraseña"}
          placeholderColor={"white"}
          styleInput={RegisterScreenStyle.input}
          secureText={true}
        /> */}
      </View>

      <View>
        <ButtonComponent
          buttonStyle={RegisterScreenStyle.button}
          textButtonStyle={RegisterScreenStyle.textButton}
          textButton={"Agregar"}
          functionButton={onSave}
        />
      </View>
      {/*       <View style={RegisterScreenStyle.checkboxContainer}>
        <Checkbox  value = {isChecked} onValueChange={setChecked}/>
        <Text style={RegisterScreenStyle.textCheckbox}>
            Estoy de acuerdo con los términos y condiciones
        </Text>
      </View> */}
      {/*       <View style={RegisterScreenStyle.containerTextLogin}>
        <Text style={RegisterScreenStyle.textLogin}>¿Ya se registró? </Text>
        <TouchableOpacity style={RegisterScreenStyle.linkContainer}>
          <Text style={RegisterScreenStyle.loginLink}>Inicie sesión</Text>
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          height: 40,
          width: 130,
          backgroundColor: "red",
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 20
        }}
      >
        <Pressable onPress={() => Auth.signOut()}>
          <Text style={{ fontSize: 15, color: "white" }}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;
