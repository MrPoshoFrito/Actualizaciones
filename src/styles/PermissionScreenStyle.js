import { StyleSheet } from "react-native";

const PermissionScreenStyle = StyleSheet.create({
  page: {
    backgroundColor: "#d9faf8",
    flex: 1,
    width: "100%",
    alignItems: "center",
    

  },
  textContainer: {
    // backgroundColor: 'red',
    alignItems: "center",
    marginTop: 250,
    
  },
  title: {
    marginTop: 30,
    fontFamily: 'HappyMonkey',
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold'
    
    
  },
  subtitle:{
    fontFamily: 'HappyMonkey',
    marginHorizontal: 35,
    fontSize: 20,
    fontWeight: '600'
  },
  button:{
    marginTop: 50,
    borderWidth: 2,
    width: 45,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: 'lightgreen'
  },
  buttonText:{
    fontWeight: "bold",

  },
  permiso:{
    fontSize: 10
  }
});

export default PermissionScreenStyle;
