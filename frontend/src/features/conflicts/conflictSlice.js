import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  selectedEventId: null,
  timelineRange: {
    from: null,
    to: null
  },
  overlayEnabled: true,
  status: 'idle',
  error: null
};

const conflictSlice = createSlice({
  name: 'conflict',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    setSelectedEventId(state, action) {
      state.selectedEventId = action.payload;
    },
    setTimelineRange(state, action) {
      state.timelineRange = action.payload;
    },
    setOverlayEnabled(state, action) {
      state.overlayEnabled = action.payload;
    },
    setConflictStatus(state, action) {
      state.status = action.payload;
    },
    setConflictError(state, action) {
      state.error = action.payload;
    }
  }
});

export const {
  setEvents,
  setSelectedEventId,
  setTimelineRange,
  setOverlayEnabled,
  setConflictStatus,
  setConflictError
} = conflictSlice.actions;

export default conflictSlice.reducer;
