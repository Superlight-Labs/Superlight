import { StackScreenProps } from '@react-navigation/stack';
import ButtonComponent from 'components/shared/input/button/button.component';
import MultilineText from 'components/shared/input/multiline-text/multiline-text.component';
import TextInputComponent from 'components/shared/input/text/text-input.component';
import Layout from 'components/shared/layout/layout.component';
import Title from 'components/shared/title/title.component';
import { useEffect, useState } from 'react';
import { RootStackParamList } from 'screens/main-navigation';
import { useAuthState } from 'state/auth.state';
import { DerivedUntilLevel, useDeriveState } from 'state/derive.state';
import { Text } from 'utils/wrappers/styled-react-native';

type Props = StackScreenProps<RootStackParamList, 'Import'>;

const ImportWallet = ({ navigation }: Props) => {
  const [walletName, setWalletName] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const { deleteBip32, derivedUntilLevel, setName } = useDeriveState();

  useEffect(() => {
    if (derivedUntilLevel !== DerivedUntilLevel.NONE) {
      deleteBip32();
    }
  }, [seedPhrase]);

  const { user } = useAuthState();

  const startGenerateWallet = () => {
    if (!user) {
      navigation.navigate('Welcome');
      return;
    }

    setName(walletName || 'Main Wallet');

    navigation.navigate('ReviewCreate', {
      withPhrase: true,
      phrase: seedPhrase,
    });
  };

  return (
    <Layout>
      <ButtonComponent
        style="px-6 py-3 absolute right-8 -top-12 rounded-xl"
        onPress={startGenerateWallet}>
        Next
      </ButtonComponent>
      <Title>Configure your new Wallet</Title>
      <Text className="mb-2 mr-4">Enter your existing seed phrase</Text>
      <MultilineText
        setValue={setSeedPhrase}
        value={seedPhrase}
        placeholder="12 to 24 word seed phrase"
      />
      <Text className="mr-4 mt-8">Set the Name for your Wallet</Text>
      <TextInputComponent
        className="border-800 h-8 w-64 border-b"
        defaultValue="Main Wallet"
        value={walletName}
        onChangeText={setWalletName}
      />
    </Layout>
  );
};

export default ImportWallet;
