import { StatusBar } from 'expo-status-bar';
import React ,{useState,useEffect} from 'react';
import {   Text, View, LogBox } from 'react-native';
import {useAssets} from "expo-asset";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";
import {NavigationContainer} from "@react-navigation/native"; 
import {createStackNavigator} from "@react-navigation/stack";
import signin from './screens/signin';
import ContextWrapper from './context/ContextWrapper';
import DropDownPicker from "react-native-dropdown-picker";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in future ",
]);

const Stack = createStackNavigator()
 
function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => { 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

 


  return (
    <NavigationContainer>
      {!currUser? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="signIn" component={signin}/>
        </Stack.Navigator>
      ): <Text>Hi user! </Text>
    }
      <Text>{JSON.stringify(currUser)}</Text>
      <StatusBar style="auto" />
    </NavigationContainer  >
  );
}



function Main (){
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png")
  )
  if(!assets){
    return <Text>Loading...Make sure your connection is smooth !</Text>
  }
  return <ContextWrapper><App/></ContextWrapper> ;
}
export default Main;