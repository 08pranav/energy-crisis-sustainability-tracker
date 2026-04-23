import { create } from 'zustand';

export type CommodityType = 'wti_crude' | 'brent_crude' | 'natural_gas' | 'coal' | 'electricity';

interface EnergyState {
  selectedCommodity: CommodityType;
  setSelectedCommodity: (c: CommodityType) => void;
  activeConflictId: string | null;
  setActiveConflictId: (id: string | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
}

export const useEnergyStore = create<EnergyState>((set) => ({
  selectedCommodity: 'wti_crude',
  setSelectedCommodity: (c) => set({ selectedCommodity: c }),
  activeConflictId: null,
  setActiveConflictId: (id) => set({ activeConflictId: id }),
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
}));
