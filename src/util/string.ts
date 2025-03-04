export const shortenString = (str: string) => {
  if (str.length > 200) {
    return `${str.slice(0, 100)}...${str.slice(-100)}`
  }
  return str
}

export const truncateMiddle = (str: string, maxLength = 10) => {
  if (str.length <= maxLength) return str
  const half = Math.floor(maxLength / 2)
  return `${str.slice(0, half)}...${str.slice(-half)}`
}
