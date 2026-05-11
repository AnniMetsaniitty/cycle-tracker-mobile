import type { Cycle, MedicationStatus } from "./types";

function parseLocalDate(dateText: string): Date {
  const [year, month, day] = dateText.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDayCount(days: number): string {
  return `${days} day${days === 1 ? "" : "s"}`;
}

function getCycleLengthInDays(startDateText: string, endDateText: string): number {
  const startDate = parseLocalDate(startDateText);
  const endDate = parseLocalDate(endDateText);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay) + 1;
}

export function formatDate(dateText: string): string {
  return parseLocalDate(dateText).toLocaleDateString("en-CA");
}

export function getCycleStateText(cycle: Cycle): string {
  return cycle.active ? "Active" : "Closed";
}

export function getCycleLengthText(cycle: Cycle): string {
  if (cycle.endDate) {
    return formatDayCount(getCycleLengthInDays(cycle.startDate, cycle.endDate));
  }

  return `${formatDayCount(cycle.currentDay)} active`;
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
