import patientsData from "../../data/patient.ts";
import { type NewPatientEntry, type NonSensitivePatientEntry, type PatientEntry} from "../../types.ts";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
const addPatient = (newPatient: NewPatientEntry): PatientEntry => {
  const patient = { ...newPatient, id: uuid() };
  patientsData.push(patient);
  return patient;
};

export default { getPatients, addPatient };