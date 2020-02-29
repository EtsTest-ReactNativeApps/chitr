import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './Home';
import About from './Details';

const screens = {
    Home:{ // becasue this at the top, will be shown as home screen 
        screen: Home // home component is the home screen 
    },
    About : {
        screen : About
    }
}
//pass in an object inside this function (createStackNavigator)
const HomeStack = createStackNavigator(screens);
