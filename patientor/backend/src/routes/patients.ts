import { z } from 'zod';
import express, { type Request, type Response, type NextFunction} from 'express';
import patientsService from '../services/patientsService.ts';
import { NewPatientSchema, type NewPatientEntry, type NonSensitivePatientEntry, type PatientEntry } from '../../types.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.status(200).send(patientsService.getPatients());
});

// middleware to parse the incomming data
const newPatientEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

patientsRouter.post('/', newPatientEntryParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});


// middleware to print the error
const errorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
    next();
  }
  next(error);
};

patientsRouter.use(errorHandler);


export default patientsRouter;