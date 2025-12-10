import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type MenuItem = { id: string; name: string; price: number }

const initialState: MenuItem[] = [
  { id: '1', name: 'Pho Bo', price: 70000 },
  { id: '2', name: 'Com Suon', price: 85000 }
]

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<MenuItem>) {
      state.push(action.payload)
    },
    removeItem(state, action: PayloadAction<string>) {
      return state.filter(i => i.id !== action.payload)
    }
  }
})

export const { addItem, removeItem } = menuSlice.actions
export default menuSlice.reducer
