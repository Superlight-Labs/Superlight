export const truncate = (text: string, length = 5): string => {
  return text.substring(0, length) + '...';
};

export const shortenAddress = (address: string): string => {
  return address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length);
};

export const getSizeFromLength = (length: number) => {
  if (length > 11) {
    return 'text-4xl';
  }

  if (length > 6) {
    return 'text-5xl';
  }

  return 'text-6xl';
};