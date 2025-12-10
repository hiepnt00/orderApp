import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Order = { id: string; table: string; items: Array<{ id: string; qty: number }>; total: number }

const initialState: Order[] = []

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.push(action.payload)
    },
    clearOrders() {
      return []
    }
  }
})

export const { addOrder, clearOrders } = ordersSlice.actions
export default ordersSlice.reducer
