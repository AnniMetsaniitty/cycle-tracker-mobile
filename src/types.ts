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
  active: boolean;
  currentDay: number;
};

export type MedicationStatus = {
  cycleId: number;
  currentDay: number;
  medicationStartDay: number;
  medicationEndDay: number;
  active: boolean;
  taken: boolean;
};
