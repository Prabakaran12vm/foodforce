import { createSlice, current } from '@reduxjs/toolkit';

// Step3. Create state slice with createSlice function and add initial state

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  // reducer functions corresponding to each actions
  reducers: {
    // action: reducerFunction() => {}
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      // console.log(current(state));
      state.items.length = 0; // originalState = []
      // to clear the cart state = [] won't work because,
      // that's not modifying the original state

      // In RTK either we've to mutate the existing state or return the new state

      // return {items: []}; // this new object will be replaced inside originalState = {items: []}
    },
  },
});

// export actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// export reducer
export default cartSlice.reducer;
