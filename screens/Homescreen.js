import React, { Component } from 'react';
import { Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
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

    handleSearch = (text) => {
        this.setState({ given_name: text })
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

      search(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.given_name+' ')
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
    <TextInput style = {styles.input} placeholder="Search for users" onChangeText={this.handleSearch} value={this.state.given_name}/>
    <Button style = {styles.input} title="Search" 
    onPress={() => this.search()}/>
 
    <FlatList
    data={this.state.userInfo}
    renderItem={({item})=>
  <View style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}>
    <Text style= {styles.chits}>{item.given_name}</Text>
    <Text style= {styles.chits}>{item.family_name}</Text>
    <Text style= {styles.chits}>{item.email}</Text>
  </View>
  }
  keyExtractor={({id}, index) => id}
 />
 <View style = {{ flex : 10, justifyContent :'center'}}> 
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
 <View style = {{  alignItems : 'flex-start', justifyContent : 'flex-start'}}> 
 <Button  title="About me"
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
    fontSize: 19,
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
});