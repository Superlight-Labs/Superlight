import { deleteKeyPair } from '@superlight-labs/rn-secure-encryption-module';
import { useAuthState } from 'state/auth.state';
import { useBip32State } from 'state/bip32.state';
import { useBitcoinState } from 'state/bitcoin.state.';
import { constants } from 'utils/constants';

export const useLogout = () => {
  const { deleteBip32 } = useBip32State();
  const { deleteAuth } = useAuthState();
  const { deleteBitcoin } = useBitcoinState();

  return {
    logout: () => {
      deleteBip32();
      deleteAuth();
      deleteBitcoin();
      deleteKeyPair(constants.deviceKeyName);
    },
  };
};
