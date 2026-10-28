export type WindowRow = { season: string; zone: string; dates: string; start?: string; end?: string };
export type WindowStatus = "today" | "upcoming" | "ended" | "unknown" | "year-round";
export function readRange(fragment: string): { start: string; end: string } | null;
export function windowStatus(row: WindowRow, today: string): WindowStatus;
export function statusLabel(status: WindowStatus): string;
