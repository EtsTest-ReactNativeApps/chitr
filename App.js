import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Homescreen from './screens/Homescreen'
import Aboutscreen from './screens/AboutScreen'
import Startscreen from './screens/StartScreen'
import 'react-native-gesture-handler';


const AppStackNav = createStackNavigator({
  StartPage: {
    screen: Startscreen
      },
  Home: {
  screen: Homescreen
  },
  About: {
  screen: Aboutscreen
  }
 });

 const AppContainer = createAppContainer(AppStackNav)

 export default AppContainer;