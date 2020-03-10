import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { RNCamera } from 'react-native-camera';
class TakePhoto extends Component {
 constructor(props){
 super(props);
 }

 handleUploadPhoto = () => {
  fetch("http://10.0.2.2:3333/api/v0.0.5/user/photo", {
    method: "POST",
    body: createFormData(this.state.photo, { userId: "123" }),
    method: "PUT",
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + user.token
    }
  })
    .then(response => response.json())
    .then(response => {
      console.log("upload succes", response);
      alert("Upload success!");
      this.setState({ photo: null });
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
};

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
 }
 };
}
const styles = StyleSheet.create({
 container: { flex: 1, flexDirection: 'column' },
 preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
 capture: { flex: 0, borderRadius: 5, padding: 15, paddingHorizontal: 20,
 alignSelf: 'center', margin: 20, }
});
export default TakePhoto