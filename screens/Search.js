import React, { Component } from 'react';
import {Image, Text, View,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Paragraph } from 'react-native-paper';

class Search extends Component{
    //This constructor is used to create and initialise the objects below     
    constructor(props){
        //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
        super(props);
        //This state defines the data type of the objects below
        this.state = {
        isVisible : true,
        given_name: '',
        family_name: '',
        email: '',
        };  
    }
        
    //This function handles the search textnput and is called everytime the search text is changed
    handleSearch = (value) => {
    this.setState({ given_name: value}, this.search)
   }
    

   //This async function store the user id in a local storage and navigate to the user info once the associated component is clicked
   storeUserId= async (user_id) => {
    try {
      console.log('hey')
      await AsyncStorage.setItem('userid', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('UserInfo');
    } catch (e) {
    }
  }

    //This function sends an API request to the server fetching the searched user results
    search(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.given_name)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
        isLoading: false,
        userInfo: responseJson,//store the incoming data from server in this object and retreive below within the render
        });
        })
        .catch((error) =>{
        console.log(error);
        });
      }

      //This method is called after all the elements of the page are rendered, which renders the function search() to trigger it
      componentDidMount(){
        this.search();
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
  <Text style = {styles.textStyle} >Search for a user </Text> 
  <TextInput style = {styles.textInput} placeholder="user" onChangeText={this.handleSearch} value={this.state.given_name}/>
  <FlatList
      data={this.state.userInfo}
      renderItem={({item})=>
    <View>
      <TouchableOpacity onPress={() =>this.storeUserId(item.user_id)} >
        <Card style = {styles.card}>
          <Image
            style = {styles.container}
            source = {require('../photo/profile.png')}
          />
          <Card.Content>
            <Text style= {styles.chits}>{item.given_name + ' '+ item.family_name}</Text>
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
export default Search;

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

  title: {
  color: 'green',
  fontSize: 50,
  fontWeight: 'bold'
  },
  textInput: {
  borderRadius : 25,
  borderWidth: 2,
  borderColor: '#007aff',
  marginLeft : 20,
  marginRight : 20,
  padding : 30,
  marginTop : 20,
  fontSize : 20
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