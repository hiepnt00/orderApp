import { Container, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import { MENU } from '../../mocks/menu';
import { Category } from '../../types';
import CartSummary from './CartSummary';
import CartDrawer from './CartDrawer';
import { useCart } from '../../hooks/useCart';
import CategoryTabs from './CategoryTabs';
import FoodCard from './FoodCard';
import AppBreadcrumbs from '../../components/AppBreadcrumbs';

export default function FoodSelection() {
  const [category, setCategory] = useState<Category>('all');
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { dispatch } = useCart();

  const items = useMemo(
    () =>
      MENU.filter(i => category === 'all' || i.category === category),
    [category]
  );

  return (
    <>
      <Container sx={{ py: 2, mb: 12, mt: 2 }}>
        <AppBreadcrumbs items={[{ label: 'Trang chủ', to: '/' }, { label: 'Chọn món' }]} />
        <CategoryTabs value={category} onChange={setCategory} />
        <Stack spacing={2} mt={2}>
          {items.map(i => (
            <FoodCard key={i.id} item={i} onAdd={() => dispatch({ type: 'ADD', item: i })} />
          ))}
        </Stack>
      </Container>

      <CartSummary expanded={expanded}
        onToggle={() => setExpanded(v => !v)} />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
