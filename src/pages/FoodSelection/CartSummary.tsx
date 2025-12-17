import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Button,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const price = new Intl.NumberFormat('vi-VN');

export default function CartSummary({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  const { state, dispatch } = useCart();
  const nav = useNavigate();

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const total = state.items.reduce(
    (s, i) => s + i.quantity * i.item.price,
    0
  );

  if (!totalItems) return null;

  return (
    <Paper
      className={`cart-summary-panel ${expanded ? 'expanded' : ''}`}
      elevation={10}
    >
      {/* Header */}
      <Box
        className="cart-summary-header"
        onClick={onToggle}
      >
        <Box>
          <Typography fontWeight={600}>
            Giỏ hàng ({totalItems} món)
          </Typography>
          <Typography color="success.main" fontWeight={700}>
            {price.format(total)} ₫
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={(e) => {
              e.stopPropagation();
              nav('/checkout');
            }}
          >
            Thanh toán
          </Button>

          <IconButton>
            {expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </Stack>
      </Box>

      {/* Expanded content */}
      {expanded && (
        <Box className="cart-summary-content">
          <Stack spacing={2}>
            {state.items.map(ci => (
              <Stack
                key={ci.item.id}
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                {/* Image */}
                <Box
                  component="img"
                  src={ci.item.image}
                  alt={ci.item.name}
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 1,
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />

                {/* Info */}
                <Box flex={1} minWidth={0}>
                  <Typography
                    fontWeight={500}
                    noWrap
                  >
                    {ci.item.name}
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    mt={0.5}
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        dispatch({
                          type: 'QTY',
                          id: ci.item.id,
                          qty: ci.quantity - 1,
                        })
                      }
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography minWidth={20} textAlign="center">
                      {ci.quantity}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() =>
                        dispatch({
                          type: 'QTY',
                          id: ci.item.id,
                          qty: ci.quantity + 1,
                        })
                      }
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>

                {/* Price */}
                <Typography
                  fontWeight={600}
                  whiteSpace="nowrap"
                >
                  {price.format(ci.item.price)} ₫
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

    </Paper>
  );
}
