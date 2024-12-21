import { createSlice } from '@reduxjs/toolkit';

const localProductSlice = createSlice({
  name: 'localProducts',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload);
    }
  }
});

export const { addProduct, removeProduct } = localProductSlice.actions;
export default localProductSlice.reducer;