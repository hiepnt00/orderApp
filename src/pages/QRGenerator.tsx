import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AppBreadcrumbs from '../components/AppBreadcrumbs'
import QRCode from 'react-qr-code'
import { InputBase } from '@mui/material'

export default function QRGenerator() {
  // Example: generate QR that links to ordering page for table=1
  const [exampleUrl, setExampleUrl] = useState(`${window.location.origin}/order?table=1`)
  return (
    <Box>
      <AppBreadcrumbs items={[{ label: 'Trang chủ', to: '/' }, { label: 'QR Code' }]} />
      <Typography variant="h5" gutterBottom>QR Code Generator</Typography>
      <Typography sx={{ mb: 2 }}>This QR links to the ordering URL (example):</Typography>
      <Box sx={{ background: 'white', display: 'inline-block', p: 2 }}>
        <QRCode value={exampleUrl} fgColor="#000000" bgColor="#ffffff" style={{ display: 'block' }} />
      </Box>
      <Typography sx={{ mt: 1, }}><InputBase defaultValue={exampleUrl} onChange={(e) => {
        setExampleUrl(e.currentTarget.value)
      }} sx={{ color: 'black', backgroundColor: 'white', width: '500px', padding: '8px' }} /></Typography>
    </Box>
  )
}
