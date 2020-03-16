import * as React from 'react';
import {TouchableOpacity,StyleSheet, ActivityIndicator,StatusBar,Text, View,Button,TextInput,Alert,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createSwitchNavigator } from 'react-navigation';
import Newsfeed from './Newsfeed'

export default class ChittrApp extends React.Component {


    constructor(props){
        super(props);
        this.state = {
        token : '',
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
         
      toStart =()=>{
        this.props.navigation.navigate('Start');
      }
createAccount(){
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user",
    {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify({
      
    given_name: this.state.given_name,
    family_name: this.state.family_name,
    email: this.state.email,
    password: this.state.password,
    })
    })
    
    .then((response) => {
    if (response.status === 201){
      Alert.alert("Account created!");
      this.toStart();
    }
    else if (response.status === 400){
      Alert.alert(" Failed to create the account !");
    }
    })
    .catch((error) => {
    console.error(error);
    });
}

storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
    console.log("store token " + token);
  } catch (e) {
    // saving error
  }
}
      
 render(){
   
 return (
<View style = {{ flex : 1,justifyContent:'space-around'  }}>   
        <Text style = {styles.textStyle} >Sign up for an account </Text>
        <TextInput style = {styles.fields} placeholder="First name" onChangeText={this.handleGivenName} value={this.state.given_name}/>
        <TextInput style = {styles.fields} placeholder="Last Name" onChangeText={this.handleLastName} value={this.state.family_name}/>
        <TextInput style = {styles.fields} placeholder="Email" onChangeText={this.handleEmail} value={this.state.email} />
        <TextInput style = {styles.fields} placeholder="Password" onChangeText={this.handlePass} value={this.state.password}
        secureTextEntry /> 

{/* <Button  title = "poo" onPress={() =>this.createAccount()}> >
</Button> */}
  <TouchableOpacity  style = {styles.buttonStyle}
    onPress={() =>this.createAccount()}>
    <Text style={styles.textStyle}>
    Create account
    </Text>
  </TouchableOpacity>
</View>
  );
 }

 
}

const styles = StyleSheet.create({

  fields: {
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical : 15,
    fontSize : 20,

  },
  textStyle: {
    fontSize : 22,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },

  buttonStyle: {
    borderRadius : 25,
    borderWidth: 2,
    borderColor: '#007aff',
    marginLeft : 20,
    marginRight : 20,
    padding : 10,
    marginBottom : 10,
  },
 
})

