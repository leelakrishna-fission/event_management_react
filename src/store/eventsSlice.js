import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import eventJSON from '../fixtures/events.json';

const initialState = {
  events: JSON.parse(JSON.stringify(eventJSON)) || [],
  filters: {
    search: '',
    category: '',
  },
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const newEvent = { ...action.payload, id: uuidv4() };
      state.events.push(newEvent);
    },
    setEvents: (state, action) => {
      state.events = [...action.payload];
    },
    updateEvent: (state, action) => {
      const { id, ...rest } = action.payload;
      const index = state.events.findIndex(event => event.id === id);
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...rest };
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
  },
});

export const {
  addEvent,
  setEvents,
  updateEvent,
  deleteEvent,
  setSearchFilter,
  setCategoryFilter,
} = eventsSlice.actions;

export default eventsSlice.reducer;
