import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GuestPage from './screens/GuestPage'
import Newsfeed from './screens/Newsfeed'
import Signup from './screens/Signup'
import Following from './screens/Following'
import Followers from './screens/Followers'
import Start from './screens/StartPage'

import PostChit from './screens/PostChit'

import Login from './screens/Login'
import Search from './screens/Search'
import Chits from './screens/Chits'
import UserInfo from './screens/UserInfo'
import LoggedInSearch from './screens/LoggedInSearch'
import UserDetails from './screens/UserDetails'
import Update from './screens/Update'
import UserPhoto from './screens/UserPhoto'



import 'react-native-gesture-handler';


const AppStackNav = createStackNavigator({
  
  
  Start: {
    screen: Start
      },
      Update: {
        screen: Update
      },
    UserInfo: {
      screen: UserInfo
        },
    Login: {
    screen: Login
    },
    Search: {
      screen: Search
      },
  Signup: {
    screen: Signup
      },
  Newsfeed: {
    screen: Newsfeed,
      navigationOptions:  {
      title: 'Newsfeed',
      headerLeft:()=> null
  }
    },
  RecentChits: {
    screen: GuestPage
  },
  PostChit: {
    screen: PostChit
  },
  Chits: {
    screen: Chits
  },
  LoggedInSearch: {
    screen: LoggedInSearch
  },
  UserDetails: {
    screen: UserDetails
  },
  Following: {
    screen: Following
  },
  Followers: {
    screen: Followers
  },
  UserPhoto: {
    screen: UserPhoto
  },

  
  
  
  
  
 });

 const AppContainer = createAppContainer(AppStackNav)

 export default AppContainer;