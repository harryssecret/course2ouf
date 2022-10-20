import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/App';

const theme = {...DefaultTheme, colors: {...DefaultTheme.colors, primary: 'red', secondary: '#e0f7fa'}};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
      <Main/>
      </NavigationContainer>
    </PaperProvider>
  );
}