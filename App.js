import React from 'react';
import { Root } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux'
import Login from './src/components/Login';
import Home from './src/components/Home';
import SignUp from './src/components/SignUp';
import Profile from './src/components/Profile';
import EditProfile from "./src/components/EditProfile";
import MyListings from "./src/components/MyListings";
import SavedPlaces from "./src/components/SavedPlaces";
import Host from "./src/components/Host";
import Bookings from './src/components/Bookings';
import Details from './src/components/Details';
import Notifications from './src/components/Notifications';
import { userActivateReducer } from './src/reducers/user';
import * as firebase from "firebase/app";
require ('firebase/auth')
import 'firebase/firestore';



var firebaseConfig = {
  apiKey: "AIzaSyAiJw_s4TCE_thFQvl57EMsvy5YX2QpeHs",
  authDomain: "bedr-89d74.firebaseapp.com",
  projectId: "bedr-89d74",
  storageBucket: "bedr-89d74.appspot.com",
  messagingSenderId: "448153900453",
  appId: "1:448153900453:web:e89fae138d1e0eb8c3844c",
  measurementId: "G-TP5ME5QD6W"
};
// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);

const appReducer = combineReducers({
  userActive: userActivateReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = null;
  }
  return appReducer(state, action);
};
const store = createStore(rootReducer);

const MainNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      header: null
    }
  },
  MyListings: {
    screen: MyListings,
    navigationOptions: {
      header: null
    }
  },
  Host: {
    screen: Host,
    navigationOptions: {
      header: null
    }
  },
  SavedPlaces: {
    screen: SavedPlaces,
    navigationOptions: {
      header: null
    }
  },
  Bookings: {
    screen: Bookings,
    navigationOptions: {
      header: null
    }
  },
  Details: {
    screen: Details,
    navigationOptions: {
      header: null
    }
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      header: null
    }
  },
},
  {
    initialRouteName: 'Login'
  });

const AppNavigator = createAppContainer(MainNavigator);

export default () => (
  <Provider store={store}>
    <Root>
      <AppNavigator />
    </Root>
  </Provider>
);