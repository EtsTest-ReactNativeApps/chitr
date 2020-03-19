import React, { Component } from 'react';
import {TouchableOpacity,StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class StartPage extends Component {


        //Clear any data stored in local storage completley when the user is on this screen
        ClearLocalSt = async  () => {
        await AsyncStorage.clear();
       }

        //This method is called after all the elements of the page are rendered, which renders the function ClearLocalSt().
        componentDidMount(){
        this.ClearLocalSt();
        }
        
 render(){
 return (
         
<View style = {{ flex : 1,justifyContent:'space-evenly'}}> 
     <Text style={styles.title}> Chittr App </Text>
     <TouchableOpacity  style = {styles.buttonStyle}
        onPress={() =>this.props.navigation.navigate('Signup')}>
        <Text style={styles.textStyle}>
            Create an account
        </Text>
    </TouchableOpacity>

    <TouchableOpacity  style = {styles.buttonStyle}
        onPress={() =>this.props.navigation.navigate('Login')}>
        <Text style={styles.textStyle}>
        Login
        </Text>
    </TouchableOpacity>

    <TouchableOpacity  style = {styles.singleButton}
        onPress={() =>this.props.navigation.navigate('RecentChits')}>
        <Text style={styles.textStyle}>
        View recent chits
        </Text>
    </TouchableOpacity>
 </View>
 );
 }
}
export default StartPage

const styles = StyleSheet.create({
    buttonStyle: {
    borderRadius : 25,
    borderWidth: 2,
    borderColor: '#007aff',
    marginLeft : 20,
    marginRight : 20,
    padding : 30,
    },
    textStyle: {
    fontSize : 22,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10  
    },
    title: {
    fontSize : 50,
    alignSelf:'center',
    color : 'black',
    fontWeight : '600',
    },
    singleButton:{
    marginLeft : 20,
    marginRight : 20,
    padding : 30,
    margin : -70,
    }
});