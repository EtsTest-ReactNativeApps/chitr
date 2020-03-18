import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';

class UpdatePhoto extends Component {
 constructor(props){
 super(props);
 this.state = {
    token : '',
    };  
 }

 getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
        this.setState({
            token: value
          });
          console.log("token" + this.state.token) 
      }
    } catch(e) {
      // error reading value
    }
}

componentDidMount(){
  this.getToken();
} 


takePic = async()=>{
  console.log("start");

  console.log(this.state.user_id )

  console.log(this.state.token )
    if (this.camera){
        const options = {quality : 0.5, base64 : true}
        const data = await this.camera.takePictureAsync(options);
        console.log(data.uri, this.state.token);
        console.log(`http://10.0.2.2:3333/api/v0.0.5/user/photo`);

        return fetch (`http://10.0.2.2:3333/api/v0.0.5/user/photo`,
        {
            method : 'POST',
            headers : {
                "Content-Type" : "image/jpeg",
                "X-Authorization" : this.state.token
            },
            body : data
        })
        .then((response) =>{
          console.log("response status : "+response.status)
          if (response.status === 201){
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
      <Text style={{ fontSize: 16 }}>
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
 alignSelf: 'center', margin: 20, }
});
export default UpdatePhoto