import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rules: [],
  activeAlerts: [],
  lastTriggeredAt: null,
  notificationPrefs: {
    email: false,
    inApp: true
  },
  status: 'idle',
  error: null
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setRules(state, action) {
      state.rules = action.payload;
    },
    setActiveAlerts(state, action) {
      state.activeAlerts = action.payload;
      state.lastTriggeredAt = new Date().toISOString();
    },
    setNotificationPrefs(state, action) {
      state.notificationPrefs = { ...state.notificationPrefs, ...action.payload };
    },
    setAlertStatus(state, action) {
      state.status = action.payload;
    },
    setAlertError(state, action) {
      state.error = action.payload;
    }
  }
});

export const { setRules, setActiveAlerts, setNotificationPrefs, setAlertStatus, setAlertError } =
  alertSlice.actions;

export default alertSlice.reducer;
