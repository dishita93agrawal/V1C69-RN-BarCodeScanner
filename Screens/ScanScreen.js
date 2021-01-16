import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
export default class App extends React.Component {
    constructor() { 
        super();
        this.state = {
          hasCameraPermissions: null,
          scanned: false,
          scannedData:'',
          buttonState: "normal",
        };
      }
      getCameraPermission = async (id) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
          hasCameraPermissions: status === "granted",
          buttonState:"clicked",
          scanned: false,
        });
      };
      handledBarCodeScanned = async ({data}) => {
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState: "normal",
        })
      };
      render(){
          const hasCameraPermissions = this.state.hasCameraPermissions;
          const scanned = this.state.scanned;
          const buttonState = this.state.buttonState;
          if(buttonState === "clicked" && hasCameraPermissions){
              return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handledBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
              )
          }
          else if(buttonState === "normal"){
              return(
                  <View style={styles.container}>
              <Text style={styles.buttonText}>
                  {
                    hasCameraPermissions ? this.state.scannedData : "Request Camera Permission"
                  }
             </Text>
             <Image  source={require("../Scanner.png")}
              style={{ width: 200, height: 200 }}/>
              <TouchableOpacity style={styles.scanButton}  onPress={
                      ()=>{this.getCameraPermission()}
                  }>
                 
                  <Text style={styles.buttonText}>Scan QR Code</Text>
              </TouchableOpacity>
              
              </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 15,
      textAlign: "center",
      marginTop: 10,
    },
    inputView: {
      flexDirection: "row",
      margin: 20,
    },
    inputBox: {
      width: 200, 
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20,
    },
    scanButton: {
      backgroundColor: "#66BB6A",
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0,
    },
    submitButton:{
      backgroundColor:"#FBC02D",
      width:100,
      height:50,
    },
    submitButtonText:{
      fontSize:20,
      textAlign:"center",
      fontWeight:'bold',
      color:"white",
      padding:10,
    }
  });
  