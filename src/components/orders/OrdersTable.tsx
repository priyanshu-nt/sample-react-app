import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Chip,
    Collapse,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';

// Define the Order type based on the UI
interface Order {
  id: number;
  number: string;
  status: 'new' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  customer: string;
  documentNumber: string;
  paymentDate: Date | null;
  value: number;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Sample data for displaying in the table
const sampleOrders: Order[] = [
  {
    id: 1,
    number: 'ZAM/2024/04/001',
    status: 'new',
    createdAt: new Date(2024, 3, 15, 12, 30),
    updatedAt: new Date(2024, 3, 15, 12, 30),
    customer: 'Firma ABC Sp. z o.o.',
    documentNumber: 'FV/2024/04/001',
    paymentDate: new Date(2024, 4, 15),
    value: 1250.75,
    items: [
      { id: 1, name: 'Produkt A', quantity: 2, unitPrice: 100.00, total: 200.00 },
      { id: 2, name: 'Produkt B', quantity: 1, unitPrice: 1050.75, total: 1050.75 }
    ]
  },
  {
    id: 2,
    number: 'ZAM/2024/04/002',
    status: 'processing',
    createdAt: new Date(2024, 3, 16, 9, 15),
    updatedAt: new Date(2024, 3, 16, 14, 45),
    customer: 'Jan Kowalski',
    documentNumber: 'FV/2024/04/002',
    paymentDate: null,
    value: 450.00,
    items: [
      { id: 3, name: 'Produkt C', quantity: 3, unitPrice: 150.00, total: 450.00 }
    ]
  },
  {
    id: 3,
    number: 'ZAM/2024/04/003',
    status: 'completed',
    createdAt: new Date(2024, 3, 14, 11, 0),
    updatedAt: new Date(2024, 3, 17, 10, 30),
    customer: 'Firma XYZ Sp. z o.o.',
    documentNumber: 'FV/2024/04/003',
    paymentDate: new Date(2024, 3, 17),
    value: 3200.50,
    items: [
      { id: 4, name: 'Produkt D', quantity: 1, unitPrice: 3200.50, total: 3200.50 }
    ]
  }
];

// Row component for expandable rows
function Row(props: { order: Order }) {
  const { order } = props;
  const [open, setOpen] = useState(false);

  // Status color mapping
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'info';
      case 'processing': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  // Status label mapping (Polish)
  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'Nowy';
      case 'processing': return 'W realizacji';
      case 'completed': return 'Zrealizowany';
      case 'cancelled': return 'Anulowany';
      default: return '';
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '—';
    return format(date, 'dd.MM.yyyy');
  };

  const formatDateTime = (date: Date) => {
    return format(date, 'dd.MM.yyyy HH:mm');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pl-PL', { 
      style: 'currency', 
      currency: 'PLN' 
    }).format(value);
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Chip 
            label={getStatusLabel(order.status)} 
            color={getStatusColor(order.status) as "info" | "warning" | "success" | "error" | "default"}
            size="small"
          />
        </TableCell>
        <TableCell>{formatDateTime(order.createdAt)}</TableCell>
        <TableCell>{formatDateTime(order.updatedAt)}</TableCell>
        <TableCell>{order.number}</TableCell>
        <TableCell>{order.documentNumber}</TableCell>
        <TableCell>{formatDate(order.paymentDate)}</TableCell>
        <TableCell align="right">{formatCurrency(order.value)}</TableCell>
        <TableCell>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" color="primary">
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="subtitle1" gutterBottom component="div">
                Szczegóły zamówienia
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Klient:</strong> {order.customer}
                </Typography>
              </Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Produkt</TableCell>
                    <TableCell align="right">Ilość</TableCell>
                    <TableCell align="right">Cena jedn.</TableCell>
                    <TableCell align="right">Wartość</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell align="right">{formatCurrency(item.total)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} />
                    <TableCell align="right"><strong>Razem:</strong></TableCell>
                    <TableCell align="right"><strong>{formatCurrency(order.value)}</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function OrdersTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Status</TableCell>
              <TableCell>Data utworzenia</TableCell>
              <TableCell>Data aktualizacji</TableCell>
              <TableCell>Numer zamówienia</TableCell>
              <TableCell>Dokument</TableCell>
              <TableCell>Termin płatności</TableCell>
              <TableCell align="right">Wartość</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <Row key={order.id} order={order} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sampleOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Wierszy na stronie:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
      />
    </Paper>
  );
}