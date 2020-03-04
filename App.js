import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Homescreen from './screens/Homescreen'
import Newsfeed from './screens/Newsfeed'
import Startscreen from './screens/StartScreen'
import 'react-native-gesture-handler';


const AppStackNav = createStackNavigator({
  
  Newsfeed: {
    screen: Newsfeed
    },
  StartPage: {
    screen: Startscreen
      },
  Home: {
  screen: Homescreen
  },
 
  
 });

 const AppContainer = createAppContainer(AppStackNav)

 export default AppContainer;