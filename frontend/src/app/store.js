import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import energyReducer from '../features/energy/energySlice';
import conflictReducer from '../features/conflicts/conflictSlice';
import alertReducer from '../features/alerts/alertSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    energy: energyReducer,
    conflict: conflictReducer,
    alerts: alertReducer
  }
});
