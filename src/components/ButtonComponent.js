import { Text, TouchableOpacity } from "react-native";

const ButtonComponent = ({ buttonStyle, textButtonStyle, textButton, functionButton }) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={functionButton}>
      <Text style={textButtonStyle}>{textButton}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
