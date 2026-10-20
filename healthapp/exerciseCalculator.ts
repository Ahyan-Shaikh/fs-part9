import { isValidNumber } from "./utils/util.ts";

interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export type ExerciseValues = {
  target: number;
  daily_exercises: number[];
};

const parseArguments = (args: string[]): ExerciseValues => {

  if (args.length < 4) throw new Error("Not enough arguments.");

  const [,,target, ...dailyExercises] = args;

  if (isValidNumber(target) && dailyExercises.every(isValidNumber)) {
    return {
      target: Number(target),
      daily_exercises: dailyExercises.map(Number)
    };
  } else {
    throw new Error("Arguments should be a number.");
  }
};

export const calculateExercies = (target: number, dailyHours: number[]): ExercisesResult => {
  const result: ExercisesResult = {
    periodLength: dailyHours.length,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: '',
    target,
    average: 0,
  };

  let sum: number = 0;

  dailyHours.forEach((dailyHour) => {
    if (dailyHour >= 1) {
      result.trainingDays += 1;
      sum += dailyHour;
    }
  });

  result.average = sum / result.periodLength;

  if (result.average === target) {
    result.success = true;
    result.rating = 3;
    result.ratingDescription = "Brilliant, you reached the goal that you set!";
  } else if (result.average < target / 2) {
    result.rating = 1;
    result.ratingDescription = "that is very poor, you need to work on it";
  } else {
    result.rating = 2;
    result.ratingDescription = "not too bad but could be better";
  }

  return result;
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, daily_exercises } = parseArguments(process.argv);
  
    console.log(calculateExercies(target, daily_exercises));
  
  } catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
};