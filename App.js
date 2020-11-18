import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/home';
import LaunchDetail from './src/screens/launch';
import AddNew from './src/screens/addnew';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="launch"
        component={LaunchDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => (
  <>
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="main"
          component={MainStack}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="addnew"
          component={AddNew}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  </>
);

export default App;
