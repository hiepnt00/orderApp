import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Category } from '../../types';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'special', label: 'Đặc biệt' },
  { id: 'bunpho', label: 'Bún / Phở' },
  { id: 'banhmi', label: 'Bánh mì' },
];

export default function CategoryTabs({
  value,
  onChange,
}: {
  value: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <ToggleButtonGroup
      className="category-tabs"
      value={value}
      exclusive
      onChange={(_, v) => v && onChange(v)}
      sx={{
    bgcolor: 'background.paper',
    p: 0.5,
    borderRadius: 99,
    boxShadow: 1,
    '& .MuiToggleButton-root': {
      border: 0,
      borderRadius: 99,
      px: 2,
      textTransform: 'none',
    },
  }}
    >
      {CATEGORIES.map(c => (
        <ToggleButton key={c.id} value={c.id}>
          {c.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
