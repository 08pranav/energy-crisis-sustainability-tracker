import { create } from 'zustand';

export type CommodityType = 'wti_crude' | 'brent_crude' | 'natural_gas' | 'coal' | 'electricity';

interface PricePoint {
  time: number;
  price: number;
}

interface EnergyState {
  selectedCommodity: CommodityType;
  setSelectedCommodity: (c: CommodityType) => void;
  activeConflictId: string | null;
  setActiveConflictId: (id: string | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
  commodityHistory: Record<CommodityType, PricePoint[]>;
  loading: boolean;
  error: string | null;
  fetchEnergyData: () => Promise<void>;
}

const MAX_HISTORY = 30;

export const useEnergyStore = create<EnergyState>((set) => ({
  selectedCommodity: 'wti_crude',
  setSelectedCommodity: (c) => set({ selectedCommodity: c }),
  activeConflictId: null,
  setActiveConflictId: (id) => set({ activeConflictId: id }),
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  commodityHistory: {
    wti_crude: [],
    brent_crude: [],
    natural_gas: [],
    coal: [],
    electricity: []
  },
  loading: false,
  error: null,
  fetchEnergyData: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch('http://localhost:5001/api/energy-prices');
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload?.message || 'Failed to fetch energy prices');
      }

      const historical = payload.data?.historical;
      if (!Array.isArray(historical)) {
        throw new Error('No historical energy prices returned');
      }

      const wtiHistory: PricePoint[] = historical
        .filter(item => item.wti !== null)
        .map(item => ({ time: Date.parse(item.date), price: Number(item.wti) }));

      const brentHistory: PricePoint[] = historical
        .filter(item => item.brent !== null)
        .map(item => ({ time: Date.parse(item.date), price: Number(item.brent) }));

      set((state) => ({
        commodityHistory: {
          ...state.commodityHistory,
          wti_crude: wtiHistory,
          brent_crude: brentHistory
        },
        loading: false,
        error: null
      }));
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : 'Failed to fetch energy data' });
    }
  }
}));
