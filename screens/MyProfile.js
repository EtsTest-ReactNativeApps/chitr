import React, { Component } from 'react';
import { TouchableOpacity,Alert,Text, View,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Paragraph } from 'react-native-paper';

class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
        token : '',
        user_id : '',
        given_name: '',
        family_name: '',
        text : '',
        email: '',
        password: '',
        loginEmail:'',
        loginPass:'',
        chit_id: '',
        chit_content:'',
        timestamp: '',
        longitude: '',
        latitude: '',
        UserInfo : '',
        };  
    }
    
    Show =()=>{
        this.props.navigation.navigate('UserProfile');
      }
    
    handleGivenName = (text) => {
        this.setState({ given_name: text })
    }

    

    getUserInfo(user_id){
      console.log("start")
      console.log(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}`)
      const user_ID = '';
        return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}`)

        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
        this.setState({
          
        isLoading: false,
        UserInfo: responseJson,
        user_ID : this.state.UserInfo.user_id,
        });
        })
        
        .catch((error) =>{
        console.log(error);
        });
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

  toFollowing= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      //this.props.navigation.dispach();
      this.props.navigation.navigate('Following');
    } catch (e) {
    }
  }

  toFollowers= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      //this.props.navigation.dispach();
      this.props.navigation.navigate('Followers');
    } catch (e) {
    }
  }

  toUpdate= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      //this.props.navigation.dispach();
      this.props.navigation.navigate('Update');
    } catch (e) {
    }
  }

  toUserPhoto= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('UserPhoto');
    } catch (e) {
    }
  }

  toChitPhoto= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('ViewChitPhoto');
    } catch (e) {
    }
  }

  

  toUplaodChitPic= async () => {
    try {
      this.props.navigation.navigate('ChitPhoto');
    } catch (e) {
    }
  }

  toUpdatePhoto= async () => {
    try {
      this.props.navigation.navigate('UpdatePhoto');
    } catch (e) {
    }
  }

  logout = async  () => {
    await AsyncStorage.clear();
   this.props.navigation.navigate('Start');
    }

    toGeoLocation =async(location)=>{
      await AsyncStorage.setItem('location', (location).toString());
      this.props.navigation.navigate('Geolocation');
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
            onPress={() =>this.toUpdatePhoto()}>
            <Text style={styles.textStyle}>
            Update profile Photo
            </Text>
        </TouchableOpacity> 
        
        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.toUplaodChitPic()}>
            <Text style={styles.textStyle}>
            Upload chit photo
            </Text>
        </TouchableOpacity> 


        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.toChitPhoto(this.state.user_id)}>
            <Text style={styles.textStyle}>
            Get chit photo
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

  export default UserInfo;

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