import { BitcoinTransaction } from '@superlight-labs/blockchain-api-client';

/**
 * Calculates net value of a transaction
 * @param transaction
 * @param account
 * @returns
 */
export const getNetValueFromTransaction = (
  transaction: BitcoinTransaction,
  address: string
): number => {
  const ownInputs = transaction.inputs.filter(input => input.coin.address === address);

  const ownOutputs = transaction.outputs.filter(output => output.address === address);

  const ownInputValue = ownInputs.reduce((prev, curr) => {
    return prev + curr.coin.value;
  }, 0);

  const ownOutputValue = ownOutputs.reduce((prev, curr) => {
    return prev + curr.value;
  }, 0);

  return ownOutputValue - ownInputValue;
};
