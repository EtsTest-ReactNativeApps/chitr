import React, { Component } from 'react';
import { TouchableOpacity,Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
        user_id: '',
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
      following(){
        console.log('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.user_id+'/following')
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/2/following')
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
<View style = {{ flex : 1, justifyContent :'center'}}> 
    <Text style= {styles.title}>Most recent chits</Text>
    <FlatList
    data={this.state.chitsContent}
    renderItem={({item})=>
  <View style={{flexDirection: 'row',flex:1,justifyContent:'space-between' }}>
    
    <Text style= {styles.chits}>{item.user.given_name +
     ' '+ item.user.family_name + '\n'+item.chit_content}</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => this.following()}>
      <Text>Following</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => this.following()}>
      <Text>Followers</Text>
    </TouchableOpacity>
  </View>
  }
  keyExtractor={({id}, index) => id}
 />

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
      button: {
        backgroundColor: '#DDDDDD',
        padding: 5,
        margin : 10
      }
});