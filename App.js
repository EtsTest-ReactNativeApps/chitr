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
import UserInfo from './screens/UserInfo'
import Update from './screens/Update'
import UserPhoto from './screens/UserPhoto'
import UpdatePhoto from './screens/UpdatePhoto'
import Geolocation from './screens/GeoLocation'
import UploadChitPhoto from './screens/UploadPicChit'
import ViewChitPhoto from './screens/ChitPhoto'
import 'react-native-gesture-handler';

//create a stack navigator function to enable navigation between screens within the app. It takes 2 properties Screen and Navigator 
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
    navigationOptions: {
      title: 'Chittr',
      headerLeft: () => null
    }
  },
  RecentChits: {
    screen: GuestPage
  },
  PostChit: {
    screen: PostChit
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
  Geolocation: {
    screen: Geolocation
  },
  UpdatePhoto: {
    screen: UpdatePhoto
  },

  UploadChitPhoto: {
    screen: UploadChitPhoto
  },
  ViewChitPhoto: {
    screen: ViewChitPhoto
  }
});

//This function is responsible to link the top-level navigator to the app environment
const AppContainer = createAppContainer(AppStackNav)

export default AppContainer;