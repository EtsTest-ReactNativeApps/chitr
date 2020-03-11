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
        email: '',
        password: '',
        loginEmail:'',
        loginPass:'',
        };
    } 
    
    
    
    handleLoginEmail = (text) => {
        this.setState({ loginEmail: text })
      }
    handleLoginPass = (text) => {
        this.setState({ loginPass: text })
      }
Show =()=>{
    this.props.navigation.navigate('Home');
}

storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
    console.log("store token " + token);
  } catch (e) {
  }
}
  
  
    login(){
      var token = '';
       fetch('http://10.0.2.2:3333/api/v0.0.5/login',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token
        },     
        body: JSON.stringify({  
          email: 'yamenedel@gmail.com',
          password: 'yamen',
       })
    })
      .then((response) => {
        return response.json()
      .then((responseData) => {
        const JsonToken = responseData.token;  
        this.setState({
          token: JsonToken
        });
        console.log(this.state.token)

        // AsyncStorage.setItem('token', (JsonToken)); 
        if (response.status === 200){
          this.storeToken(this.state.token);
          this.props.navigation.navigate('Newsfeed');//navigate to a page
          console.log ("YOU'RE iN")

          //AsyncStorage.setItem('token',token)
        } else if(response.status === 400){
          console.log ("Something wrong")
        }
    })
  })
    .catch((error) =>{
      console.log(error);
      });     
    }
      
 render(){
   
 return (
<View style = {{ flex : 1,justifyContent:'space-evenly'  }}>   
        <Text style={styles.textStyle}>Log in into your account </Text>

        <TextInput
          value={this.state.loginEmail}
          onChangeText={this.handleLoginEmail}
          placeholder={'Email'}
          style={styles.fields}
        />
        <TextInput
          value={this.state.loginPass}
          onChangeText={this.handleLoginPass}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.fields}
        />   
        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.login()}>
            <Text style={styles.textStyle}>
            Login
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

