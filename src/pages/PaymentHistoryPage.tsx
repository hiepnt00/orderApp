import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AppBreadcrumbs from '../components/AppBreadcrumbs';
import { MENU } from '../mocks/menu';

const price = new Intl.NumberFormat('vi-VN');

const statusLabels: Record<string, string> = {
  pending: 'Chờ xử lý',
  received: 'Đã nhận đơn',
  in_progress: 'Đang thực hiện',
  completed: 'Đã hoàn thành',
  cancelled: 'Đã hủy',
};

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  pending: 'warning',
  received: 'info',
  in_progress: 'primary',
  completed: 'success',
  cancelled: 'error',
};

export default function PaymentHistoryPage() {
  const orders = useSelector((state: RootState) => state.orders);

  // Filter only completed orders for payment history
  const completedOrders = orders.listAllOrders.filter(order => order.status === 'completed');

  const getItemName = (id: string) => {
    const item = MENU.find(m => m.id === id);
    return item ? item.name : `Món ${id}`;
  };

  const getItemPrice = (id: string) => {
    const item = MENU.find(m => m.id === id);
    return item ? item.price : 0;
  };

  return (
    <Container sx={{ py: 2 }}>
      <AppBreadcrumbs items={[{ label: 'Trang chủ', to: '/' }, { label: 'Lịch sử thanh toán' }]} />
      <Typography variant="h6" fontWeight={700} mb={2}>
        Lịch sử thanh toán
      </Typography>

      {completedOrders.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Chưa có đơn hàng nào đã thanh toán.</Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {completedOrders.map((order) => (
            <Paper key={order.id} sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" fontWeight={600}>
                  Đơn hàng #{order.id}
                </Typography>
                <Chip
                  label={statusLabels[order.status]}
                  color={statusColors[order.status]}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Bàn: {order.table} | Thời gian: {new Date(order.createdAt).toLocaleString('vi-VN')}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography fontWeight={600} mb={1}>Chi tiết món ăn:</Typography>
              <List dense>
                {order.items.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText
                      primary={`${item.qty} × ${getItemName(item.id)}`}
                      secondary={`Đơn giá: ${price.format(getItemPrice(item.id))} ₫ | Tổng: ${price.format(getItemPrice(item.id) * item.qty)} ₫`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontWeight={600}>Tổng tiền:</Typography>
                <Typography fontWeight={600} color="primary">
                  {price.format(order.total)} ₫
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  );
}