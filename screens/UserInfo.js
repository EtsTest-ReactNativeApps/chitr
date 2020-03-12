import React, { Component } from 'react';
import { HomeIconWithBadge,Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import Card from './Cards';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';



class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
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

      toFollowing= async (user_id) => {
        try {
          await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
          console.log("user id => " + user_id);
          //this.props.navigation.dispach();
          this.props.navigation.replace('Following');
        } catch (e) {
        }
      }

      toFollowers= async (user_id) => {
        try {
          await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
          console.log("user id => " + user_id);
          //this.props.navigation.dispach();
          this.props.navigation.replace('Followers');
        } catch (e) {
        }
      }

      
    
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('userid')
          console.log("value "+value)
          if(value !== null) {
            this.setState({
                user_id: value
              });
          }
          this.getUserInfo(this.state.user_id);
        } catch(e) {
          // error reading value
        }
    }

      componentDidMount(){
        this.getData();
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
<View > 

    <Text style= {styles.textStyle}>UserInfo</Text>

    <Text style= {styles.userNameStyle} >{this.state.UserInfo.given_name + ' ' + this.state.UserInfo.family_name}</Text>
    
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
            onPress={() =>this.following()}>
            <Text style={styles.textStyle}>
            Follow
            </Text>
        </TouchableOpacity> 

        <TouchableOpacity  style = {styles.buttonStyle}
            onPress={() =>this.following()}>
            <Text style={styles.textStyle}>
            Unfollow
            </Text>
        </TouchableOpacity> 

    <FlatList
    data={this.state.UserInfo.recent_chits}
    renderItem={({item})=>
  <View>
<TouchableOpacity>
<Card>
<Text style= {styles.chits}>{item.chit_content + '\n'+ 'timestamp'+ item.timestamp + 'location' + item.location}</Text>
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
  textStyle: {
    fontSize : 30,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },
  userNameStyle: {
    fontSize : 30,
    alignSelf:'flex-start',
    marginLeft : 20,
    color : 'purple',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },
  
    chits: {
    color: 'black',
    fontSize: 20,
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
    },
    textStyle: {
    fontSize : 22,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',    
    },
    buttonStyle: {
    alignSelf:'flex-start',
    borderRadius : 25,
    borderColor: '#007aff',
    marginLeft : 20,
    paddingLeft:10,
    paddingRight : 10,
    marginRight : 20,
    marginBottom : 10,
    },

      
});



// style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}