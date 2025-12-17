import {
  Drawer,
  Stack,
  Typography,
  IconButton,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../hooks/useCart';

const price = new Intl.NumberFormat('vi-VN');

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, dispatch } = useCart();

  const total = state.items.reduce((s, i) => s + i.quantity * i.item.price, 0);

  return (
    <Drawer anchor="right" className="cart-drawer" open={open} onClose={onClose}>
      <Stack width={360} p={2} spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={600}>Giỏ hàng</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {state.items.map(ci => (
          <Stack key={ci.item.id} spacing={1}>
            <Typography fontWeight={500}>{ci.item.name}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => dispatch({ type: 'QTY', id: ci.item.id, qty: ci.quantity - 1 })}>
                <RemoveIcon />
              </IconButton>
              <Typography>{ci.quantity}</Typography>
              <IconButton onClick={() => dispatch({ type: 'QTY', id: ci.item.id, qty: ci.quantity + 1 })}>
                <AddIcon />
              </IconButton>
              <Typography ml="auto">{price.format(ci.item.price)} ₫</Typography>
            </Stack>

            <TextField
              size="small"
              placeholder="Ghi chú"
              value={ci.note || ''}
              onChange={e =>
                dispatch({ type: 'NOTE', id: ci.item.id, note: e.target.value })
              }
            />
          </Stack>
        ))}

        <TextField
          label="Số bàn"
          size="small"
          value={state.tableCode}
          inputProps={{ maxLength: 6 }}
          onChange={e => dispatch({ type: 'TABLE', table: e.target.value })}
        />

        <RadioGroup
          value={state.paymentMethod}
          onChange={e =>
            dispatch({ type: 'PAYMENT', method: e.target.value as any })
          }
        >
          <FormControlLabel value="CASH" control={<Radio />} label="Tiền mặt" />
          <FormControlLabel value="CARD" control={<Radio />} label="Quẹt thẻ" />
          <FormControlLabel value="TRANSFER" control={<Radio />} label="Chuyển khoản" />
        </RadioGroup>

        <Typography fontWeight={600}>Tổng: {price.format(total)} ₫</Typography>

        <Button
          variant="contained"
          color="success"
          onClick={() => {
            console.log('ORDER PAYLOAD', state);
            dispatch({ type: 'CLEAR' });
            onClose();
            alert('Đặt hàng thành công (mock)');
          }}
          disabled={!state.items.length}
        >
          Xác nhận
        </Button>
      </Stack>
    </Drawer>
  );
}
