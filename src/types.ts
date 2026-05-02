export type User = {
  id: number;
  username: string;
  email: string;
};

export type AuthResponse = User & {
  accessToken: string;
};

export type Cycle = {
  id: number;
  userId: number;
  startDate: string;
  endDate: string | null;
  cycleDay: number;
  active: boolean;
};

export type MedicationStatus = {
  shouldTakeMedicationToday: boolean;
  medicationStartDate: string;
  medicationEndDate: string;
  nextMedicationDate?: string;
};
