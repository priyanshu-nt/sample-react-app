import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import type { SelectChangeEvent } from '@mui/material';
import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/pl';
import { useState } from 'react';

interface OrderFiltersProps {
  onFilterChange?: (filters: OrderFilters) => void;
}

export interface OrderFilters {
  status: string[];
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
  orderNumber: string;
}

const STATUSES = [
  { value: 'new', label: 'Nowy' },
  { value: 'processing', label: 'W realizacji' },
  { value: 'completed', label: 'Zrealizowany' },
  { value: 'cancelled', label: 'Anulowany' }
];

export default function OrderFilters({ onFilterChange }: OrderFiltersProps) {
  const [filters, setFilters] = useState<OrderFilters>({
    status: [],
    dateFrom: null,
    dateTo: null,
    orderNumber: ''
  });

  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    const updatedFilters = { ...filters, status: value };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleDateFromChange = (newDate: Dayjs | null) => {
    const updatedFilters = { ...filters, dateFrom: newDate };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleDateToChange = (newDate: Dayjs | null) => {
    const updatedFilters = { ...filters, dateTo: newDate };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleOrderNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters, orderNumber: event.target.value };
    setFilters(updatedFilters);
  };

  const handleSearch = () => {
    if (onFilterChange) onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      status: [],
      dateFrom: null,
      dateTo: null,
      orderNumber: ''
    };
    setFilters(resetFilters);
    if (onFilterChange) onFilterChange(resetFilters);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
          <Box sx={{ gridColumn: 'span 12' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Filtry wyszukiwania
            </Typography>
          </Box>
          
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 3' } }}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                multiple
                value={filters.status}
                onChange={handleStatusChange}
                input={<OutlinedInput label="Status" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip 
                        key={value} 
                        label={STATUSES.find(status => status.value === value)?.label} 
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {STATUSES.map(status => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 3' } }}>
            <DatePicker
              label="Data od"
              value={filters.dateFrom}
              onChange={handleDateFromChange}
              slotProps={{
                textField: { fullWidth: true }
              }}
            />
          </Box>
          
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 3' } }}>
            <DatePicker
              label="Data do"
              value={filters.dateTo}
              onChange={handleDateToChange}
              slotProps={{
                textField: { fullWidth: true }
              }}
            />
          </Box>
          
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 3' } }}>
            <TextField
              fullWidth
              label="Numer zamówienia"
              variant="outlined"
              value={filters.orderNumber}
              onChange={handleOrderNumberChange}
            />
          </Box>
          
          <Box sx={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'flex-end' }}>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="outlined" 
                startIcon={<RestartAltIcon />}
                onClick={handleReset}
              >
                Wyczyść
              </Button>
              <Button 
                variant="contained" 
                startIcon={<FilterAltIcon />}
                onClick={handleSearch}
              >
                Filtruj
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}