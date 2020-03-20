import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert } from 'react-native';

export default class Signup extends React.Component {

  //This constructor is used to create and initialise the objects below     
  constructor(props) {
    //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
    super(props);
    //This state defines the data type of the objects below
    this.state = {
      given_name: '',
      family_name: '',
      email: '',
      password: '',
    };
  }

  //This function handles the given_name textnput and is called everytime the given_name is changed
  handleGivenName = (text) => {
    this.setState({ given_name: text })
  }
  //This function handles the family_name textnput and is called everytime the family_name is changed
  handleLastName = (text) => {
    this.setState({ family_name: text })
  }
  //This function handles the email textnput and is called everytime the email is changed
  handleEmail = (text) => {
    this.setState({ email: text })
  }
  //This function handles the password textnput and is called everytime the password is changed
  handlePass = (text) => {
    this.setState({ password: text })
  }

  //navigate the user to Start page, and it is triggered once they have created an accoutn successfully
  toStart = () => {
    this.props.navigation.navigate('Start');
  }

  //This function sends an API request to server in order to create an account
  createAccount() {
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
        if (response.status === 201) { // if the operation was valid, pop up a confirmation message and navigate the user to Start screen
          Alert.alert("Account created!");
          this.toStart();
        }
        else if (response.status === 400) {
          Alert.alert(" Failed to create the account !");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <Text style={styles.textStyle} >Sign up for an account </Text>
        <TextInput style={styles.fields} placeholder="First name" onChangeText={this.handleGivenName} value={this.state.given_name} />
        <TextInput style={styles.fields} placeholder="Last Name" onChangeText={this.handleLastName} value={this.state.family_name} />
        <TextInput style={styles.fields} placeholder="Email" onChangeText={this.handleEmail} value={this.state.email} />
        <TextInput style={styles.fields} placeholder="Password" onChangeText={this.handlePass} value={this.state.password}
          secureTextEntry />
        <TouchableOpacity style={styles.buttonStyle}
          onPress={() => this.createAccount()}>
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

