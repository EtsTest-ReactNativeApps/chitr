import React,{ Component} from 'react';
import {TouchableOpacity,FlatList,Alert,Button,StyleSheet, Text, View,TextInput,PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import Homescreen from './Homescreen'
import MyPhoto from './TakePhoto'
import MyProfile from './MyProfile'

class NewsFeed extends Component{

    static navigationOptions = {
        drawerLabel: 'NewsFeed',
        header : null,
      };
    constructor(props){
        super(props);
        this.state = {
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
        chit_content:'Hi there',
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
        findCoordinates = () => {
            if(!this.state.locationPermission){
               this.state.locationPermission = requestLocationPermission();
              } 
            Geolocation.getCurrentPosition(
            (position) => {
            const location = JSON.stringify(position);
          
            this.setState({location},() =>{
            const altitude = position.coords.altitude;
            const latitude = position.coords.latitude;
            const timestamp = position.timestamp;

            this.setState({altitude :altitude });
            this.setState({latitude :latitude });
            this.setState({timestamp :timestamp });

            console.log((position.coords.latitude));
            console.log((position.coords.altitude));
            console.log((position.timestamp));

          }
          );
             },
             (error) => {
             Alert.alert(error.message)
             },
             {
             enableHighAccuracy: true,
             timeout: 20000,
             maximumAge: 1000
             }
             );
             }

        componentDidMount(){
            this.getData();
           }
        logout = async  () => {
             await AsyncStorage.clear();
            this.props.navigation.navigate('Start');
        }

        Chits =  () => {
           this.props.navigation.navigate('Chits');
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

    <View style = {{ flex : 1, justifyContent : 'flex-start', alignItems:'baseline'}}> 
    <Text style = {styles.post}> what's on your mind</Text>
    <TextInput style = {styles.input} placeholder="Type a chit" onChangeText={this.handleChits} value={this.state.chit_content} maxLength={40}/>
    <View style = {{ flex : 1,flexDirection:'row', justifyContent :'space-around',alignSelf:'center',alignItems:'flex-start'}}> 

    <TouchableOpacity title="Post" style = {styles.postchit}
    onPress={() => this.postChit()}>
    <Text style={{ fontSize: 16 }}>
    POST
    </Text>
    </TouchableOpacity>
 

     {/* <Button  title="Tag location" 
    onPress={() => this.findCoordinates()}/> */}

<TouchableOpacity  title="Tag location" style = {styles.postchit}
    onPress={() => this.findCoordinates()}>
    <Text style={{ fontSize: 16 }}>
    Tag location
    </Text>      
 </TouchableOpacity>


    {/* <Button title="Logout" 
    onPress={this.logout}/>  */}

<TouchableOpacity title="Logout" style = {styles.postchit}
    onPress={this.logout}>
    <Text style={{ fontSize: 16 }}>
    Logout
    </Text>
</TouchableOpacity>
 

<TouchableOpacity  title="view chits" style = {styles.postchit}
    onPress={this.Chits}> 
    <Text style={{ fontSize: 16 }}>
    view chits
    </Text>
</TouchableOpacity>
 
    </View>
    </View>
    
</View>
 );
 }
}

async function requestLocationPermission(){
    try {
    const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
    title: 'Lab04 Location Permission',
    message:
    'This app requires access to your location.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
    },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('You can access location');
    return true;
    } else {
    console.log('Location permission denied');
    return false;
    }
    } catch (err) {
    console.warn(err);
    }
   }

const MyDrawerNavigator = createDrawerNavigator({
    Newsfeed: {
      screen: NewsFeed,
    },
    MyProfile: {
        screen: MyProfile,
    },
    MyPhoto: {
        screen: MyPhoto,
    },
    Logout: {
        screen: Homescreen,
    },
  });

const MyApp = createAppContainer(MyDrawerNavigator);
export default MyApp;

const styles = StyleSheet.create({
    title: {
    color: 'green',
    fontSize: 50,
    fontWeight: 'bold'
    },
    postchit: {
    flex:1,
    flexDirection:'row',
    alignSelf:'center',
    alignItems:'flex-start',
    justifyContent : 'space-around',
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
});