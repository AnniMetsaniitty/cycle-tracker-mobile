export type User = {
  id: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type Cycle = {
  id: string;
  startDate: string;
  endDate?: string;
  cycleDay: number;
  isActive: boolean;
};

export type MedicationStatus = {
  shouldTakeMedicationToday: boolean;
  medicationStartDate: string;
  medicationEndDate: string;
  nextMedicationDate?: string;
};
