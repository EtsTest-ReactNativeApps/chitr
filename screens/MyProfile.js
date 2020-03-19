import React, { Component } from 'react';
import { TouchableOpacity,Alert,Text, View,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Paragraph } from 'react-native-paper';

class MyProfile extends Component{
    //This constructor is used to create and initialise the objects below 
    constructor(props){
        //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
        super(props);
        //This state defines the data type of the objects below
        this.state = {
        token : '',
        user_id : '',
        given_name: '',
        family_name: '',
        email: '',      
        chit_content:'',
        timestamp: '',
        longitude: '',
        latitude: '',
        UserInfo : '',
        };  
    }

    //This function sends an API request to the server requesting the user info using the following API url
    getUserInfo(user_id){
      console.log("start")
      console.log(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}`)
        return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}`)

        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
        this.setState({
          
        isLoading: false,
        UserInfo: responseJson, // store the incoming data from server in this object and retreive below within the render
        });
        })
        
        .catch((error) =>{
        console.log(error);
        });
      }
  
    //This async function returns a promise which is the user id that is stored in a local storage, it needs to be retrieved to get the selected user id using the keyword await, which makes JavaScript wait until it gets the user id
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('user_id')
          console.log("user_id getData "+ (value))
          if(value !== null) {
            this.setState({
                user_id: value
              });
              this.getUserInfo(value); //trigger the getUserInfo() function which takes the logged user id as a parameter to get the logged user info 
          }
        } catch(e) {
          // error reading value
        }
    }

    //get the token stored in the local storage in order to use it when a user navigates to MyProfile page
    getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token')
        console.log("getdata"+value)
        if(value !== null) {
          this.setState({
              token: value
            });
        }
      } catch(e) {
        // error reading value
      }
  }

    //This async function is used to store the selected user id in a local storage in order to retrieve this user's following users
    toFollowing= async (user_id) => {
      try {
        await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
        console.log("user id => " + user_id);
        this.props.navigation.navigate('Following'); // navigate to the following users of the selected user once the following component is clicked
      } catch (e) {
      }
  }


  //This async function is used to store the selected user id in a local storage in order to retrieve this user's followers users
  toFollowers= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('Followers'); // navigate to the followers' users of the selected user once the follower component is clicked
    } catch (e) {
    }
  }

  //This async function is used to store the selected user id in a local storage in order to retrieve this user's info
  toUpdate= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('Update'); //navigate to the update component to pull up  the selected user info
    } catch (e) {
    }
  }

  //This async function is used to store the selected user id in a local storage in order to retrieve this user's profile photo
  toUserPhoto= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('UserPhoto');//navigate to the user photo component to pull up the selected user photo
    } catch (e) {
    }
  }

  //This async function is used to store the selected user id in a local storage in order to retrieve this user's chit photo
  toChitPhoto= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('ViewChitPhoto'); //navigate to the user photo component to pull up the selected user's chit photo
    } catch (e) {
    }
  }


  //This function navigates the user to the upload chit photo once clicked on the assosicated component
  toUplaodChitPic= () => {
    try {
      this.props.navigation.navigate('UploadChitPhoto');
    } catch (e) {
    }
  }

  //This function navigates the user to the upload profile photo once clicked on the assosicated component
  toUpdatePhoto= async () => {
    try {
      this.props.navigation.navigate('UpdatePhoto');
    } catch (e) {
    }
  }

  //This function handles the logout by clearing the local storage from token and navigate to Start screen
  logout = async  () => {
    await AsyncStorage.clear();
   this.props.navigation.navigate('Start');
    }

    //This function stores the user's post location in the local storage to retrieve it later somewhere else, and navigate to GeoLocation page to pull the map
    toGeoLocation =async(location)=>{
      await AsyncStorage.setItem('location', (location).toString());
      this.props.navigation.navigate('Geolocation');
    }

      //This method is called after all the elements of the page are rendered, which renders the function getData() to get the user id and getToken to retrieve token
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
return( 
<View style = {{flex : 1 , justifyContent : 'flex-start'}}> 
    <Text style= {styles.headerText}>My profile</Text>
    <Text style= {styles.userNameStyle} >{this.state.UserInfo.given_name + ' ' + this.state.UserInfo.family_name + '     ' + this.state.UserInfo.email}</Text>
    
        <TouchableOpacity  style = {styles.buttonStyle}
          onPress={() =>this.toFollowing(this.state.user_id)}>
            <Text style={styles.textStyle}>
              Following
            </Text> 
        </TouchableOpacity> 
    
        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.toFollowers(this.state.user_id)}>
            <Text style={styles.textStyle}>
            Followers
            </Text>
        </TouchableOpacity> 
       
        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.toUpdate(this.state.user_id)}>
            <Text style={styles.textStyle}>
            Update account
            </Text>
        </TouchableOpacity>

        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.toUserPhoto(this.state.user_id)}>
            <Text style={styles.textStyle}>
            View profile photo
            </Text>
        </TouchableOpacity> 

        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.toChitPhoto(this.state.user_id)}>
            <Text style={styles.textStyle}>
            View chit photo
            </Text>
        </TouchableOpacity> 

        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.toUpdatePhoto()}>
            <Text style={styles.textStyle}>
            Upload profile Photo
            </Text>
        </TouchableOpacity> 
             
        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.toUplaodChitPic()}>
            <Text style={styles.textStyle}>
            Upload chit photo
            </Text>
        </TouchableOpacity> 
        
        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.logout()}>
            <Text style={styles.textStyle}>
            Logout
            </Text>
        </TouchableOpacity> 


      <FlatList
      data={this.state.UserInfo.recent_chits}
      renderItem={({item})=>
      <View>
        <TouchableOpacity onPress={() =>this.toGeoLocation(item.timestamp)}>
          <Card style = {styles.card}>
            <Card.Content>
              <Paragraph style= {styles.chits}>{item.chit_content}</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
      }
      keyExtractor={({id}, index) => id}
      />
  </View>
 );
 }
}

  export default MyProfile;

const styles = StyleSheet.create({

  headerText: {
  fontSize : 27,
  alignSelf:'center',
  color : '#007aff',
  fontWeight : '600',
  },

  userNameStyle: {
  fontSize : 22,
  alignSelf:'center',
  color : 'purple',
  fontWeight : '600',
  paddingTop : 10,
  paddingBottom : 10 
  },
  
  textStyle: {  
  fontSize : 22,
  alignSelf:'flex-start',
  color : '#007aff',
  fontWeight : '600',  
  },
  chits: {
  color: 'black',
  textShadowColor: 'gray',
  fontFamily: 'sans-serif',
  textShadowRadius: 19,
  fontSize : 20,
  },
  buttonStyle: { 
  justifyContent : 'flex-start',  
  borderRadius : 25,
  borderColor: '#007aff',
  marginLeft : 10,
  paddingLeft:10,
  paddingRight : 10,
  },
  card: {
  margin : 5
  },

      
});



// style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}