import { Button, Container, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const nav = useNavigate();
  return (
    <Container sx={{ mt: 6 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Quán Ăn Demo
        </Typography>
        <Button variant="contained" color="success" onClick={() => nav('/menu')}>
          Chọn món
        </Button>
        <Button variant="contained" color="success" onClick={() => nav('/qr')}>
          Mã QR code
        </Button>
      </Stack>
    </Container>
  );
}
