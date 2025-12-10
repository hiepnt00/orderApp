import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { addItem } from '../../store/cartSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import './menu.scss'

const sampleItems = [
  { id: '1', name: 'Phở bắp bò', desc: '459 kcal/ Vietnamese noodle soup', price: 75000, image: '/assets/images/pho.jpg' },
  { id: '2', name: 'Bún bò Huế', desc: '453 kcal/ Special spicy Vietnamese beef noodle soup', price: 65000, image: '/assets/images/bunbo.jpg' },
  { id: '3', name: 'Trà đào cam sả', desc: '247 Kcal/ Peach orange lemongrass iced tea', price: 45000, image: '/assets/images/tea.jpg' }
]

export default function UserMenu() {
  const dispatch = useAppDispatch()
  const cart = useSelector((s: RootState) => s.cart)

  const add = (item: any) => {
    dispatch(addItem({ id: item.id, name: item.name, price: item.price, qty: 1, image: item.image }))
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <Box className="user-menu-root">
      <Box className="user-header">
        <Typography className="logo">Hệ Thống TCI</Typography>
        <IconButton component={RouterLink} to="/app/cart" className="cart-btn"><span className="cart-count">{cart.length}</span></IconButton>
      </Box>

      <Box className="search-area">
        <Chip label="Tất cả" color="default" />
        <Chip label="Đặc biệt" />
        <Chip label="Bún/Phở" />
      </Box>

      <Box className="table-box">
        <Typography>Số bàn</Typography>
        <Box className="table-number">A06</Box>
      </Box>

      <Grid container spacing={2} className="items-list">
        {sampleItems.map(it => (
          <Grid item xs={12} key={it.id}>
            <Box className="product-card">
              <img src={it.image} alt={it.name} />
              <Box className="product-info">
                <Typography className="name">{it.name} - {it.desc}</Typography>
                <Typography className="price">{it.price.toLocaleString()} đ</Typography>
              </Box>
              <IconButton className="add-circle" onClick={() => add(it)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box className="bottom-cart">
        <Box>
          <Typography>Giỏ hàng ({cart.reduce((s,i)=>s+i.qty,0)} món)</Typography>
          <Typography className="total">{total.toLocaleString()} đ</Typography>
        </Box>
        <Button variant="contained" className="checkout-btn" component={RouterLink} to="/app/cart">Đến giỏ hàng để thanh toán</Button>
      </Box>
    </Box>
  )
}
