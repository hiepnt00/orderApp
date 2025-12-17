import React, { createContext, useContext, useReducer } from 'react';
import { CartItem, FoodItem } from '../types';

type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER';

type State = {
  items: CartItem[];
  tableCode: string;
  paymentMethod: PaymentMethod;
};

type Action =
  | { type: 'ADD'; item: FoodItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'QTY'; id: string; qty: number }
  | { type: 'NOTE'; id: string; note: string }
  | { type: 'TABLE'; table: string }
  | { type: 'PAYMENT'; method: PaymentMethod }
  | { type: 'CLEAR' };

const initialState: State = {
  items: [],
  tableCode: 'A06',
  paymentMethod: 'CASH',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const found = state.items.find(i => i.item.id === action.item.id);
      if (found) {
        return {
          ...state,
          items: state.items.map(i =>
            i.item.id === action.item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { item: action.item, quantity: 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.item.id !== action.id) };
    case 'QTY':
      return {
        ...state,
        items: state.items
          .map(i =>
            i.item.id === action.id ? { ...i, quantity: action.qty } : i
          )
          .filter(i => i.quantity > 0),
      };
    case 'NOTE':
      return {
        ...state,
        items: state.items.map(i =>
          i.item.id === action.id ? { ...i, note: action.note } : i
        ),
      };
    case 'TABLE':
      return { ...state, tableCode: action.table };
    case 'PAYMENT':
      return { ...state, paymentMethod: action.method };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
