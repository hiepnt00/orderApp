import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { addItem } from '../../store/cartSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import './product.scss'

const sample = {
  id: '1',
  name: 'Phở bắp bò',
  desc: '459 kcal/ Vietnamese noodle soup with beef muscle',
  price: 75000,
  image: '/assets/images/pho.jpg'
}

export default function ProductDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [qty, setQty] = useState(1)

  const addToCart = () => {
    dispatch(addItem({ id: sample.id, name: sample.name, price: sample.price, qty, image: sample.image }))
    navigate('/app')
  }

  return (
    <Box className="product-detail-root">
      <Box className="image-wrap">
        <img src={sample.image} alt={sample.name} />
      </Box>
      <Box className="content">
        <Typography variant="h6">{sample.name} - {sample.desc}</Typography>
        <Typography className="price">{sample.price.toLocaleString()} VND</Typography>
        <Typography sx={{ mt:2 }}>Ghi chú cho nhà hàng:</Typography>
        <Box component="textarea" className="note-input" placeholder="Cho nhà hàng biết thêm về yêu cầu của bạn" />
      </Box>

      <Box className="product-footer">
        <Typography className="price-big">{sample.price.toLocaleString()} VND</Typography>
        <Box className="qty-group">
          <IconButton onClick={()=>setQty(q=>Math.max(1,q-1))}><RemoveIcon/></IconButton>
          <Typography>{qty}</Typography>
          <IconButton onClick={()=>setQty(q=>q+1)}><AddIcon/></IconButton>
        </Box>
        <Button variant="contained" className="add-btn" onClick={addToCart}>Thêm vào giỏ hàng</Button>
      </Box>
    </Box>
  )
}
