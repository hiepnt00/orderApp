import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'

export default function Header() {
  return (
    <AppBar position="static" color="inherit" elevation={0} className="header-placeholder">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          Restaurant Admin
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button component={RouterLink} to="/menu">Menu</Button>
          <Button component={RouterLink} to="/orders">Orders</Button>
          <Button component={RouterLink} to="/qr">QR</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
