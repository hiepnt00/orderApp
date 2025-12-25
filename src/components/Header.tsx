import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Header() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar
        sx={{
          flexDirection: 'column',
          alignItems: 'stretch',
          py: 1,
        }}
      >
        {/* Top row */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <RestaurantIcon color="inherit" />
            <Typography fontWeight={700} fontSize={18}>
              Food Order
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton color="inherit">
              <SearchIcon color="inherit" />
            </IconButton>
            <Button color="inherit" component={RouterLink} to="/payment-history">
              Lịch sử
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Đăng nhập
            </Button>
          </Box>
        </Box>

        {/* Subtitle / location */}
        <Typography
          variant="caption"
          sx={{ opacity: 0.9, mt: 0.5 }}
        >
          📍 Dịa chỉ: Tây hồ, TP.HN
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
