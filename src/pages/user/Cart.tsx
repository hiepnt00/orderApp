import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { updateQty, removeItem, clearCart } from '../../store/cartSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import './cart.scss'

export default function CartPage(){
  const dispatch = useAppDispatch()
  const cart = useSelector((s: RootState) => s.cart)

  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0)

  return (
    <Box className="cart-root">
      <Typography variant="h6">Giỏ hàng</Typography>
      <Box className="table-row">
        <Typography>Số bàn</Typography>
        <Box className="table-num">A06</Box>
        <Typography className="status">Đang đặt món</Typography>
      </Box>

      <Box className="items">
        {cart.map(it => (
          <Box key={it.id} className="cart-item">
            <img src={it.image} alt={it.name} />
            <Box className="meta">
              <Typography className="name">{it.name}</Typography>
              <Typography className="price">{it.price.toLocaleString()} đ</Typography>
            </Box>
            <Box className="qty">
              <IconButton onClick={() => dispatch(updateQty({id: it.id, qty: Math.max(1, it.qty-1)}))}><RemoveIcon/></IconButton>
              <Typography>{it.qty}</Typography>
              <IconButton onClick={() => dispatch(updateQty({id: it.id, qty: it.qty+1}))}><AddIcon/></IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <Box className="payment">
        <Typography>Phương thức thanh toán</Typography>
        <Box className="options">
          <label><input type="radio" name="pay"/> Tiền mặt</label>
          <label><input type="radio" name="pay" defaultChecked/> Quẹt thẻ</label>
          <label><input type="radio" name="pay"/> Chuyển khoản</label>
        </Box>
      </Box>

      <Box className="total-row">
        <Typography>Tổng cộng ({cart.length} món)</Typography>
        <Typography className="total-value">{total.toLocaleString()} đ</Typography>
      </Box>

      <Button variant="contained" className="pay-btn">Xác nhận & Thanh toán đơn hàng</Button>
    </Box>
  )
}
