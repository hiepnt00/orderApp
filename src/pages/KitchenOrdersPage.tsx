import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Button,
  Breadcrumbs,
} from '@mui/material';
import MuiLink from '@mui/material/Link'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateOrderStatus } from '../store/ordersSlice';
import { MENU } from '../mocks/menu';
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core';
import KitchenOrderCard from '../components/KitchenOrderCard';
import AppBreadcrumbs from '../components/AppBreadcrumbs';

const price = new Intl.NumberFormat('vi-VN');

const statusLabels: Record<string, string> = {
  received: 'Danh sách đơn',
  in_progress: 'Đang làm',
  completed: 'Đã phục vụ',
};

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  received: 'info',
  in_progress: 'warning',
  completed: 'success',
};

type ColumnId = 'received' | 'in_progress' | 'completed';

export default function KitchenOrdersPage() {
  const orders = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function Column({ columnId, ordersInColumn }: { columnId: ColumnId; ordersInColumn: typeof orders }) {
    const { setNodeRef, isOver } = useDroppable({ id: columnId });

    return (
      <Paper
        ref={setNodeRef}
        sx={{
          flex: 1,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: isOver ? 'action.hover' : undefined,
        }}
      >
        <Typography variant="subtitle2" fontWeight={700} mb={1} textAlign="center">
          {statusLabels[columnId]}
          <Chip
            label={ordersInColumn.length}
            color={statusColors[columnId]}
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Stack spacing={0.5}>
            {ordersInColumn.map((order) => (
              <KitchenOrderCard key={order.id} order={order} getItemName={getItemName} />
            ))}
          </Stack>
        </Box>
      </Paper>
    );
  }

  const getItemName = (id: string) => {
    const item = MENU.find(m => m.id === id);
    return item ? item.name : `Món ${id}`;
  };

  const columns: Record<ColumnId, typeof orders> = {
    received: orders.filter(order => order.status === 'received'),
    in_progress: orders.filter(order => order.status === 'in_progress'),
    completed: orders.filter(order => order.status === 'completed'),
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const orderId = active.id as string;
    const newStatus = over.id as ColumnId;

    // Nếu thả vào cùng cột, không làm gì
    const currentOrder = orders.find(o => o.id === orderId);
    if (!currentOrder || currentOrder.status === newStatus) return;

    // Cập nhật status
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const activeOrder = activeId ? orders.find(o => o.id === activeId) : null;

  return (
    <Box sx={{ position: 'relative', left: 'calc(50% - 50vw)', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBreadcrumbs items={[{ label: 'Trang chủ', to: '/' }, { label: 'Bếp' }]} />
      <Box sx={{ flex: 1, p: 2, overflow: 'hidden' }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Box sx={{ display: 'flex', height: '100%', gap: 2 }}>
            {(Object.keys(columns) as ColumnId[]).map((columnId) => (
              <Column key={columnId} columnId={columnId} ordersInColumn={columns[columnId]} />
            ))}
          </Box>
          <DragOverlay>
            {activeOrder ? (
              <Paper sx={{ p: 2, minWidth: 300 }}>
                <Typography variant="h6">Đơn #{activeOrder.id}</Typography>
                <Typography>Bàn: {activeOrder.table}</Typography>
                <List dense>
                  {activeOrder.items.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0 }}>
                      <ListItemText primary={`${item.qty} × ${getItemName(item.id)}`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Box>
    </Box>
  );
}