export type WalletTabList = {
  Recieve: undefined;
  Overview: undefined;
  Send: undefined;
};

export type WalletStackList = {
  SendTo: undefined;
  SendReview: { toAddress: string; note: string; amount: string };
  SendAmount: { toAddress: string; note: string };
};