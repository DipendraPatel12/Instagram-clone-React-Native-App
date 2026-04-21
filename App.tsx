import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './src/navigations/StackNavigation'
import { Provider } from 'react-redux'
import store from './src/redux/store'
const App = () => {
  return (
    <>
      <Provider store={store}>

        <StatusBar backgroundColor='black'></StatusBar>

        <NavigationContainer>
          <StackNavigation></StackNavigation>
        </NavigationContainer>

      </Provider >
    </>
  )
}

export default App

const styles = StyleSheet.create({})



// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// function App() {
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={{ flex: 1 }}>
//         {/* Your content will now avoid the notch and home indicator */}
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }
