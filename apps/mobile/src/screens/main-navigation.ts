export type RootStackParamList = {
  Loading: undefined;
  Welcome: undefined;
  Home: undefined;
  Wallet: { account: string };
  Onboarding: undefined;
  Menu: undefined;
  Import: undefined;
  Create: undefined;
  ReviewCreate: { withPhrase: boolean; phrase?: string };
};
