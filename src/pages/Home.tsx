import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function Home() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome</Typography>
      <Typography>Use the navigation to visit Menu, Orders or generate QR codes for tables.</Typography>
    </Box>
  )
}
