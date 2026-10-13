import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p'

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <MainNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
