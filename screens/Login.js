import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class ChittrApp extends React.Component {

  //This constructor is used to create and initialise the objects below 
  constructor(props) {
    //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
    super(props);
    //This state defines the data type of the objects below
    this.state = {
      user_id: '',
      token: '',
      email: '',
      password: '',
      loginEmail: '',
      loginPass: '',
    };
  }

  //This function handles the email textnput and is called everytime the email is changed
  handleLoginEmail = (text) => {
    this.setState({ loginEmail: text })
  }
  //This function handles the password textnput and is called everytime the password is changed
  handleLoginPass = (text) => {
    this.setState({ loginPass: text })
  }

  //This async function is used to store the fetched token in a local storage in order to retrieve it later on when needed
  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token)
      console.log("store token " + token);
    } catch (e) {
    }
  }
  //This async function is used to store the fetched user_id in a local storage in order to retrieve it later on when needed
  storeId = async (user_id) => {
    try {
      await AsyncStorage.setItem('user_id', JSON.stringify(user_id))
    } catch (e) {
    }
  }

  //This function sends an API request to the server requesting to validate the input data in order to log in
  login() {
    var token = '';
    fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token // store the generated token after validating the login
      },
      body: JSON.stringify({
        email: this.state.loginEmail,
        password: this.state.loginPass,
      })
    })

      .then((response) => {
        if (response.status === 400) { // if the inserted data was invalid, the user will not get an access
          Alert.alert("Invalid email/password")
        }

        return response.json()

          .then((responseData) => {
            const JsonToken = responseData.token;
            const user = responseData.id;
            this.setState({
              token: JsonToken,
              user_id: user
            });
            if (response.status === 200) { // if the inserted data was valid, grant the user an access and navigate them to Newsfeed page
              this.storeId(this.state.user_id);
              this.storeToken(this.state.token);
              this.props.navigation.navigate('Newsfeed');//navigate to a page
            }
          })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
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
        <TouchableOpacity style={styles.buttonStyle}
          onPress={() => this.login()}>
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
    marginVertical: 15,
    fontSize: 20,

  },
  textStyle: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#007aff',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },

  buttonStyle: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007aff',
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginBottom: 10,
  },

})

