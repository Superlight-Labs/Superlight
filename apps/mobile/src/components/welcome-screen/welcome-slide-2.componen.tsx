import MonoIcon from 'components/shared/mono-icon/mono-icon.component';
import Title from 'components/shared/title/title.component';
import { Image, Text, View } from 'utils/wrappers/styled-react-native';

const WelcomeSlide2 = () => {
  return (
    <View className="flex w-full flex-1 flex-col items-center">
      <MonoIcon
        color="white"
        iconName="UserCheck"
        height={30}
        width={30}
        style="p-4 absolute -top-6 z-10 bg-black rounded-xl shadow-black "
      />
      <Image className="h-72 w-screen" source={require('../../../assets/images/lines-2.png')} />

      <View className="flex-1 items-center justify-center">
        <Title style="text-4xl text-slate-400 font-manrope-bold">Non custodial.</Title>
        <Text className="mt-2 text-center font-manrope-bold text-4xl">You are in control.</Text>
      </View>
    </View>
  );
};

export default WelcomeSlide2;
