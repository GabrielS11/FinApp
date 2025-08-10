import Big from "big.js";

export function isValidBigDecimal(value, precision = 10, scale = 2) {
  try {
    const big = new Big(value);
    const [intPart, decPart = ""] = big.toFixed(scale).split(".");

    return (
      intPart.replace("-", "").length + decPart.length <= precision &&
      decPart.length <= scale
    );
  } catch (err) {
    return false;
  }
}
