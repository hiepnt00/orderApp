import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Box, alpha } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';

interface KitchenOrderCardProps {
  order: {
    id: string;
    table: string;
    items: Array<{ id: string; qty: number; note?: string }>;
    total: number;
    status: string;
    createdAt: string;
  };
  getItemName: (id: string) => string;
}

export default function KitchenOrderCard({ order, getItemName }: KitchenOrderCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: order.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={(theme) => {
        const accentMap: Record<string, string> = {
          received: theme.palette.info.main,
          in_progress: theme.palette.warning.main,
          completed: theme.palette.success.main,
        };
        const accent = accentMap[order.status] ?? theme.palette.divider;
        return {
          p: 1,
          cursor: 'grab',
          '&:active': { cursor: 'grabbing' },
          borderRadius: 1,
          boxShadow: 1,
          minWidth: 140,
          borderLeft: `4px solid ${alpha(accent, 0.9)}`,
          bgcolor: alpha(accent, 0.12),
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3,
          },
        } as any;
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1 }}>
        #{order.id}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        Bàn: {order.table} • {new Date(order.createdAt).toLocaleTimeString('vi-VN')}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <List dense>
          {order.items.map((item, index) => (
            <ListItem key={index} sx={{ py: 0.25, px: 0 }}>
              <ListItemText
                primary={`${item.qty} × ${getItemName(item.id)}`}
                secondary={item.note ? `Ghi chú: ${item.note}` : undefined}
                primaryTypographyProps={{ variant: 'body2', sx: { fontSize: '0.85rem' } }}
                secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}