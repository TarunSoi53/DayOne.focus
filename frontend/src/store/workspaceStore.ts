import { create } from 'zustand';

type State = {
  isFocusMode: boolean;
  energyLevel: 'Low' | 'Medium' | 'High';
  mindState: 'Foggy' | 'Clear';
  isAddingTask: boolean;
  selectedTask: any | null;
  setIsFocusMode: (val: boolean) => void;
  setEnergyLevel: (val: 'Low' | 'Medium' | 'High') => void;
  setMindState: (val: 'Foggy' | 'Clear') => void;
  setIsAddingTask: (val: boolean) => void;
  setSelectedTask: (task: any | null) => void;
};

export const useWorkspaceStore = create<State>((set) => ({
  isFocusMode: false,
  energyLevel: 'Medium',
  mindState: 'Clear',
  isAddingTask: false,
  selectedTask: null,
  setIsFocusMode: (val) => set({ isFocusMode: val }),
  setEnergyLevel: (val) => set({ energyLevel: val }),
  setMindState: (val) => set({ mindState: val }),
  setIsAddingTask: (val) => set({ isAddingTask: val }),
  setSelectedTask: (task) => set({ selectedTask: task }),
}));
