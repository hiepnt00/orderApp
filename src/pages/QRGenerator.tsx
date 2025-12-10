import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import QRCode from 'react-qr-code'

export default function QRGenerator(){
  // Example: generate QR that links to ordering page for table=1
  const exampleUrl = `${window.location.origin}/order?table=1`
  return (
    <Box>
      <Typography variant="h5" gutterBottom>QR Code Generator</Typography>
      <Typography sx={{ mb: 2 }}>This QR links to the ordering URL (example):</Typography>
      <Box sx={{ background: 'white', display: 'inline-block', p: 2 }}>
        <QRCode value={exampleUrl} />
      </Box>
      <Typography sx={{ mt: 1 }}>{exampleUrl}</Typography>
    </Box>
  )
}
