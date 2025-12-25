import { Button, Container, Typography, Stack } from '@mui/material';
import AppBreadcrumbs from '../components/AppBreadcrumbs'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const nav = useNavigate();
  return (
    <Container sx={{ mt: 6 }}>
      <AppBreadcrumbs items={[{ label: 'Trang chủ', to: '/' }]} />
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
        <Button variant="contained" color="success" onClick={() => nav('/test-api')}>
          test api
        </Button>
         <Button variant="contained" color="success" onClick={() => nav('/kitchen')}>
          Bếp
        </Button>
      </Stack>
    </Container>
  );
}
