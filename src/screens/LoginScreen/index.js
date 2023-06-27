import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import LoginStyles from "../../styles/LoginStyles";
import { LinearGradient } from "expo-linear-gradient";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
const LoginScreen = () => {
  return (
    <LinearGradient
      style={LoginStyles.page}
      colors={["#FEA14C", "#ED5C86", "#eb3fc7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={LoginStyles.imageContainer}>
        <Image source={require("../../../assets/loginImages/login.png")} />
      </View>

      <View style={LoginStyles.inputsContainer}>
        <InputComponent
          placeholder={"Ej: 50558169980"}
          placeholderColor={"#ffffff"}
          styleInput={LoginStyles.celphoneInput}
          keyboardType={"numeric"}
          labelText={"Número"}
          labelStyle={LoginStyles.labelText}
        />
        <InputComponent
          placeholder={"Escriba su contraseña"}
          placeholderColor={"#ffffff"}
          styleInput={LoginStyles.passwordInput}
          labelText={"Contraseña"}
          secureText={true}
          labelStyle={LoginStyles.labelText}
        />

        <ButtonComponent
          buttonStyle={LoginStyles.button}
          textButton={"Iniciar Sesión"}
          textButtonStyle={LoginStyles.buttonText}
        />
      </View>

      <View style={LoginStyles.noAccount}>
        <Text style={LoginStyles.textNoAcc}>¿No tienes cuenta?, </Text>
        <TouchableOpacity>
          <Text style={LoginStyles.registerLink}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
