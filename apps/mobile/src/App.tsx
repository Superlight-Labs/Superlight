/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { TransitionPresets } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logger from '@superlight-labs/logger';
import React from 'react';
import 'react-native-gesture-handler';
import { RootStackParamList } from 'screens/main-navigation';
import MenuStack from 'screens/menu/menu.stack';
import LoadingScreen from 'screens/shared/loading.screen';
import { useAuthState } from './state/auth.state';
import { useSnackbarState } from './state/snackbar.state';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'components/shared/snackbar/snackbar.component';
import { useLogout } from 'hooks/useLogout';
import reactotron from 'reactotron-react-native';
import Home from 'screens/home.screen';
import OnboardingStack from 'screens/onboarding/onboarding.stack';
import WalletNavigation from 'screens/wallet/wallet.navigation';
import Welcome from 'screens/welcome.screen';
import { useDeriveState } from 'state/derive.state';
import { View } from 'utils/wrappers/styled-react-native';
if (__DEV__) {
  import('./../ReactotronConfig').then(() => logger.info('Reactotron Configured'));
  console.log = reactotron.log!;
}

const Stack = createStackNavigator<RootStackParamList>();
export type RootStack = typeof Stack;

function App(): JSX.Element {
  const { hasHydrated: authHydrated, isAuthenticated } = useAuthState();
  const { message } = useSnackbarState();
  const { hasHydrated: bipHydrated } = useDeriveState();
  const { logout } = useLogout();

  if (__DEV__) {
    reactotron.onCustomCommand({
      id: 0,
      command: 'Logout',
      description: 'Deleting local states and device keypair',
      handler: logout,
    });
    reactotron.onCustomCommand({
      id: 1,
      command: 'Delete All State',
      description: 'Deleting everthing in AsyncStorage',
      handler: () => AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove),
    });
  }

  return (
    <View className=" h-screen w-screen bg-white">
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
          <Stack.Group>
            <>
              {bipHydrated && authHydrated ? (
                <>
                  {isAuthenticated && (
                    <>
                      <Stack.Screen name="Home" component={Home} />

                      {OnboardingStack({ Stack })}
                      {MenuStack({ Stack })}
                      <Stack.Group
                        screenOptions={{
                          cardStyle: { borderRadius: 32 },
                          presentation: 'modal',
                          gestureEnabled: true,
                          ...TransitionPresets.ModalPresentationIOS,
                        }}>
                        <Stack.Screen name="Wallet" component={WalletNavigation} />
                      </Stack.Group>
                    </>
                  )}
                  <Stack.Screen name="Welcome" component={Welcome} />
                </>
              ) : (
                <Stack.Screen name="Loading" component={LoadingScreen} />
              )}
            </>
          </Stack.Group>
        </Stack.Navigator>
        {message.level !== 'empty' && <Snackbar appMessage={message} />}
      </NavigationContainer>
    </View>
  );
}

export default App;
