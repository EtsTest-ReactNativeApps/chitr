import React, { Component } from 'react';
import { RefreshControl, Alert, Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Paragraph } from 'react-native-paper';

class UserInfo extends Component {
  //This constructor is used to create and initialise the objects below     
  constructor(props) {
    //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
    super(props);
    //This state defines the data type of the objects below
    this.state = {
      isVisible: true,
      isVisible2: true,
      refreshing: false,
      setRefreshing: false,
      token: null,
      user_id: '',
      loggedUserID: '',
      given_name: '',
      family_name: '',
      text: '',
      email: '',
      chit_id: '',
      chit_content: '',
      timestamp: '',
      UserInfo: '',
    };
  }

  //This function sends an API request to the server for a user to follow another and takes a parameter which is the user id
  followUser(user_id) {
    //create an object and include only the user id within it according to API spec, this object is placed in the body of request
    let result = JSON.stringify({
      user_id: this.state.user_id,
    })
    console.log('RESULT' + result)
    console.log(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}/follow`)
    return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}/follow`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token, // attach the logged user's token into the header for this request to be valid
        },
        body: result
      })
      .then((response) => {
        console.log("response" + response)

        if (response.status === 200) { // if the process was valid, a confirmation message pops up
          Alert.alert("You're following this user now");
        }
        else if (response.status === 404) {
          console.log('Not found user')
        }
        else if (response.status === 401) {
          console.log('Not found user')
          Alert.alert("Unauthorised operation");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //This function sends an API request to the server for a user to unfollow a followed user and takes a parameter which is the user id
  unFollowUser(user_id) {
    //create an object and include only the user id within it according to API spec, this object is placed in the body of request
    let result = JSON.stringify({
      user_id: this.state.user_id,
    })
    console.log('RESULT' + result)
    console.log(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}/follow`)
    return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}/follow`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token, // attach the logged user's token into the header for this request to be valid
        },
        body: result
      })
      .then((response) => {
        console.log("response" + response)

        if (response.status === 200) { // if the process was valid, a confirmation message pops up
          Alert.alert("You have unfollowed this user");
        }
        else if (response.status === 404) {
          console.log('Not found user')
        }
        else if (response.status === 401) {
          console.log('Not found user')
          Alert.alert("Unauthorised operation");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //This function sends an API request to the server for retrievinga user info, it takes a parameter which is the user id
  getUserInfo(user_id) {
    return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}`)

      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({

          isLoading: false,
          UserInfo: responseJson, // store the incoming data from server in this object and retreive below within the render
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  //This async function is used to store the selected user id in a local storage in order to retrieve this user's following users
  toFollowing = async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      //this.props.navigation.dispach();
      this.props.navigation.navigate('Following');// navigate to the following users of the selected user once the following component is clicked
    } catch (e) {
    }
  }

  //This async function is used to store the selected user id in a local storage in order to retrieve this user's followers users
  toFollowers = async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      //this.props.navigation.dispach();
      this.props.navigation.navigate('Followers'); // navigate to the followers' users of the selected user once the follower component is clicked
    } catch (e) {
    }
  }

  //This async function is used to store the selected user id in a local storage in order to retrieve this user's info
  toUpdate = async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('Update'); //navigate to the update component to pull up  the selected user info
    } catch (e) {
    }
  }

  //This function stores the user's post location in the local storage to retrieve it later somewhere else, and navigate to GeoLocation page to pull the map
  toGeoLocation = async (location) => {
    await AsyncStorage.setItem('location', (location).toString());
    this.props.navigation.navigate('Geolocation');
  }

  //This function helps with hiding certain components for not-logged users
  ToggleFunction = (user_id, loggeduserID) => {
    if (user_id != loggeduserID || this.state.token === undefined) { // hide components like update account-upload a profile photo when the user id of the user doesn't match with the logged user
      this.setState(state => ({
        isVisible: !state.isVisible,
      }));
    }

  };

  //This function also help with hiding certain components for not-logged users
  ToggleFunction2 = (user_id, loggeduserID) => {
    console.log("test token" + this.state.token)

    if (user_id == loggeduserID || this.state.token === null) {
      this.setState(state => ({
        isVisible2: !state.isVisible2,
      }));
    }
  };

  //This async function returns a promise which is the user id that is stored in a local storage, it needs to be retrieved to get the logged user id using the keyword await, which makes JavaScript wait until it gets the user id
  getLoggedUserID = async () => {
    this.getToken();
    try {
      const value = await AsyncStorage.getItem('user_id')
      if (value !== null) {
        this.setState({
          loggedUserID: value
        });
      }
      this.ToggleFunction(this.state.user_id, this.state.loggedUserID); // trigger the function which hides/show components
      this.ToggleFunction2(this.state.user_id, this.state.loggedUserID);// trigger the function which hides/show components

    } catch (e) {
    }
  }

  //This async function retrieves the user id value from the local storage
  getUserID = async () => {

    try {
      const value = await AsyncStorage.getItem('userid')
      console.log("getuserID fun" + value)
      if (value != null) {
        this.setState({
          user_id: value
        });
        this.getLoggedUserID();
        this.getUserInfo(value); // trigger the function which pulls up the user info 

      }
      else if (value = null) {
        this.setState({
          value: loggedUserID
        });
        console.log("not here ")
        this.getLoggedUserID();
        this.getUserInfo(value);
      }

    } catch (e) {
      // error reading value
    }
  }

  //get the token stored in the local storage
  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      console.log("getdata" + value)
      if (value !== null) {
        // this.ToggleFunction(value);
        this.setState({
          token: value
        });
      }

    } catch (e) {
      // error reading value
    }
  }

  //This async function is used to store the selected user id in a local storage in order to retrieve this user's profile photo
  toUserPhoto = async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('UserPhoto'); //navigate to the user photo component to pull up the selected user photo
    } catch (e) {
    }
  }

  //This async function is used to store the selected user id in a local storage in order to retrieve this user's chit photo
  toChitPhoto = async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('ViewChitPhoto');//navigate to the user photo component to pull up the selected user's chit photo
    } catch (e) {
    }
  }

  //This async function is used to store the selected user id in a local storage and then to navigate the user to Update info screen
  toUpdate = async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      //this.props.navigation.dispach();
      this.props.navigation.navigate('Update');
    } catch (e) {
    }
  }

  //This function handles the logout by clearing the local storage from token and navigate to Start screen
  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Start');
  }

  //This method is called after all the elements of the page are rendered, which renders the function getUserID(), and also trigger the nested function inside it too.
  componentDidMount() {
    this.getUserID();
  }

  //This async function navigates the user to the upload chit photo once clicked on the assosicated component
  toUplaodChitPic = async () => {
    try {
      this.props.navigation.navigate('ChitPhoto');
    } catch (e) {
    }
  }

  //This function navigates the user to the upload profile photo once clicked on the assosicated component
  toUpdatePhoto = async () => {
    try {
      this.props.navigation.navigate('UpdatePhoto');
    } catch (e) {
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View>
        <Text style={styles.headerText}>UserInfo</Text>
        <Text style={styles.userNameStyle} >{this.state.UserInfo.given_name + ' ' + this.state.UserInfo.family_name + '     ' + this.state.UserInfo.email}</Text>
        <TouchableOpacity style={styles.buttonStyle}
          onPress={() => this.toFollowing(this.state.user_id)}>
          <Text style={styles.textStyle}>
            Following
    </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle}
          onPress={() => this.toFollowers(this.state.user_id)}>
          <Text style={styles.textStyle}>
            Followers
      </Text>
        </TouchableOpacity>

        {
          this.state.isVisible2 ? <TouchableOpacity style={styles.buttonStyle}
            onPress={() => this.followUser(this.state.user_id)}>
            <Text style={styles.textStyle}>
              Follow
      </Text>
          </TouchableOpacity> : null
        }

        {
          this.state.isVisible2 ? <TouchableOpacity style={styles.buttonStyle}
            onPress={() => this.unFollowUser(this.state.user_id)}>
            <Text style={styles.textStyle}>
              Unfollow
      </Text>
          </TouchableOpacity> : null
        }

        <TouchableOpacity style={styles.buttonStyle}
          onPress={() => this.toUserPhoto(this.state.user_id)}>
          <Text style={styles.textStyle}>
            View profile photo
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle}
          onPress={() => this.toChitPhoto(this.state.user_id)}>
          <Text style={styles.textStyle}>
            View chit photo
        </Text>
        </TouchableOpacity>

        {
          this.state.isVisible ? <TouchableOpacity style={styles.buttonStyle}
            onPress={() => this.toUpdate(this.state.user_id)}>
            <Text style={styles.textStyle}>
              Update account
        </Text>
          </TouchableOpacity> : null
        }

        {
          this.state.isVisible ?
            <TouchableOpacity style={styles.buttonStyle}
              onPress={() => this.toUpdatePhoto()}>
              <Text style={styles.textStyle}>
                Update profile Photo
          </Text>
            </TouchableOpacity> : null
        }
        {
          this.state.isVisible ? <TouchableOpacity style={styles.buttonStyle}
            onPress={() => this.toUplaodChitPic()}>
            <Text style={styles.textStyle}>
              Upload chit photo
        </Text>
          </TouchableOpacity> : null
        }

        {
          this.state.isVisible ? <TouchableOpacity style={styles.buttonStyle}
            onPress={() => this.logout()}>
            <Text style={styles.textStyle}>
              Logout
        </Text>
          </TouchableOpacity> : null
        }

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }

          data={this.state.UserInfo.recent_chits}
          renderItem={({ item }) =>
            <View>
              <TouchableOpacity onPress={() => this.toGeoLocation(item.timestamp)} >
                <Card style={styles.card}>
                  <Card.Content>
                    <Paragraph style={styles.chits}>{item.chit_content}</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}

export default UserInfo;

const styles = StyleSheet.create({

  headerText: {
    fontSize: 27,
    alignSelf: 'center',
    color: '#007aff',
    fontWeight: '600',
  },

  textStyle: {
    fontSize: 22,
    alignSelf: 'flex-start',
    color: '#007aff',
    fontWeight: '600',
  },
  chits: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
  },

  userNameStyle: {
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 20,
    color: 'purple',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },

  buttonStyle: {
    alignSelf: 'flex-start',
    borderRadius: 25,
    borderColor: '#007aff',
    marginLeft: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  card: {
    margin: 5
  },

});