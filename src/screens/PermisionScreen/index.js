import { View, Text, TouchableOpacity, Alert } from "react-native";
import PermissionScreenStyle from "../../styles/PermissionScreenStyle";

const permiso = () => {
  Alert.alert(
    "¿Quieres usar el GPS?",
    "Esta aplicación requiere permisos para utilizar el GPS de su dispositivo",
    [{ text: "Cancelar" }, { text: "Siempre" }, { text: "Solo esta vez" }]
  );
};
const PermissionScreen = () => {
  return (
    <View style={PermissionScreenStyle.page}>
      <View style={PermissionScreenStyle.textContainer}>
        <Text style={PermissionScreenStyle.title}>Utiliza el GPS</Text>
        <Text style={PermissionScreenStyle.subtitle}>
          Para ver las actividades de tus familiares en el mapa, debe aceptar
          que la aplicación utilice el GPS
        </Text>
      </View>

      <TouchableOpacity onPress={permiso}>
        <View style={PermissionScreenStyle.button}>
          <Text style={PermissionScreenStyle.buttonText}>Ok</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PermissionScreen;
