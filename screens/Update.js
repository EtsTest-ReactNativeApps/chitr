import * as React from 'react';
import {FlatList,TouchableOpacity,StyleSheet, ActivityIndicator,StatusBar,Text, View,Button,TextInput,Alert,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createSwitchNavigator } from 'react-navigation';
import Newsfeed from './Newsfeed'

export default class Update extends React.Component {


    constructor(props){
        super(props);
        this.state = {
        token : '',
        given_name: '',
        family_name: '',
        email: '',
        password: '',
        UserInfo : '',    
        };  

    }
         
    handleGivenName = (text) => {
      this.setState({
        given_name: text,
        UserInfo: { ...this.state.UserInfo, given_name: text}
      })
    }
      handleLastName = (text) => {
        this.setState({
          family_name: text,
          UserInfo: { ...this.state.UserInfo, family_name: text}
        })
      }

      handleEmail = (text) => {
        this.setState({
          email: text,
          UserInfo: { ...this.state.UserInfo, email: text}
        })
      }
      handlePass = (text) => {
        this.setState({
          password: text,
          UserInfo: { ...this.state.UserInfo, password: text}
        })
      }

   
      updateAccount(){

      
        let result = JSON.stringify({
            given_name: this.state.UserInfo.given_name,
            family_name: this.state.UserInfo.family_name,
            email: this.state.UserInfo.email,
            password: this.state.UserInfo.password,
        })

        let User_ID = this.state.user_id;
        console.log(`http://10.0.2.2:3333/api/v0.0.5/user/${User_ID}`)
        console.log("token "+this.state.token)

        return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${User_ID}`,
        {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':this.state.token ,
          },
        body: result
      })
        .then((response) => {

      console.log("response"+response)
      console.log("response status " + response.status)
        if(response.status === 201){
        Alert.alert("User info updated!");
        }
        else if (response.status === 401){
        console.log('Unauthtorised access!') 
        Alert.alert("Unauthtorised access");
        }
        else if (response.status === 404){
          console.log('Not found') 
          Alert.alert("User not found");
          }
            })   
        .catch((error) => {
        console.error(error);
        });
      }

      getUserInfo(user_id){
        
        let result = JSON.stringify({
            given_name: this.state.given_name,
            family_name: this.state.family_name,
            email: this.state.email,
            password: this.state.password,
        })
        const user_ID = '';
          return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}`)
          .then((response) => response.json())
          .then((responseJson) => {
          this.setState({
          isLoading: false,
          UserInfo: responseJson,
        //  given_name : responseJson.given_name
          user_ID : this.state.UserInfo.given_name,

          });
          })
          .catch((error) =>{
          console.log(error);
          });
          
      }

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

    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('user_id')
        console.log("user_id getData "+ (value))
        if(value !== null) {
          this.setState({
              user_id: value
            });
            this.getUserInfo(value);   
        }
      } catch(e) {
        // error reading value
      }
  }
  
    componentDidMount(){
        this.getData();
        this.getToken();
       } 
      
 render(){
    if(this.state.isLoading){
        return(
        <View>
        <ActivityIndicator/>
        </View>
        )
    }
 return (
<View style = {{ flex : 1,justifyContent:'space-evenly'}}>   
<Text style = {styles.textStyle} >Update user info</Text>
<TextInput style = {styles.fields} placeholder="First name" onChangeText={this.handleGivenName} value = {this.state.UserInfo.given_name}/>
        <TextInput style = {styles.fields}  placeholder="Last Name" onChangeText={this.handleLastName} value = {this.state.UserInfo.family_name} />
        <TextInput style = {styles.fields} placeholder="Email" onChangeText={this.handleEmail} value = {this.state.UserInfo.email} />
        <TextInput style = {styles.fields} placeholder="Password" onChangeText={this.handlePass}value = {this.state.UserInfo.password} secureTextEntry />
  <TouchableOpacity  style = {styles.buttonStyle}
    onPress={() =>this.updateAccount()}>
    <Text style={styles.textStyle}>
    Update
    </Text>
  </TouchableOpacity>

  <TouchableOpacity  style = {styles.buttonStyle}
    onPress={() =>this.updateAccount()}>
    <Text style={styles.textStyle}>
    Cancel
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
    padding :9,
    marginBottom : 15,
  },
  
})

