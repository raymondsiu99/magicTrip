import type { DayItinerary } from '../data';

export interface CloudTripData {
  itinerary: DayItinerary[];
  expenses: { date: string; amount: number; description: string }[];
  completedItems: Record<string, string[]>;
  notes: string;
  packingList: { id: string; text: string; done: boolean }[];
  savedAt?: string;
}

const API_BASE = '/api';

/**
 * Load trip data from Azure Blob Storage via the API backend.
 * Returns null when no cloud data exists yet or when the API is unavailable
 * (e.g. during local development without the Functions emulator).
 */
export async function loadTripFromCloud(): Promise<CloudTripData | null> {
  try {
    const response = await fetch(`${API_BASE}/itinerary`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as CloudTripData;
  } catch {
    return null;
  }
}

/**
 * Persist trip data to Azure Blob Storage via the API backend.
 * Silently swallows errors so a network issue never blocks the UI.
 */
export async function saveTripToCloud(
  data: Omit<CloudTripData, 'savedAt'>
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/itinerary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
