import { API_URL } from '@env';
import { StackScreenProps } from '@react-navigation/stack';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { useGenericSecret } from '@superlight-labs/rn-mpc-client';
import ButtonComponent from 'components/shared/input/button/button.component';
import TextInputComponent from 'components/shared/input/text/text-input.component';
import Layout from 'components/shared/layout/layout.component';
import MonoIcon from 'components/shared/mono-icon/mono-icon.component';
import Title from 'components/shared/title/title.component';
import { useFailableAction } from 'hooks/useFailable';
import { useEffect, useState } from 'react';
import { Switch } from 'react-native-gesture-handler';
import { RootStackParamList } from 'screens/main-navigation';
import { useAuthState } from 'state/auth.state';
import { useDeriveState } from 'state/derive.state';
import { signWithDeviceKeyNoAuth } from 'utils/auth';

import { Text, View } from 'utils/wrappers/styled-react-native';
type Props = StackScreenProps<RootStackParamList, 'Create'>;

const CreateWallet = ({ navigation }: Props) => {
  const [withPhrase, setWithPhrase] = useState(false);
  const [walletName, setWalletName] = useState('Main Wallet');
  const { user } = useAuthState();
  const { perform } = useFailableAction();
  const { generateGenericSecret } = useGenericSecret();
  const { setSecret, setName, derivedUntilLevel } = useDeriveState();

  useEffect(() => {
    if (derivedUntilLevel !== 0) {
      navigation.navigate('ReviewCreate', { withPhrase: false });
    }
  }, []);

  const startGenerateWallet = () => {
    if (!user) {
      navigation.navigate('Welcome');
      return;
    }

    if (withPhrase) {
      const phrase = bip39.generateMnemonic(wordlist);

      navigation.navigate('ReviewCreate', {
        withPhrase: true,
        phrase,
      });
      return;
    }

    perform(
      generateGenericSecret({
        baseUrl: API_URL,
        sign: signWithDeviceKeyNoAuth({ userId: user.id, devicePublicKey: user.devicePublicKey }),
      })
    ).onSuccess(result => {
      setName(walletName);
      setSecret({
        peerShareId: result.peerShareId,
        share: result.share,
        path: 'secret',
      });
      navigation.navigate('ReviewCreate', { withPhrase: false });
    });
  };

  return (
    <Layout>
      <ButtonComponent style="absolute right-8 -top-12 rounded-xl" onPress={startGenerateWallet}>
        Next
      </ButtonComponent>
      <Title style="mb-4">Configure your new Wallet</Title>

      <View className="flex w-full flex-row items-center border-b border-b-slate-200 py-2">
        <View className="flex-1">
          <Text className="font-inter-medium">Wallet Name</Text>
          <TextInputComponent
            style="border-b-0"
            placeHolder="Main Wallet"
            defaultValue="Main Wallet"
            value={walletName}
            onChangeText={setWalletName}
          />
        </View>
        <View className="flex h-12 w-12 items-center justify-center rounded-lg bg-black p-3">
          <MonoIcon color="white" iconName="Wallet" />
        </View>
      </View>

      <View className="flex w-full flex-row  border-b border-b-slate-200 py-2">
        <View className="flex-1">
          <Text className="font-inter-medium">Show the used Seed Phrase</Text>
          <Text className="w-[90%] font-manrope-bold text-sm text-slate-400">
            The seedphrase can be used to recover your wallet, we highly recommend you to note it
            and keep it safe
          </Text>
        </View>
        <View className="bottom-1 flex h-max w-12 flex-col items-center justify-center p-3">
          <Switch value={withPhrase} onValueChange={setWithPhrase} />
        </View>
      </View>
    </Layout>
  );
};

export default CreateWallet;
