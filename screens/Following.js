import React, { Component } from 'react';
import { Image,TouchableOpacity,Text, View,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Paragraph } from 'react-native-paper';

class Following extends Component{
    //This constructor is used to create and initialise the objects below 
    constructor(props){
        //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
        super(props);
        //This state defines the data type of the objects below
        this.state = {
        user_id: '',
        given_name: '',
        family_name: '',
        email: '',
        };  
    }
    
    //This async function returns a promise which is the user id that is stored in a local storage, it needs to be retrieved to get the selected user id using the keyword await, which makes JavaScript wait until it gets the user id
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('UserID')
        console.log("value "+value)
        if(value !== null) {
          this.setState({
              user_id: value
            });
        }
        //call following() function and pass in the fetched user id to show the selected user's following
        this.following(this.state.user_id);
      } catch(e) {
        // error reading value
      }
  }

  //This async function is used to store the selected user id form the following list in a local storage
  storeUserId= async (user_id) => {
    try {
      console.log('hey')
      await AsyncStorage.setItem('userid', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.replace('UserInfo'); // I have used replace to navigate to the user info, otherwise the current page would be displayed again becasue it wasn't totally closed
    } catch (e) {
    }
  }

      //This function sends an API request to the server in order to get a user's following users 
      following(user_id){
        return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${JSON.parse(user_id)}/following`)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
        isLoading: false,
        userInfo: responseJson, // store the incoming data from server in this object and retreive below within the render
        });
        })
        .catch((error) =>{
        console.log(error);
        });
      }

      //This method is called after all the elements of the page are rendered, which renders the function getData() to get the selected user id instantly
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
<View style = {{ flex : 1}}> 
    <Text style= {styles.textStyle}>Following users</Text>
<FlatList
    data={this.state.userInfo}
    renderItem={({item})=>
  <View >

  <TouchableOpacity onPress={() =>this.storeUserId(item.user_id)} >
  <Card style = {styles.card}>
  <Image
   style = {styles.container}
     source = {require('../photo/profile.png')}
   />
<Card.Content>
<Text style = {styles.chits}>{item.given_name + ' '+ item.family_name}</Text>
<Paragraph style= {styles.chits} >{item.email}</Paragraph>
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
export default Following;

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
    fontSize : 20,
    }, 
    title: {
    color: 'green',
    fontSize: 50,
    fontWeight: 'bold'
    },
    container: {
    flex : 1,
    justifyContent : 'flex-start',
    width : 60,
    height : 62,
    position : 'absolute',
    left : 20
    },
    card: {
     margin : 5
    },
});