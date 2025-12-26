import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type OrderStatus = 'pending' | 'received' | 'in_progress' | 'completed' | 'cancelled'

type OrderItem = { id: string; qty: number; note?: string }

type Order = {
  id: string;
  table: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const initialState = {
  listAllOrders: [
    {
      id: 'order_1',
      table: 'A1',
      items: [{ id: 'pho_tai', qty: 2, note: 'Ít hành' }, { id: 'bun_bo_hue', qty: 1 }],
      total: 65000 * 2 + 68000,
      status: 'received',
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 phút trước
    },
    {
      id: 'order_2',
      table: 'B2',
      items: [{ id: 'mi_quang', qty: 1, note: 'Không ớt' }],
      total: 70000,
      status: 'in_progress',
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: 'order_3',
      table: 'C3',
      items: [{ id: 'banh_mi_thit', qty: 3, note: 'Thêm rau' }],
      total: 0, // placeholder
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
  ],
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.listAllOrders.push(action.payload)
    },
    updateOrderStatus(state, action: PayloadAction<{ id: string; status: OrderStatus }>) {
      const order = state.listAllOrders.find(o => o.id === action.payload.id)
      if (order) {
        order.status = action.payload.status
      }
    },
    clearOrders(state) {
      state.listAllOrders = []
    }
  }
})

export const { addOrder, updateOrderStatus, clearOrders } = ordersSlice.actions
export default ordersSlice.reducer
