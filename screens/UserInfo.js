import React, { Component } from 'react';
import { RefreshControl,Alert,Text, View,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Paragraph } from 'react-native-paper';

class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
        isVisible : true,
        isVisible2: true,
        refreshing: false,
        setRefreshing : false,
        token : null,
        user_id : '',
        loggedUserID : '',
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
        UserInfo : '',
        };  
    }

    postPhoto(){
       
      console.log("post" +this.state.token)
      return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
      {
      method: 'POST',
      headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization':this.state.token ,
        },
      body: result
  })
      .then((response) => {
      console.log("response"+response)
  
      if(response.status === 201){
      Alert.alert("photo Added!");
      }
      else if (response.status === 401){
      console.log('Aunuhtorised ! no photos have been added') 
      Alert.alert("This photo is not added");
      }
      })
      
      .catch((error) => {
      console.error(error);
      });
  }

    followUser(user_id){
      let result = JSON.stringify({
          user_id: this.state.user_id,
      })
      console.log('RESULT'+result) 
      console.log(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}/follow`)  
      return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}/follow`,
      {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-Authorization':this.state.token ,
        },
      body: result
      })
      .then((response) => {
      console.log("response"+response)
  
      if(response.status === 200){
      Alert.alert("You're following this user now");
      }
      else if (response.status === 404){
      console.log('Not found user')
      }
      else if (response.status === 401){
        console.log('Not found user') 
      Alert.alert("Unauthorised operation");
      }
      })  
      .catch((error) => {
      console.error(error);
      });
  }

  unFollowUser(user_id){
    let result = JSON.stringify({
        user_id: this.state.user_id,
    })
    console.log('RESULT'+result) 
    console.log(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}/follow`)  
    return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}/follow`,
    {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization':this.state.token ,
      },
    body: result
    })
    .then((response) => {
    console.log("response"+response)

    if(response.status === 200){
    Alert.alert("You have unfollowed this user");
    }
    else if (response.status === 404){
    console.log('Not found user')
    }
    else if (response.status === 401){
      console.log('Not found user') 
    Alert.alert("Unauthorised operation");
    }
    })  
    .catch((error) => {
    console.error(error);
    });
}

    getUserInfo(user_id){
      // const user_ID = '';
        return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}`)

        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
        this.setState({
          
        isLoading: false,
        UserInfo: responseJson,
        // user_ID : this.state.UserInfo.user_id,
        });
        })
        
        .catch((error) =>{
        console.log(error);
        });
    }

      toFollowing= async (user_id) => {
        try {
          await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
          console.log("user id => " + user_id);
          //this.props.navigation.dispach();
          this.props.navigation.navigate('Following');
        } catch (e) {
        }
      }

      toFollowers= async (user_id) => {
        try {
          await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
          console.log("user id => " + user_id);
          //this.props.navigation.dispach();
          this.props.navigation.navigate('Followers');
        } catch (e) {
        }
      }

      toUpdate= async (user_id) => {
        try {
          await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
          console.log("user id => " + user_id);
          this.props.navigation.navigate('Update');
        } catch (e) {
        }
      }


      toGeoLocation =async(location)=>{
        await AsyncStorage.setItem('location', (location).toString());
        this.props.navigation.navigate('Geolocation');
      }


      ToggleFunction = (user_id,loggeduserID) => {
        if (user_id != loggeduserID || this.state.token === undefined){
          this.setState(state=>({
            isVisible: !state.isVisible,
            }));  
      }
         
      };

      ToggleFunction2 = (user_id,loggeduserID) => {
        console.log("test token" + this.state.token)

        if (user_id == loggeduserID || this.state.token ===null){
          this.setState(state=>({
            isVisible2: !state.isVisible2,
            }));    
      }    
      };

    getLoggedUserID = async () => {
      this.getToken();
      try {
        const value = await AsyncStorage.getItem('user_id')
        if(value !== null) {
          this.setState({
            loggedUserID: value
            });
        }
           this.ToggleFunction(this.state.user_id,this.state.loggedUserID);
           this.ToggleFunction2(this.state.user_id,this.state.loggedUserID);

      } catch(e) {
      }
  }

    getUserID = async () => {
  
        try {
          const value = await AsyncStorage.getItem('userid')
          console.log("getuserID fun" + value)
          if(value != null) {
            this.setState({
                user_id: value
              });
              this.getLoggedUserID();  
              this.getUserInfo(value);

          }
          else if (value = null){
            this.setState({
              value: loggedUserID
            });
            console.log("not here ")
            this.getLoggedUserID();  
            this.getUserInfo(value);
          }

        } catch(e) {
          // error reading value
        }
    }

    getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token')
        console.log("getdata"+value)
        if(value !== null) {
          // this.ToggleFunction(value);
          this.setState({
              token: value
            });
          } 
        
      } catch(e) {
        // error reading value
      }
  }

  toUserPhoto= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('UserPhoto');
    } catch (e) {
    }
  }

  toChitPhoto= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('ViewChitPhoto');
    } catch (e) {
    }
  }

  toUpdate= async (user_id) => {
    try {
      await AsyncStorage.setItem('UserID', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      //this.props.navigation.dispach();
      this.props.navigation.navigate('Update');
    } catch (e) {
    }
  }

  logout = async  () => {
    await AsyncStorage.clear();
   this.props.navigation.navigate('Start');
    }
      componentDidMount(){
        this.getUserID();
      } 

      toUplaodChitPic= async () => {
        try {
          this.props.navigation.navigate('ChitPhoto');
        } catch (e) {
        }
      }

      toUpdatePhoto= async () => {
        try {
          this.props.navigation.navigate('UpdatePhoto');
        } catch (e) {
        }
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
  <Text style= {styles.headerText}>UserInfo</Text>
  <Text style= {styles.userNameStyle} >{this.state.UserInfo.given_name + ' ' + this.state.UserInfo.family_name + '     ' + this.state.UserInfo.email}</Text>  
  <TouchableOpacity  style = {styles.buttonStyle}
    onPress={() =>this.toFollowing(this.state.user_id)}>
    <Text style={styles.textStyle}>
      Following
    </Text>
  </TouchableOpacity> 

    <TouchableOpacity  style = {styles.buttonStyle}
      onPress={() =>this.toFollowers(this.state.user_id)}>
      <Text style={styles.textStyle}>
        Followers
      </Text>
    </TouchableOpacity> 

      {
      this.state.isVisible2? <TouchableOpacity  style = {styles.buttonStyle}
      onPress={() =>this.followUser(this.state.user_id)}>
      <Text style={styles.textStyle}>
        Follow
      </Text>
      </TouchableOpacity> : null
      } 
             
      {
      this.state.isVisible2 ? <TouchableOpacity  style = {styles.buttonStyle}
      onPress={() =>this.unFollowUser(this.state.user_id)}>
      <Text style={styles.textStyle}>
        Unfollow
      </Text>
      </TouchableOpacity> :null
      }
     
      <TouchableOpacity  style = {styles.buttonStyle}
        onPress={() =>this.toUserPhoto(this.state.user_id)}>
        <Text style={styles.textStyle}>
        View profile photo
        </Text>
      </TouchableOpacity> 
  
      <TouchableOpacity  style = {styles.buttonStyle}
        onPress={() =>this.toChitPhoto(this.state.user_id)}>
        <Text style={styles.textStyle}>
          View chit photo
        </Text>
      </TouchableOpacity> 

        {
        this.state.isVisible ?<TouchableOpacity  style = {styles.buttonStyle}
        onPress={() =>this.toUpdate(this.state.user_id)}>
        <Text style={styles.textStyle}>
          Update account
        </Text>
        </TouchableOpacity>: null
        }

        {
        this.state.isVisible ?  
        <TouchableOpacity  style = {styles.buttonStyle}
          onPress={() =>this.toUpdatePhoto()}>
          <Text style={styles.textStyle}>
            Update profile Photo
          </Text>
        </TouchableOpacity> : null
        }
        {
        this.state.isVisible ?<TouchableOpacity  style = {styles.buttonStyle}
        onPress={() =>this.toUplaodChitPic()}>
        <Text style={styles.textStyle}>
          Upload chit photo
        </Text>
        </TouchableOpacity> : null
        }

        {
        this.state.isVisible ? <TouchableOpacity  style = {styles.buttonStyle}
        onPress={() =>this.logout()}>
        <Text style={styles.textStyle}>
          Logout
        </Text>
        </TouchableOpacity> : null
        }

  <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          />
        }

      data={this.state.UserInfo.recent_chits}
      renderItem={({item})=>
    <View>
      <TouchableOpacity onPress={() =>this.toGeoLocation(item.timestamp)} >
        <Card style = {styles.card}>
          <Card.Content>
            <Paragraph style= {styles.chits}>{item.chit_content}</Paragraph>
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

  export default UserInfo;

const styles = StyleSheet.create({

  headerText: {
    fontSize : 27,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
  },

  textStyle: {
    fontSize : 22,
    alignSelf:'flex-start',
    color : '#007aff',
    fontWeight : '600',
  },
    chits: {
    fontSize : 18,
    textAlign : 'center',
    color: 'black',
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
    },

  userNameStyle: {
    fontSize : 22,
    alignSelf:'center',
    marginLeft : 20,
    color : 'purple',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },
 
    buttonStyle: {     
    alignSelf:'flex-start',
    borderRadius : 25,
    borderColor: '#007aff',
    marginLeft : 20,
    paddingLeft:10,
    paddingRight : 10,
    },

    card: {
      margin : 5
    },
    
});




// style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}