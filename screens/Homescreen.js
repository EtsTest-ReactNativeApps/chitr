import React, { Component } from 'react';
import { Text, View,Button,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
        user : {
        given_name: '',
        family_name: '',
        email: ''
        },
        password: '',
        loginEmail:'',
        loginPass:'',
        chit_id: '',
        chit_content:'',
        timestamp: '',
        location: {
        longitude: '',
        latitude: ''
        }
        };
    }
    Show =()=>{
        this.props.navigation.navigate('StartPage');
    }

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

 <View style = {{ flex : 1, alignItems : 'flex-start', justifyContent : 'center'}}> 
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
 <View style = {{  alignItems : 'flex-start', justifyContent : 'flex-start'}}> 
 <Button  title="About Me"
 onPress={this.Show}/>
 </View>
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
    }
});