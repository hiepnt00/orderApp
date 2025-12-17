import {
  Container,
  Typography,
  Stack,
  Paper,
  Divider,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const price = new Intl.NumberFormat('vi-VN');

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const nav = useNavigate();

  const total = state.items.reduce(
    (s, i) => s + i.quantity * i.item.price,
    0
  );

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Thanh toán
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography fontWeight={600}>Món đã chọn</Typography>
        <Divider sx={{ my: 1 }} />

        <Stack spacing={1}>
          {state.items.map(ci => (
            <Stack
              key={ci.item.id}
              direction="row"
              justifyContent="space-between"
            >
              <Typography>
                {ci.item.name} × {ci.quantity}
              </Typography>
              <Typography>
                {price.format(ci.item.price * ci.quantity)} ₫
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography fontWeight={600}>Thông tin bàn</Typography>
        <TextField
          fullWidth
          size="small"
          margin="dense"
          value={state.tableCode}
          onChange={e =>
            dispatch({ type: 'TABLE', table: e.target.value })
          }
        />
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography fontWeight={600}>Phương thức thanh toán</Typography>
        <RadioGroup
          value={state.paymentMethod}
          onChange={e =>
            dispatch({
              type: 'PAYMENT',
              method: e.target.value as any,
            })
          }
        >
          <FormControlLabel value="CASH" control={<Radio />} label="Tiền mặt" />
          <FormControlLabel value="CARD" control={<Radio />} label="Thẻ" />
          <FormControlLabel value="TRANSFER" control={<Radio />} label="Chuyển khoản" />
        </RadioGroup>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography fontWeight={600}>Tổng cộng</Typography>
          <Typography fontWeight={700} color="success.main">
            {price.format(total)} ₫
          </Typography>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={() => {
            console.log('ORDER', state);
            dispatch({ type: 'CLEAR' });
            nav('/');
            alert('Đặt hàng thành công (mock)');
          }}
        >
          Xác nhận đặt hàng
        </Button>
      </Paper>
    </Container>
  );
}
