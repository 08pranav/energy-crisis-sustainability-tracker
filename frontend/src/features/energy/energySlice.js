import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latest: [],
  historical: {},
  renewablesVsFossil: [],
  forecast: {},
  filters: {
    countryIso3: 'all',
    commodity: 'all',
    from: null,
    to: null
  },
  kpis: {
    totalCountries: 0,
    globalPriceIndex: 0,
    disruptionCount: 0
  },
  status: 'idle',
  error: null
};

const energySlice = createSlice({
  name: 'energy',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLatest(state, action) {
      state.latest = action.payload;
    },
    setHistorical(state, action) {
      state.historical = action.payload;
    },
    setRenewablesVsFossil(state, action) {
      state.renewablesVsFossil = action.payload;
    },
    setForecast(state, action) {
      state.forecast = action.payload;
    },
    setKpis(state, action) {
      state.kpis = action.payload;
    },
    setEnergyStatus(state, action) {
      state.status = action.payload;
    },
    setEnergyError(state, action) {
      state.error = action.payload;
    }
  }
});

export const {
  setFilters,
  setLatest,
  setHistorical,
  setRenewablesVsFossil,
  setForecast,
  setKpis,
  setEnergyStatus,
  setEnergyError
} = energySlice.actions;

export default energySlice.reducer;
