import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Homescreen from './screens/Homescreen'
import Newsfeed from './screens/Newsfeed'
import Startscreen from './screens/StartScreen'
import following from './screens/Following'


import 'react-native-gesture-handler';


const AppStackNav = createStackNavigator({
  
  
  StartPage: {
    screen: Startscreen
      },
  Newsfeed: {
    screen: Newsfeed
    },
  Home: {
  screen: Homescreen
  },
 
  
 });

 const AppContainer = createAppContainer(AppStackNav)

 export default AppContainer;