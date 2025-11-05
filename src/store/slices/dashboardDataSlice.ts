import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataRow {
  id: string;
  name: string;
  category: string;
  value: number;
  date: string;
}

interface DashboardDataState {
  data: DataRow[];
}

const initialState: DashboardDataState = {
  data: [
    { id: '1', name: 'Продукт A', category: 'Категория 1', value: 1200, date: '2024-01-15' },
    { id: '2', name: 'Продукт B', category: 'Категория 2', value: 800, date: '2024-01-16' },
    { id: '3', name: 'Продукт C', category: 'Категория 1', value: 1500, date: '2024-01-17' },
    { id: '4', name: 'Продукт D', category: 'Категория 3', value: 950, date: '2024-01-18' },
    { id: '5', name: 'Продукт E', category: 'Категория 2', value: 1100, date: '2024-01-19' },
    { id: '6', name: 'Продукт F', category: 'Категория 1', value: 700, date: '2024-01-20' },
  ],
};

const dashboardDataSlice = createSlice({
  name: 'dashboardData',
  initialState,
  reducers: {
    addDataRow: (state, action: PayloadAction<Omit<DataRow, 'id'>>) => {
      const newId = String(Date.now());
      state.data.push({
        ...action.payload,
        id: newId,
      });
    },
    updateDataRow: (state, action: PayloadAction<DataRow>) => {
      const index = state.data.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteDataRow: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addDataRow, updateDataRow, deleteDataRow } = dashboardDataSlice.actions;
export default dashboardDataSlice.reducer;
