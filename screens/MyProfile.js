import * as React from 'react';
import {StyleSheet, Text, View,Button,TextInput,Alert,KeyboardAvoidingView } from 'react-native';

export default class MyProfile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        given_name: '',
        family_name: '',
        email: '',
        password: '',
        loginEmail:'',
        loginPass:'',
        chit_id: '',
        chit_content:'',
        timestamp: '',
        location: {
        longitude: '',
        latitude: ''
        }
        };  
    }

    handleGivenName = (text) => {
        this.setState({ given_name: text })
      }
    handleLastName = (text) => {
        this.setState({ family_name: text })
      }
    handleEmail = (text) => {
      this.setState({ email: text })
      }
    handlePass = (text) => {
      this.setState({ password: text })
      }
    handleLoginEmail = (text) => {
        this.setState({ loginEmail: text })
      }
    handleLoginPass = (text) => {
        this.setState({ loginPass: text })
      }


 render(){
 return (
<View>    
  <Text> MY PROFILE</Text>
</View> 
  );
 }
}

const styles = StyleSheet.create({
  container: {
     paddingTop: 50,
     alignItems: 'center',
     justifyContent: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  contain : {
    padding : 20,
    margin : 40,
  }
  
})