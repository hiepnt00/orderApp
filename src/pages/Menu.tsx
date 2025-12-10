import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

export default function MenuPage() {
  // static sample menu items — later will come from API / store
  const items = [
    { id: '1', name: 'Pho Bo', price: 70000 },
    { id: '2', name: 'Com Suon', price: 85000 },
    { id: '3', name: 'Goi Cuon', price: 45000 }
  ]

  return (
    <div>
      <Typography variant="h5" gutterBottom>Menu</Typography>
      123123123
      <Grid container spacing={2}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">{item.price.toLocaleString()} VND</Typography>
                <Button sx={{ mt: 1 }} variant="contained">Add</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
