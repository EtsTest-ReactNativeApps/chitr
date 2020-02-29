import * as React from 'react';
import {StyleSheet, Text, View,Button,TextInput,Alert,KeyboardAvoidingView } from 'react-native';

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
getToken() {
  return fetch("http://10.0.2.2:3333/api/v0.0.5/",
    {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + TOKEN
          },
    })
    .then((response) => response.text())
    .then((response)=>{
    Alert.alert("Token generated!");
    })
    .catch((error) => {
    console.error(error);
    });
  }
  
  userLogin() {
    return   fetch("http://10.0.2.2:3333/api/v0.0.5/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          loginEmail: value.loginEmail,
          loginPass: value.loginPass,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        AlertIOS.alert(
          "Login Success!",
        ),
        this._onValueChange(STORAGE_KEY, responseData.id_token)
      })
      .done();
    }

 render(){
 return (
<View>    
    <KeyboardAvoidingView behavior ="position" enabled style = {styles.contain}>
        <TextInput style = {styles.input} placeholder="First name" onChangeText={this.handleGivenName} value={this.state.given_name}/>
        <TextInput style = {styles.input} placeholder="Last Name" onChangeText={this.handleLastName} value={this.state.family_name}/>
        <TextInput style = {styles.input} placeholder="Email" onChangeText={this.handleEmail} value={this.state.email} />
        <TextInput style = {styles.input} placeholder="Password" onChangeText={this.handlePass} value={this.state.password}
        secureTextEntry />
        <Button title="Create account"
        onPress={() => this.createAccount()}/>
        
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
        />
    </KeyboardAvoidingView>

    <View style = {{alignItems:'center'}}>
        <Button  title="Skip to homepage"
        onPress={this.Show}/>
    </View>
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