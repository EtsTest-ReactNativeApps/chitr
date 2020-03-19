import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';
class ChitPhoto extends Component {
    //This constructor is used to create and initialise the objects below     
    constructor(props){
    //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
    super(props);
    //This state defines the data type of the objects below
    this.state = {
        token : '',
        user_id : '',
        };  
    }


    //This async function retrieves the user id value from the local storage     
    getuserID = async () => {
        try {
        const value = await AsyncStorage.getItem('user_id')
        if(value !== null) {
            this.setState({
                user_id: value,
            });      
        }
        

        } catch(e) {
        // error reading value
        }
    }

    //This async function gets the token stored in the local storage to attach it in the API request header
    getToken = async () => {
        try {
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
            this.setState({
                token: value
            });
        }
        } catch(e) {
        // error reading value
        }
    }
    //This method is called after all the elements of the page are rendered, which renders the function getToken() to get the token and getuserID to get the user id 
    componentDidMount(){
    this.getuserID();
    this.getToken();     
    } 

//This async function sends an API request to the server for the user to take a picture for a chit, attaching the token within the header
takePic = async()=>{
  console.log("token " +this.state.token )
    if (this.camera){
        const options = {quality : 0.5, base64 : true}
        const data = await this.camera.takePictureAsync(options);
        console.log(data.uri, this.state.token);
        console.log(`http://10.0.2.2:3333/api/v0.0.5/chits/${this.state.user_id}/photo`);
        return fetch (`http://10.0.2.2:3333/api/v0.0.5/chits/${this.state.user_id}/photo`,
        {
            method : 'POST',
            headers : {
                "Content-Type" : "image/jpeg",
                "X-Authorization" : this.state.token // attach the logged user's token into the header for this request to be valid
            },
            
            body : data
        })
        
        .then((response) =>{
          console.log("response status : "+response.status)
          if (response.status === 201){ // pop up confirmation window when a picture is taken successfully and navigate the user back to their profile
            Alert.alert("Picture added !")
            this.props.navigation.navigate('MyProfile');
          }
        })

        .catch((error)=>{
            console.error(error);
        });
    }
}

 render() {
 return (
 <View style={styles.container}>
    <RNCamera
        ref={ref => {
        this.camera = ref;
        }}
        style={styles.preview}
    />
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
            >
            <Text style={styles.textStyle}>
                CAPTURE
            </Text>
        </TouchableOpacity>
    </View>
 </View>
 );
 }

 takePicture = async() => {
 if (this.camera) {
 const options = { quality: 0.5, base64: true };
 const data = await this.camera.takePictureAsync(options);
 console.log(data.uri);
 this.takePic();
 }
 };
}
const styles = StyleSheet.create({
 container: { flex: 1, flexDirection: 'column' },
 preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
 capture: { flex: 0, borderRadius: 5, padding: 15, paddingHorizontal: 20,
 alignSelf: 'center', margin: 20, },
    textStyle: {
    fontSize : 22,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',

  },
});
export default ChitPhoto