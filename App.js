import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Homescreen from './screens/Homescreen'
import Newsfeed from './screens/Newsfeed'
import Startscreen from './screens/Signup'
import following from './screens/Following'
import Start from './screens/StartPage'
import Login from './screens/Login'
import Search from './screens/Search'
import Chits from './screens/Chits'

import 'react-native-gesture-handler';


const AppStackNav = createStackNavigator({
  
  Start: {
    screen: Start
      },
    Login: {
    screen: Login
    },
    Search: {
      screen: Search
      },
  Signup: {
    screen: Startscreen
      },
  Newsfeed: {
    screen: Newsfeed,
      navigationOptions:  {
      title: 'Newsfeed',
      headerLeft:()=> null
  }
    },
  RecentChits: {
    screen: Homescreen
  },
  Chits: {
    screen: Chits
  },
 
  
 });

 const AppContainer = createAppContainer(AppStackNav)

 export default AppContainer;