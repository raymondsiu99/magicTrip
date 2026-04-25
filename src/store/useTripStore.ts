import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DayItinerary, defaultItinerary, initialBudget } from '../data';

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
  
  // Actions
  updateItinerary: (newItinerary: DayItinerary[]) => void;
  updateDay: (date: string, day: DayItinerary) => void;
  addExpense: (expense: DailySpend) => void;
  removeExpense: (date: string, index: number) => void;
  toggleCompletedItem: (date: string, itemId: string) => void;
  updateNotes: (notes: string) => void;
  addPackingItem: (text: string) => void;
  togglePackingItem: (id: string) => void;
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
    }),
    {
      name: 'tripflow-storage',
      version: 2,
    }
  )
);
