import React,{ Component} from 'react';
import {RefreshControl,TouchableOpacity,FlatList,Alert,Button,StyleSheet, Text, View,TextInput,PermissionsAndroid } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import GuestPage from './GuestPage'
import MyPhoto from './TakePhoto'
import MyProfile from './MyProfile'
import Card from './Cards';
import Search from './Search'

import { createBottomTabNavigator } from 'react-navigation-tabs';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';




class NewsFeed extends Component{

    static navigationOptions = {
        drawerLabel: 'NewsFeed',
        header : null,
      };
    constructor(props){
      
        super(props);
        this.state = {
         refreshing: false,
         setRefreshing : false,
        locationPermission : false,
        location : '',
        token :'',
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
    
        }; 
    }

    handleSearch = (text) => {
        this.setState({ given_name: text })
    }
    handleChits = (text) => {
        this.setState({ chit_content: text })
    }

    _onRefresh = () => {
     
      this.UsersChits();
    }

    search(){
        console.log("name: " +this.state.given_name)
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.given_name)
        .then((response) => response.json())
        .then((responseJson) => {
        console.log(responseJson)
        this.setState({
        isLoading: false,
        userInfo: responseJson,
        });
        })
        .catch((error) =>{
        console.log(error);
        });
    }

    storeUserId= async (user_id) => {
      try {
        await AsyncStorage.setItem('userid', JSON.stringify(user_id))
        console.log("user id => " + user_id);
        this.props.navigation.navigate('UserInfo');
      } catch (e) {
      }
    }

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if(value !== null) {
            this.setState({
                token: value
              });
          }
        } catch(e) {
          // error reading value
        }
      }

    postChit(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':this.state.token ,
          }, 
        body: JSON.stringify({
        chit_content: this.state.chit_content,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        timestamp : this.state.timestamp,
        })
        })
        .then((response) => {
        console.log("response"+response)

        if(response.status === 200){
        Alert.alert("Item Added!");
        }
        else{

        console.log('no posts have been added') 
        Alert.alert("This chit is not added");
        }
        })
        
        .catch((error) => {
        console.error(error);
        });
    }
          

        componentDidMount(){
            this.getData();
            this.UsersChits();
           }
        logout = async  () => {
             await AsyncStorage.clear();
            this.props.navigation.navigate('Start');
        }

        Chits =  () => {
           this.props.navigation.navigate('Chits');
       }

       UsersChits(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
        .then((response) => response.json())
        .then((responseData) => {
        const user_id = responseData;
        //console.log(responseData)
        //console.log("h"+(responseData.user.user_id))
        this.setState({
        isLoading: false,
        UserData: responseData,
        });
        })
        .catch((error) =>{
        console.log(error);
        });
      }

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
<View style = {{ flex : 1, alignItems :'stretch', backgroundColor : '#f3f3f3'}}> 
{/* <ActionButton  buttonColor="rgba(231,76,60,1)" style = {styles.actionButton} >
          <ActionButton.Item  buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="android-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="android-notifications-none" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="android-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton> */}
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
    
<TouchableOpacity onPress={() =>this.storeUserId(item.user.user_id)} >
  
<Card>
<Text style= {styles.chits}>{item.user.given_name + ' '+ item.user.family_name}</Text>
<Text style= {styles.chits}>{item.chit_content + item.user.user_id}</Text>
</Card>

</TouchableOpacity>

  </View>
    
  }
  keyExtractor={({id}, index) => id}
  />
  



    <View style = {{ flex : 1, flexDirection : 'row', justifyContent :'space-around', alignItems:'flex-end'}}> 

<TouchableOpacity title="Logout" style = {styles.postchit}
    onPress={this.logout}>
    <Text style={{ fontSize: 16 }}>
    Logout
    </Text>
</TouchableOpacity>

<TouchableOpacity title="Post" style = {styles.postchit}
    onPress={() => this.toPostChit()}>
    <Text style={{ fontSize: 16 }}>
    POST
    </Text>
    </TouchableOpacity>

 
    </View>
    </View>
    
 );
 }
}

const TabNavigator = createBottomTabNavigator({
  NewsFeed :{
    screen : NewsFeed
  },
  Search :{
    screen : Search
  },
  MyProfile :{
    screen : MyProfile
  }
});
export default createAppContainer(TabNavigator);

// const MyDrawerNavigator = createDrawerNavigator({
//     Newsfeed: {
//       screen: NewsFeed,
//     },
//     MyProfile: {
//         screen: MyProfile,
//     },
//     MyPhoto: {
//         screen: MyPhoto,
//     },
//     Logout: {
//         screen: GuestPage,
//     },
//   });

// const MyApp = createAppContainer(MyDrawerNavigator);
// export default MyApp;

const styles = StyleSheet.create({

  actionButton:{

    position : 'absolute',

  },
    title: {
    color: 'green',
    fontSize: 50,
    fontWeight: 'bold'
    },
    postchit: {
    backgroundColor: '#DDDDDD',
    borderWidth: 1,
    borderColor: '#336633',
    },
    chits: {
    color: 'black',
    fontSize: 19,
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
    },
    input: {
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
      },
      post: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
      },
      textStyle: {
        fontSize : 30,
        alignSelf:'center',
        color : '#007aff',
        fontWeight : '600',
        paddingTop : 10,
        paddingBottom : 10 
      },
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },

      actionButton: {
        position :'absolute',
        fontSize: 20,
        height: 22,
      },
});