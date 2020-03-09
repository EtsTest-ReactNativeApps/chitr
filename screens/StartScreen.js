import * as React from 'react';
import {StyleSheet, ActivityIndicator,StatusBar,Text, View,Button,TextInput,Alert,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createSwitchNavigator } from 'react-navigation';
import Newsfeed from './Newsfeed'

const userinfo ={username : 'admin', password : 'pass'}

export default class ChittrApp extends React.Component {

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
    Alert.alert("Account created!");
    })
    .catch((error) => {
    console.error(error);
    });
}

Show =()=>{
    this.props.navigation.navigate('Home');
}

  
  userLogin() {
    return  fetch("http://10.0.2.2:3333/api/v0.0.5/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
          loginEmail: this.state.loginEmail,
          loginPass: this.state.loginPass,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        AlertIOS.alert(
          "Login Success!",
        )
      })
      .done();

    }

    login (){

      // let data = {
      //   token : responseData.token,
      //   loginEmail : this.state.loginEmail,
      //   loginPass : this.state.loginPass,
      // }
      //AsyncStorage.setItem('token',JSON.stringify(data));
        fetch("http://10.0.2.2:3333/api/v0.0.5/login", {
          
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },      
        body: JSON.stringify({  
           loginEmail: 'khaled@gmail.com',
           loginPass: 'khaled',
          //  loginEmail: this.state.loginEmail,
          //  loginPass: this.state.loginPass,
          
        })
      })
      .then((response) => response.json())
      .then((response)=>{
        console.log ("response", response)
        if (response.status === 200){
          console.log ("YOU'RE iN")
          const token = responseData.token;
          AsyncStorage.setItem('token',token)
          responseData.json();
        } else if(response.status === 400){
          console.log ("Something wrong")
        }
      })
      console.log ("response", response)

      .done();
      
      }
  
    displayData = async () =>{

      try {
        const token = await AsyncStorage.getItem('token');
        //let parsed = JSON.parse(token);
        // alert(parsed.token);
        alert(token);
      }
      catch(error){
        alert(error);
      }
    }

    

    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
 render(){
 return (
<View>    
    <KeyboardAvoidingView behavior ="position" enabled style = {styles.contain}>
        <Text>Sign up for an account </Text>
        <TextInput style = {styles.input} placeholder="First name" onChangeText={this.handleGivenName} value={this.state.given_name}/>
        <TextInput style = {styles.input} placeholder="Last Name" onChangeText={this.handleLastName} value={this.state.family_name}/>
        <TextInput style = {styles.input} placeholder="Email" onChangeText={this.handleEmail} value={this.state.email} />
        <TextInput style = {styles.input} placeholder="Password" onChangeText={this.handlePass} value={this.state.password}
        secureTextEntry />
        <Button title="Create account"
        onPress={() => this.createAccount()}/>

        <Text>Log in into your account </Text>
        <TextInput
          value={this.state.loginEmail}
          onChangeText={this.handleLoginEmail}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.loginPass}
          onChangeText={this.handleLoginPass}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />   
        <Button
          title={'Login'}
          style={styles.loginBtn}
          onPress={() => this.displayData()}/>
        
    </KeyboardAvoidingView>

    <View style = {{alignItems:'center'}}>
        <Button  title="Skip to homepage"
        onPress={this.Show}/>
    </View>
</View> 
  );
 }

 _login = async()=>{
  if (userinfo.username === this.state.loginEmail && userinfo.password === this.state.loginPass){
    await AsyncStorage.setItem('isLoggedIn','1')
  this.props.navigation.navigate('Newsfeed');//navigate to a page
    alert('Logged in');
  }
  else{
    alert('username or password is incorrect');
  }
}
}

const styles = StyleSheet.create({
  container: {
     paddingTop: 50,
     alignItems: 'center',
     justifyContent: 'center',
  },
  input: {
    margin: 13,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical : 15
  },

  contain : {
    padding : 30,
    margin : 10,
    marginTop:0
    
  }
  
})