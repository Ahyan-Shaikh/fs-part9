import type { DiagnosesEntry } from "../../types.ts";
import diagnosesData from "../../data/diagnoses.ts";

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnosesData;
};

export default { getDiagnoses };