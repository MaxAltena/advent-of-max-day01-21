export const zeroPad = (num: number, padAmount = 2, padCharacter = "0") =>
  String(num).padStart(padAmount, padCharacter);
