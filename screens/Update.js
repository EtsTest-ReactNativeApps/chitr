import * as React from 'react';
import {TouchableOpacity,StyleSheet, ActivityIndicator,Text, View,TextInput,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class Update extends React.Component {

    //This constructor is used to create and initialise the objects below     
    constructor(props){
        //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
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
    //This function handles the given_name textnput and is called everytime the given_name is changed
    handleGivenName = (text) => {
      this.setState({
        given_name: text,
        UserInfo: { ...this.state.UserInfo, given_name: text}
      })
    }
      //This function handles the family_name textnput and is called everytime the family_name is changed
      handleLastName = (text) => {
        this.setState({
          family_name: text,
          UserInfo: { ...this.state.UserInfo, family_name: text}
        })
      }

    //This function handles the email textnput and is called everytime the email is changed
      handleEmail = (text) => {
        this.setState({
          email: text,
          UserInfo: { ...this.state.UserInfo, email: text}
        })
      }

      //This function handles the password textnput and is called everytime the password is changed
      handlePass = (text) => {
        this.setState({
          password: text,
          UserInfo: { ...this.state.UserInfo, password: text}
        })
      }

   
      //This function sends an API request to server in order to update the user's data
      updateAccount(){
        //create an object and include the relevant data to be updated, this object is placed in the body of request
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
        if(response.status === 201){ // if the process was valid, pop up a confirmation window and navigate the user back to their profile
        Alert.alert("User info updated!");
        this.props.navigation.navigate('MyProfile');
        }
        else if (response.status === 401){ // if the process was invalid, pop up a confirmation window and navigate the user back to their profile
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

      //sends an API request to the server to get the selected user's info in order to update them latley
      getUserInfo(user_id){
            return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}`)
          .then((response) => response.json())
          .then((responseJson) => {
          this.setState({
          isLoading: false,
          UserInfo: responseJson,  // store the incoming data from server in this object and retreive below within the render
          });
          })
          .catch((error) =>{
          console.log(error);
          });        
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

    //This async function retrieves the user id value from the local storage
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('user_id')
        console.log("user_id getData "+ (value))
        if(value !== null) {
          this.setState({
              user_id: value
            });
            this.getUserInfo(value);  // call this function once the user id value if retrieved to pull up the selected user info
        }
      } catch(e) {
        // error reading value
      }
  }

    //navigate the user to their profile once the associated button is clicked
    Cancel = () => {
      this.props.navigation.navigate('MyProfile');
      }
    //This method is called after all the elements of the page are rendered, which renders the function getData() to get the user id and getToken to get the token
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

  <TouchableOpacity  style = {styles.cancelStyle}
    onPress={() =>this.Cancel()}>       
    <Text style={styles.cancelText}>
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

  cancelText: {
    fontSize : 22,
    alignSelf:'center',
    color : 'red',
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
  cancelStyle: {
    borderRadius : 25,
    borderWidth: 2,
    borderColor: 'red',
    marginLeft : 20,
    marginRight : 20,
    padding :9,
    marginBottom : 15,
  },
  
})

