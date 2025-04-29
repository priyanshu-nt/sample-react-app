import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import '../../../setupTests';
import Orders from '../Orders';

// Mock the child components to simplify testing
jest.mock('../OrderFilters', () => {
  return {
    __esModule: true,
    default: ({ onFilterChange }: { onFilterChange: (filters: { status: string[]; dateFrom: Date | null; dateTo: Date | null; orderNumber: string }) => void }) => (
      <div data-testid="order-filters">
        <button 
          onClick={() => onFilterChange({ status: ['new'], dateFrom: null, dateTo: null, orderNumber: 'TEST-123' })}
        >
          Mock Filter Button
        </button>
      </div>
    )
  };
});

jest.mock('../OrdersTable', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="orders-table">Orders Table Content</div>
  };
});

describe('Orders Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
          {ui}
        </LocalizationProvider>
      </ThemeProvider>
    );
  };

  test('renders header and both subcomponents', () => {
    renderWithProviders(<Orders />);
    
    // Check for the title
    expect(screen.getByRole('heading', { name: /zamówienia/i })).toBeInTheDocument();
    
    // Check that both subcomponents are rendered
    expect(screen.getByTestId('order-filters')).toBeInTheDocument();
    expect(screen.getByTestId('orders-table')).toBeInTheDocument();
  });

  test('handles filter changes correctly', () => {
    // We'll use a spy to monitor console.log since that's where our filter changes are logged
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    renderWithProviders(<Orders />);
    
    // Trigger the mock filter change
    screen.getByText('Mock Filter Button').click();
    
    // Verify that console.log was called with the expected filters
    expect(consoleSpy).toHaveBeenCalledWith('Filters changed:', {
      status: ['new'],
      dateFrom: null,
      dateTo: null,
      orderNumber: 'TEST-123'
    });
    
    // Clean up
    consoleSpy.mockRestore();
  });
});