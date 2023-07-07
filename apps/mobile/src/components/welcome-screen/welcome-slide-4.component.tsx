import MonoIcon from 'components/shared/mono-icon/mono-icon.component';
import Title from 'components/shared/title/title.component';
import { Image, Text, View } from 'utils/wrappers/styled-react-native';

const WelcomeSlide4 = () => {
  return (
    <View className="flex w-full flex-1 flex-col items-center">
      <MonoIcon
        color="white"
        iconName="Github"
        height={30}
        width={30}
        style="p-4 absolute top-36 z-10 bg-black rounded-xl shadow-black "
      />
      <Image
        className="h-72 w-screen pb-4"
        source={require('../../../assets/images/lines-4.png')}
      />
      <View className="flex-1 items-center justify-center">
        <Title style="text-4xl text-slate-400 font-manrope-bold">Open Source.</Title>
        <Text className="mt-4 text-center font-manrope-bold text-4xl">You can participate.</Text>
      </View>
    </View>
  );
};

export default WelcomeSlide4;
