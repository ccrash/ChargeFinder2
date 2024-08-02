import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/home'
import MapScreen from './screens/map'
import ListScreen from './screens/list'
import DetailsScreen from './screens/details'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: 'Chargers Map',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{
            title: 'Chargers List',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Charger Details',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
