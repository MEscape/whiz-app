export const shortenString = (str: string) => {
    if (str.length > 200) {
      return `${str.slice(0, 100)}...${str.slice(-100)}`;
    }
    return str;
  };