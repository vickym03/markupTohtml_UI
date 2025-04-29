import { belowTwenty, tens, units } from "../data";

export const numberToWordsInRupees = (num: number): string => {
  console.log(num);
  if (num === 0) return "Zero Rupees Only";

  function helper(n: number): string {
    if (n < 20) return belowTwenty[n];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] +
        (n % 10 !== 0 ? " " + belowTwenty[n % 10] : "")
      );
    return (
      belowTwenty[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 !== 0 ? " " + helper(n % 100) : "")
    );
  }

  let word = "";
  let i = 0;

  while (num > 0) {
    const chunk = i === 0 ? num % 1000 : num % 100;
    if (chunk !== 0) {
      word =
        helper(chunk) +
        (units[i] ? " " + units[i] : "") +
        (word ? " " + word : "");
    }
    num = i === 0 ? Math.floor(num / 1000) : Math.floor(num / 100);
    i++;
  }

  return word + " Rupees Only";
};
