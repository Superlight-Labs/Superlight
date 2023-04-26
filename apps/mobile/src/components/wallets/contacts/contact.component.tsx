import { Contact as ContactType } from '@superlight-labs/api/src/repository/contact';
import MonoIcon from 'components/shared/mono-icon/mono-icon.component';
import { shortenAddress, truncate } from 'utils/string';
import { Text, View } from 'utils/wrappers/styled-react-native';

type Props = {
  contact: ContactType;
};

const Contact = ({ contact }: Props) => {
  return (
    <View className="mb-2 flex w-full flex-row items-center rounded-lg">
      <View className="flex items-center justify-center rounded-lg bg-black p-3">
        <MonoIcon color="white" iconName="User" />
      </View>
      <View className="ml-4 flex flex-col justify-around">
        <Text className="w-36 font-bold">{truncate(contact.name, 48)}</Text>

        <Text className=" text-slate-400">{shortenAddress(contact.address)}</Text>
      </View>
    </View>
  );
};

export default Contact;
