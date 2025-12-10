import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartItem = { id: string; name: string; price: number; qty: number; image?: string }

const initialState: CartItem[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const idx = state.findIndex(i => i.id === action.payload.id)
      if (idx >= 0) {
        state[idx].qty += action.payload.qty
      } else {
        state.push(action.payload)
      }
    },
    updateQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const idx = state.findIndex(i => i.id === action.payload.id)
      if (idx >= 0) state[idx].qty = action.payload.qty
    },
    removeItem(state, action: PayloadAction<string>) {
      return state.filter(i => i.id !== action.payload)
    },
    clearCart() {
      return []
    }
  }
})

export const { addItem, updateQty, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
