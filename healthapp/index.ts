import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercies, type ExerciseValues } from './exerciseCalculator.ts';
import { isValidNumber } from './utils/util.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.status(200).send({ height: Number(height), weight: Number(weight), bmi });
  } else {
    return res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) =>  {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const params = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!params.target || !params.daily_exercises) {
    return res.status(400).send({ error: 'parameters missing' });
  };
  const { target, daily_exercises } = params as ExerciseValues;

  if (isValidNumber(target) && daily_exercises.every(isValidNumber)) {
    return res.status(200).send(calculateExercies(target, daily_exercises));
  }

  return res.status(400).send({ error: 'malformatted parameters' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});


