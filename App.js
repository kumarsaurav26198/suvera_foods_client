import { LogBox, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from './src/Themes/Colors';
import Welcome from './src/Screens/Welcome/Welcome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store, { persistor } from './src/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigation from './src/Navigations/AppNavigaton';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

export default function App() {
  const [ loading, setLoading ] = useState(true);
  LogBox.ignoreLogs([ 'Warning: ...' ]);
  LogBox.ignoreAllLogs();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Welcome />;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={[ 'top', 'left', 'right' ]}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <AppNavigation />
            </QueryClientProvider>
            </PersistGate>
          </Provider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
}