import express, { type Response } from 'express';
import diagnosesService from '../services/diagnosesService.ts';
import type { DiagnosesEntry } from '../../types.ts';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res: Response<DiagnosesEntry[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;