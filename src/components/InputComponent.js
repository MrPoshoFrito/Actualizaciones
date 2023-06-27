import { View, TextInput, Text } from "react-native";
import LoginStyles from "../styles/LoginStyles";
const InputComponent = ({
  placeholder,
  secureText,
  placeholderColor,
  styleInput,
  keyboardType,
  labelText,
  labelStyle,
  functionHook,
  value
  
}) => {
  return (
    <View>
      <Text style={labelStyle}>{labelText}</Text>
      <TextInput
        placeholder={placeholder}
        style={styleInput}
        secureTextEntry={secureText}
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        onChangeText={functionHook}
        value={value}
      ></TextInput>
    </View>
  );
};

export default InputComponent;
