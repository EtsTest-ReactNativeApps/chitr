import React, { Component } from 'react';
import { Image,RefreshControl,Text, View,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Search from './Search'
import AsyncStorage from '@react-native-community/async-storage';



class GuestPage extends Component{
    //This constructor is used to create and initialise the objects below 
    constructor(props){
        //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
        super(props);
        //This state defines the data type of the objects below
        this.state = {
        refreshing: false,
        setRefreshing : false,
        user_id : '',
        given_name: '',
        family_name: '',    
        chit_id: '',
        chit_content:'',
        DatafromServer:'',
        };  
    }
    
    //This async function is used to store the selected user id form the following list in a local storage
    storeUserId= async (user_id) => {
      try {
        await AsyncStorage.setItem('userid', JSON.stringify(user_id))
        console.log("user id => " + user_id);
        this.props.navigation.navigate('UserInfo'); // navigate to the user info page once storeUserId is triggered to pull the selected user's details
      } catch (e) {
      }
    }
    //This fucntion sends an API request to the server to fetch chits
    getChits(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
        .then((response) => response.json())
        .then((responseData) => {
        this.setState({
        isLoading: false,
        DatafromServer: responseData, // store the incoming data from server in this object and retreive below within the render
        });
        })
        .catch((error) =>{
        console.log(error);
        });
      }

      //This method is called after all the elements of the page are rendered, which renders the function getChits() to get users' chits instantly
      componentDidMount(){
        this.getChits();
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
<View> 
  <Text style= {styles.textStyle}>Most recent chits</Text>
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
        }
      data={this.state.DatafromServer}
      renderItem={({item})=>
      <View>
        <TouchableOpacity onPress={() =>this.storeUserId(item.user.user_id)} >
          <Card style = {styles.card}>
            <Image
            style = {styles.container}
            source = {require('../photo/profile.png')}
            />

            <Card.Content>
              <Title style= {styles.chits} >{item.user.given_name + ' '+ item.user.family_name}</Title>
              <Paragraph style= {styles.chits} >{item.chit_content}</Paragraph>
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

//create a bottom tab navigator component with two screen to navigate to
const TabNavigator = createBottomTabNavigator({
  RecentChits :{
    screen : GuestPage
  },
  Search :{
    screen : Search
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
    height : 80,
    position : 'absolute',
    left : 20
    },
    card: {
      margin : 5
    },
    
      
});