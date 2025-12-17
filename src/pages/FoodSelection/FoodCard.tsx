import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Stack,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FoodItem } from '../../types';

const price = new Intl.NumberFormat('vi-VN');

export default function FoodCard({
  item,
  onAdd,
}: {
  item: FoodItem;
  onAdd: () => void;
}) {
  return (
    <Card sx={{
      display: 'flex',
      alignItems: 'center',
      p: 1,
      '&:hover': {
        boxShadow: 6,
        transform: 'translateY(-2px)',
      },
    }} className={`food-card ${item.isAvailable === false ? 'disabled' : ''}`}>
      <CardMedia
        component="img"
        sx={{ width: 88, height: 88 }}
        image={item.image || '/placeholder.png'}
        alt={item.name}
      />
      <CardContent sx={{ flex: 1, py: 0}}>
        <Typography className="food-title">{item.name}</Typography>
        <Typography className="food-sub">
          {item.kcal && `${item.kcal} kcal`} {item.nameEn && `· ${item.nameEn}`}
        </Typography>

        <Stack direction="row" spacing={1} mt={1}>
          {item.badges?.map(b => (
            <Chip key={b} label={b} size="small"
              sx={{
                fontSize: 11,
                height: 22,
                bgcolor: 'warning.light',
                color:  '#000000',
              }} />
          ))}
        </Stack>
      </CardContent>

      <Stack alignItems="flex-end" pr={1}>
        <Typography className="food-price" color="success.main"
          fontWeight={700}
          fontSize={15}>
          {price.format(item.price)} ₫
        </Typography>
        <IconButton
          color="success"
          disabled={item.isAvailable === false}
          onClick={onAdd}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}
