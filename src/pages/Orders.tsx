import React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

export default function Orders() {
  // sample empty state
  const orders: Array<{ id: string; table: string; total: number }> = []

  return (
    <div>
      <Typography variant="h5" gutterBottom>Orders</Typography>
      {orders.length === 0 ? (
        <Typography>No orders yet.</Typography>
      ) : (
        <List>
          {orders.map(o => (
            <ListItem key={o.id}>
              <ListItemText primary={`Table ${o.table}`} secondary={`${o.total} VND`} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}
