import type { Cycle, MedicationStatus } from "./types";

function parseLocalDate(dateText: string): Date {
  const [year, month, day] = dateText.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDayCount(days: number): string {
  return `${days} day${days === 1 ? "" : "s"}`;
}

export function formatDate(dateText: string): string {
  return parseLocalDate(dateText).toLocaleDateString("en-CA");
}

export function buildNextMedicationText(
  cycle: Cycle | null,
  medicationStatus: MedicationStatus | null,
): string {
  if (!cycle || !medicationStatus) {
    return "Start a cycle first";
  }

  if (medicationStatus.active) {
    return "Today";
  }

  const currentDay = cycle.currentDay;

  if (currentDay < medicationStatus.medicationStartDay) {
    const daysUntilMedication =
      medicationStatus.medicationStartDay - currentDay;
    const nextDate = new Date(parseLocalDate(cycle.startDate));
    nextDate.setDate(
      nextDate.getDate() + medicationStatus.medicationStartDay - 1,
    );

    return `${nextDate.toLocaleDateString("en-CA")} (${formatDayCount(daysUntilMedication)})`;
  }

  return "Medication window completed for this cycle";
}
