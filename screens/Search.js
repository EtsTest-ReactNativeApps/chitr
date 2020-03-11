import React, { Component } from 'react';
import { Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import Card from './Cards';
import { TouchableOpacity } from 'react-native-gesture-handler';

class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
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
        latitude: ''
        };  
    }
    
    Show =()=>{
        this.props.navigation.navigate('UserProfile');
      }
    
    handleGivenName = (text) => {
        this.setState({ given_name: text })
    }
    
    handleSearch = (value) => {
    this.setState({ given_name: value}, this.search)
   }
    

    search(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.given_name)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
        isLoading: false,
        userInfo: responseJson,
        });
        })
        .catch((error) =>{
        console.log(error);
        });
      }

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
    <TextInput style = {styles.buttonStyle} placeholder="user" onChangeText={this.handleSearch} value={this.state.given_name}/>
    <FlatList
    data={this.state.userInfo}
    renderItem={({item})=>
  <View style={{flexDirection: 'row',justifyContent:'space-evenly', alignItems : 'center' }}>
    <TouchableOpacity>
    <Card>
    <Text style= {styles.chits}>{item.given_name + ' '+ item.family_name}</Text>
    <Text style= {styles.chits}>{item.email}</Text>
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
export default HomeScreen;

const styles = StyleSheet.create({
    title: {
    color: 'green',
    fontSize: 50,
    fontWeight: 'bold'
    },
    chits: {
    color: 'black',
    fontSize: 20,
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
    },
    input: {
        margin: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      },

      buttonStyle: {
        borderRadius : 25,
        borderWidth: 2,
        borderColor: '#007aff',
        marginLeft : 20,
        marginRight : 20,
        padding : 30,
        marginTop : 20,
        fontSize : 20
        },

        textStyle: {
            fontSize : 30,
            alignSelf:'center',
            color : '#007aff',
            fontWeight : '600',
            paddingTop : 10,
            paddingBottom : 10,
            marginTop : 30,
          },
});

// style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}