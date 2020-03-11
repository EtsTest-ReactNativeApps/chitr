import React, { Component } from 'react';
import { Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
class Chits extends Component{
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
//     handleSearch = (value) => {
//     this.setState({ given_name: value}, this.search)
//    }
    getChits(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
        isLoading: false,
        chitsContent: responseJson,
        });
        })
        .catch((error) =>{
        console.log(error);
        });
    }

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
 <View style = {{ flex : 1, alignItems :'stretch'}}> 
 
    <Text style= {styles.title}>Most recent chits</Text>
    <FlatList
    data={this.state.chitsContent}
    renderItem={({item})=>
  <View style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}>
    <Text style= {styles.chits}>{item.user.given_name}</Text>
    <Text style= {styles.chits}>{item.user.family_name}</Text>
    <Text style= {styles.chits}>{item.chit_content}</Text>
  </View>
  }
  keyExtractor={({id}, index) => id}
 />
 </View>
 );
 }
}
export default Chits;

const styles = StyleSheet.create({
    title: {
    color: 'green',
    fontSize: 50,
    fontWeight: 'bold'
    },
    chits: {
    color: 'black',
    fontSize: 19,
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
    },
});