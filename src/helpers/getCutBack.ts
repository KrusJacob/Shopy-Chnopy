export const getCutBack = (str: string, number = 55) => {
  let words = str.split(" ");

  if (words.length < number) {
    return str;
  } else {
    return words.slice(0, number).join(" ") + "...";
  }
};
