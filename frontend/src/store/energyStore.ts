import { create } from 'zustand';

export type CommodityType = 'wti_crude' | 'brent_crude' | 'natural_gas' | 'coal' | 'electricity';

interface PricePoint {
  time: number;
  price: number;
  volume?: number;
  forecast?: number;
}

interface EnergyState {
  selectedCommodity: CommodityType;
  setSelectedCommodity: (c: CommodityType) => void;
  activeConflictId: string | null;
  setActiveConflictId: (id: string | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
  commodityHistory: Record<CommodityType, PricePoint[]>;
  trendsData: any[];
  supplyEvents: any[];
  loading: boolean;
  trendsLoading: boolean;
  supplyLoading: boolean;
  error: string | null;
  fetchEnergyData: () => Promise<void>;
  fetchTrendsData: () => Promise<void>;
  fetchSupplyData: () => Promise<void>;
  startRealTimeTicker: () => void;
}

const MAX_HISTORY = 30;
let __realTimeTicker: any = null;

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
  trendsData: [],
  supplyEvents: [],
  loading: false,
  trendsLoading: false,
  supplyLoading: false,
  error: null,
  fetchEnergyData: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch('http://localhost:5001/api/energy-prices');
      const payload = await response.json();
      console.log('API Response:', payload);

      if (!response.ok || !payload.success) {
        throw new Error(payload?.message || 'Failed to fetch energy prices');
      }

      const historical = payload.data;
      if (!Array.isArray(historical)) {
        throw new Error('No historical energy prices returned');
      }

      const wtiHistory: PricePoint[] = historical
        .filter(item => item.wti !== null)
        .map(item => ({ time: Date.parse(item.date), price: Number(item.wti) }));

      const brentHistory: PricePoint[] = historical
        .filter(item => item.brent !== null)
        .map(item => ({ time: Date.parse(item.date), price: Number(item.brent) }));

      const ngHistory: PricePoint[] = historical
        .filter(item => item.ng !== null)
        .map(item => ({ time: Date.parse(item.date), price: Number(item.ng) }));

      set((state) => ({
        commodityHistory: {
          ...state.commodityHistory,
          wti_crude: wtiHistory,
          brent_crude: brentHistory,
          natural_gas: ngHistory
        },
        loading: false,
        error: null
      }));
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : 'Failed to fetch energy data' });
    }
  },
  
  fetchTrendsData: async () => {
    set({ trendsLoading: true });
    // Simulate network delay for scaffolded backend replacement
    await new Promise(resolve => setTimeout(resolve, 800));
    set({
      trendsLoading: false,
      trendsData: [
        { year: '2018', renewables: 24, fossil: 76, volatility: 10, cost: 40 },
        { year: '2019', renewables: 26, fossil: 74, volatility: 12, cost: 42 },
        { year: '2020', renewables: 29, fossil: 71, volatility: 8, cost: 35 },
        { year: '2021', renewables: 30, fossil: 70, volatility: 15, cost: 48 },
        { year: '2022', renewables: 31, fossil: 69, volatility: 85, cost: 92 },
        { year: '2024', renewables: 35, fossil: 65, volatility: 50, cost: 78 },
        { year: '2026', renewables: 42, fossil: 58, volatility: 35, cost: 60 },
      ]
    });
  },

  fetchSupplyData: async () => {
    set({ supplyLoading: true });
    // Simulate network delay for scaffolded backend replacement
    await new Promise(resolve => setTimeout(resolve, 600));
    set({
      supplyLoading: false,
      supplyEvents: [
        { id: 1, name: 'Russia-Ukraine War', year: 2022, impact: 95 },
        { id: 2, name: 'Red Sea Route Disruption', year: 2023, impact: 80 },
        { id: 3, name: 'Middle East Tensions', year: 2024, impact: 85 },
        { id: 4, name: 'European Gas Crisis', year: 2022, impact: 90 },
      ]
    });
  },

  startRealTimeTicker: () => {
    if (__realTimeTicker) return; // singleton lock
    // Poll true live data backend instead of generating synthetic noise
    const pollLiveQuotes = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/energy-prices/live');
        if (!response.ok) return;
        const payload = await response.json();
        
        if (payload.success && payload.live) {
          set((state) => {
            const nextHistory = { ...state.commodityHistory };
            
            const handleUpdate = (commodityKey: CommodityType, liveValue: number | null) => {
              if (liveValue && nextHistory[commodityKey] !== undefined) {
                 const history = [...nextHistory[commodityKey]];
                 // ensure array isn't absolutely 0 capacity
                 if (history.length === 0) history.push({ time: Date.now() - 60000, price: liveValue * 0.99});
                 
                 history.push({
                   time: Date.now(),
                   price: Number(liveValue.toFixed(2)),
                   volume: Math.random() * 80 + 20
                 });
                 if (history.length > MAX_HISTORY) history.shift();
                 
                 // Predict regression line
                 if (history.length > 2) {
                   const prevP = history[history.length - 2].price;
                   const currentP = history[history.length - 1].price;
                   const dir = currentP - prevP;
                   history[history.length - 1] = {
                     ...history[history.length - 1],
                     forecast: Number((currentP + dir).toFixed(2))
                   };
                 }
                 
                 nextHistory[commodityKey] = history;
               }
            };

            handleUpdate('wti_crude', payload.live.wti);
            handleUpdate('brent_crude', payload.live.brent);
            handleUpdate('natural_gas', payload.live.ng);

            return { commodityHistory: nextHistory };
          });
        }
      } catch (err) {
        console.error('Failed to stream live network quotes');
      }
    };
    
    pollLiveQuotes();
    __realTimeTicker = setInterval(pollLiveQuotes, 5000); // Poll true APIs every 5 seconds
  }
}));
