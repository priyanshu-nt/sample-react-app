import { Box, Container, Typography } from '@mui/material';
import OrderFilters, { type OrderFilters as OrderFiltersType } from './OrderFilters';
import OrdersTable from './OrdersTable';

export default function Orders() {
  const handleFilterChange = (filters: OrderFiltersType) => {
    console.log('Filters changed:', filters);
    // Here you would typically call an API or filter data locally
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Zamówienia
        </Typography>
      </Box>

      <OrderFilters onFilterChange={handleFilterChange} />
      <OrdersTable />
    </Container>
  );
}