import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import menuReducer from './menuSlice'
import ordersReducer from './ordersSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    orders: ordersReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
