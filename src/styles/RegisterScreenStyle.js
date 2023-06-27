import React from "react";
import { StyleSheet } from "react-native";

const RegisterScreenStyle = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 50
  },
  imageContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  inputsContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    paddingBottom: 5,
    alignSelf: "center",
    color: "white",
  },
  input: {
    padding: 10,
    borderWidth: 2,
    height: 40,
    marginHorizontal: 50,
    borderRadius: 23,
    borderColor: "white",
    color: "white",
    marginBottom: 20,
  },
  button: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    width: 130,
    backgroundColor: "#3C4D8E",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
    fontSize: 15,
  },
  containerTextLogin: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "center",
    marginTop: 40,
  },
  textLogin: {
    color: "white",
    fontSize: 20,
  },
  loginLink: {
    color: "blue",
    fontSize: 20,
    alignSelf: "center",
  },
  linkContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
    alignItems: "center"
  },
  textCheckbox: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
  },
});
export default RegisterScreenStyle;
