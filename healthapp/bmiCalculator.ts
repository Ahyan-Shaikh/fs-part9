import { isValidNumber } from "./utils/util.ts";

interface BmiValues {
  height: number;
  weight: number;
};

export const parseArgs = (args: string[]): BmiValues => {
  if (args.length > 4) throw new Error("Too many argmuents.");
  if (args.length < 4) throw new Error("Not enough arguments.");

  if (isValidNumber(args[2]) && isValidNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error("Arguments should be numbers");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow((height * 0.01), 2);
  
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  }
  return "Obese";
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArgs(process.argv);
    console.log(calculateBmi(height, weight));

  } catch (error: unknown) {
    let errorMessage = 'Error: ';

    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}