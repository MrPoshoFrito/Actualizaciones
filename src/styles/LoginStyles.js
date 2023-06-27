import { StyleSheet } from "react-native";
import colors from "../../assets/globalStyles/colors";

const LoginStyles = StyleSheet.create({
  page: {
    height: "100%",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 70,
  },
  inputsContainer: {
    width: "100%",
    marginTop: 70,
  },
  celphoneInput: {
    padding: 10,
    borderWidth: 2,
    height: 50,
    marginHorizontal: 50,
    borderRadius: 23,
    marginBottom: 70,
    borderColor: "white",
    color: "white",
  },
  passwordInput: {
    borderRadius: 23,
    borderWidth: 2,
    height: 50,
    marginHorizontal: 50,
    borderColor: "white",
    marginBottom: 70,

    padding: 10,
  },
  labelText: {
    fontSize: 20,
    paddingBottom: 10,
    alignSelf: "center",
    color: "white",
  },
  noAccount: {
    position: "absolute",
    marginTop: 750,
    flexDirection: "row",
  },
  textNoAcc: {
    fontSize: 20,
    color: "white",
  },
  button: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    width: 130,
    backgroundColor: "#3C4D8E",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  registerLink: {
    color: "blue",
    fontSize: 20,
  },
});
export default LoginStyles;
