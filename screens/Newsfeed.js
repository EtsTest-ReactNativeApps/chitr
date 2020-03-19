import React,{ Component} from 'react';
import {Image,RefreshControl,TouchableOpacity,FlatList,Alert,StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import MyProfile from './MyProfile'
import Search from './Search'
import { Card, Paragraph } from 'react-native-paper';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ActionButton from 'react-native-circular-action-menu';

class NewsFeed extends Component{
    //This constructor is used to create and initialise the objects below     
    constructor(props){
        //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
        super(props);
        //This state defines the data type of the objects below
        this.state = {
        refreshing: false,
        setRefreshing : false,
        locationPermission : false,
        location : '',
        token :'',
        given_name: '',
        family_name: '',
        chit_content:'',
        timestamp: '',
        longitude: '',
        latitude: '',
    
        }; 
    }

    //This function is used to refresh data by pulling down the screen, chits will be refreshed once a user pulls down the screen
    _onRefresh = () => {
      this.UsersChits();
    }

    //This function sends an API request to the server fetching the searched user's info 
    search(){
      console.log("name: " +this.state.given_name)
      return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.given_name)
      .then((response) => response.json())
      .then((responseJson) => {
      console.log(responseJson)
      this.setState({
      isLoading: false,
      userInfo: responseJson, // store the incoming data from server in this object and retreive below within the render
      });
      })
      .catch((error) =>{
      console.log(error);
      });
    }

    //This async function store the user id in a local storage and navigate to the user info once the associated component is clicked
    toUserInfo= async (user_id) => {
      try {
        await AsyncStorage.setItem('userid', JSON.stringify(user_id))
        console.log("user id => " + user_id);
        this.props.navigation.navigate('UserInfo');
      } catch (e) {
      }
    }

    //This async function gets the token stored in the local storage to attach it in the API request header
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if(value !== null) {
            this.setState({
                token: value
              });
          }
          this.UsersChits(); // call this function to retrieve the followed user's with the logged user chits
        } catch(e) {
          // error reading value
        }

      }

      //This method is called after all the elements of the page are rendered, which renders the function getData() to get the user id
      componentDidMount(){
        this.getData();    
      }

     //This fucntion sends an API request to the server to fetch chits
      UsersChits(){
        console.log("token test" + this.state.token)
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token
        }})
          .then((response) => response.json())
          .then((responseData) => {
          this.setState({
          isLoading: false,
          UserData: responseData, //store the incoming data from server in this object and retreive below within the render
          });
          })
          .catch((error) =>{
          console.log(error);
          });
        }

      //navigate to PostChit screen once the associated component is clicked
      toPostChit =()=>{
        this.props.navigation.navigate('PostChit');
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
<View style = {{ flex : 1, backgroundColor : '#f3f3f3'}}> 

 
<Text style= {styles.textStyle}>Followed users chits</Text>
    <FlatList      
    
    refreshControl={
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
        />
      }
      
    data={this.state.UserData}
    renderItem={({item})=>
    
  <View>
    
    
<TouchableOpacity onPress={() =>this.toUserInfo(item.user.user_id)} >
  
<Card style = {styles.card}>

<Image
   style = {styles.container}
     source = {require('../photo/profile.png')}
   />

<Card.Content>
<Text style= {styles.chits}>{item.user.given_name +' '+ item.user.family_name}</Text>
<Paragraph style= {styles.chits} >{item.chit_content}</Paragraph>
    </Card.Content>

</Card>

</TouchableOpacity>
  </View>
    
  }
  keyExtractor={({id}, index) => id}
  />
  
    <ActionButton  buttonColor="rgba(231,76,60,1)" style = {styles.actionButton} onPress={() => this.toPostChit()} >
  
    </ActionButton>
    
  </View>
  
    
 );
 }
}

const  TabNavigator = createBottomTabNavigator({
  NewsFeed :{
    screen : NewsFeed,

},
  Search :{
    screen : Search
  },
  MyProfile :{
    screen : MyProfile
  }
});
export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({

  textStyle: {
    fontSize : 30,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },
    chits: {
      fontSize : 18,
    textAlign : 'center',
    color: 'black',
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
    },
    container: {
    flex : 1,
    justifyContent : 'flex-start',
    width : 60,
    height : 63,
    position : 'absolute',
    left : 20
    },
    card: {
      margin : 5
    },      
});