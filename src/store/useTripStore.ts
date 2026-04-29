import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DayItinerary, defaultItinerary, initialBudget } from '../data';
import { loadTripFromCloud, saveTripToCloud } from '../lib/storageApi';

export type SyncStatus = 'idle' | 'saving' | 'loading' | 'saved' | 'error';

export interface DailySpend {
  date: string;
  amount: number;
  description: string;
}

export interface TripState {
  itinerary: DayItinerary[];
  budget: number;
  expenses: DailySpend[];
  completedItems: { [date: string]: string[] }; // stores POI ids or custom items
  notes: string;
  packingList: { id: string; text: string; done: boolean }[];
  syncStatus: SyncStatus;
  userVideos: { [key: string]: string[] }; // key: "poi-1", "hotel-mitsui-ueno", etc.

  // Actions
  updateItinerary: (newItinerary: DayItinerary[]) => void;
  updateDay: (date: string, day: DayItinerary) => void;
  addExpense: (expense: DailySpend) => void;
  removeExpense: (date: string, index: number) => void;
  toggleCompletedItem: (date: string, itemId: string) => void;
  updateNotes: (notes: string) => void;
  addPackingItem: (text: string) => void;
  togglePackingItem: (id: string) => void;
  loadFromCloud: () => Promise<void>;
  syncToCloud: () => Promise<void>;
  addUserVideo: (key: string, videoId: string) => void;
  removeUserVideo: (key: string, videoId: string) => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      itinerary: defaultItinerary,
      budget: initialBudget,
      expenses: [],
      completedItems: {},
      notes: '',
      packingList: [],
      syncStatus: 'idle' as SyncStatus,
      userVideos: {},

      updateItinerary: (newItinerary) => set({ itinerary: newItinerary }),
      updateDay: (date, day) => 
        set((state) => ({
          itinerary: state.itinerary.map(d => d.date === date ? day : d)
        })),
      addExpense: (expense) => 
        set((state) => ({
          expenses: [...state.expenses, expense]
        })),
      removeExpense: (date, index) =>
        set((state) => ({
          expenses: state.expenses.filter((e, i) => !(e.date === date && i === index))
        })),
      toggleCompletedItem: (date, itemId) =>
        set((state) => {
          const itemsForDate = state.completedItems[date] || [];
          if (itemsForDate.includes(itemId)) {
            return { completedItems: { ...state.completedItems, [date]: itemsForDate.filter(id => id !== itemId) } };
          } else {
            return { completedItems: { ...state.completedItems, [date]: [...itemsForDate, itemId] } };
          }
        }),
      updateNotes: (notes) => set({ notes }),
      addPackingItem: (text) => 
        set((state) => ({
          packingList: [...state.packingList, { id: Date.now().toString(), text, done: false }]
        })),
      togglePackingItem: (id) =>
        set((state) => ({
          packingList: state.packingList.map(item => item.id === id ? { ...item, done: !item.done } : item)
        })),

      addUserVideo: (key, videoId) =>
        set((state) => {
          const existing = state.userVideos[key] || [];
          if (existing.includes(videoId)) return state;
          return { userVideos: { ...state.userVideos, [key]: [...existing, videoId] } };
        }),
      removeUserVideo: (key, videoId) =>
        set((state) => ({
          userVideos: {
            ...state.userVideos,
            [key]: (state.userVideos[key] || []).filter((id) => id !== videoId),
          },
        })),

      loadFromCloud: async () => {
        set({ syncStatus: 'loading' });
        const data = await loadTripFromCloud();
        if (data) {
          set({
            itinerary: data.itinerary,
            expenses: data.expenses,
            completedItems: data.completedItems,
            notes: data.notes,
            packingList: data.packingList,
            syncStatus: 'saved',
          });
        } else {
          set({ syncStatus: 'idle' });
        }
      },

      syncToCloud: async () => {
        set({ syncStatus: 'saving' });
        const state = (useTripStore.getState() as TripState);
        const result = await saveTripToCloud({
          itinerary: state.itinerary,
          expenses: state.expenses,
          completedItems: state.completedItems,
          notes: state.notes,
          packingList: state.packingList,
        });
        set({ syncStatus: result.success ? 'saved' : 'error' });
        // Reset to idle after 3 s so the indicator fades
        setTimeout(() => set({ syncStatus: 'idle' }), 3000);
      },
    }),
    {
      name: 'tripflow-storage',
      version: 3,
      partialize: (state) => ({
        itinerary: state.itinerary,
        budget: state.budget,
        expenses: state.expenses,
        completedItems: state.completedItems,
        notes: state.notes,
        packingList: state.packingList,
        userVideos: state.userVideos,
      }),
    }
  )
);
