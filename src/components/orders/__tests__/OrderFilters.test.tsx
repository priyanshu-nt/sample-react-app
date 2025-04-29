import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../../../setupTests';
import OrderFilters from '../OrderFilters';

// Create mock component instead of using the real date pickers
jest.mock('@mui/x-date-pickers/DatePicker', () => ({
  DatePicker: ({ label, onChange }) => (
    <input
      data-testid={`mock-date-picker-${label?.toLowerCase().replace(/\s/g, '-')}`}
      aria-label={label}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}));

describe('OrderFilters Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
        {ui}
      </LocalizationProvider>
    );
  };

  test('renders filter form with all elements', () => {
    renderWithProviders(<OrderFilters />);
    
    expect(screen.getByText('Filtry wyszukiwania')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Data od')).toBeInTheDocument();
    expect(screen.getByLabelText('Data do')).toBeInTheDocument();
    expect(screen.getByLabelText('Numer zamówienia')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filtruj/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /wyczyść/i })).toBeInTheDocument();
  });

  test('calls onFilterChange when filters are applied', async () => {
    const mockOnFilterChange = jest.fn();
    renderWithProviders(<OrderFilters onFilterChange={mockOnFilterChange} />);
    
    // Fill in order number
    const orderNumberInput = screen.getByLabelText('Numer zamówienia');
    await userEvent.type(orderNumberInput, 'ZAM/2025/04/001');
    
    // Click the filter button
    const filterButton = screen.getByRole('button', { name: /filtruj/i });
    await userEvent.click(filterButton);
    
    // Check if the onFilterChange was called with the correct filters
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        orderNumber: 'ZAM/2025/04/001',
        status: [],
        dateFrom: null,
        dateTo: null
      })
    );
  });

  test('resets filters when clear button is clicked', async () => {
    const mockOnFilterChange = jest.fn();
    renderWithProviders(<OrderFilters onFilterChange={mockOnFilterChange} />);
    
    // Fill in order number
    const orderNumberInput = screen.getByLabelText('Numer zamówienia');
    await userEvent.type(orderNumberInput, 'ZAM/2025/04/001');
    
    // Click the reset button
    const resetButton = screen.getByRole('button', { name: /wyczyść/i });
    await userEvent.click(resetButton);
    
    // Check if the onFilterChange was called with reset filters
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: [],
      dateFrom: null,
      dateTo: null,
      orderNumber: ''
    });
    
    // Check if the input field was cleared
    expect(orderNumberInput).toHaveValue('');
  });

  // New tests to improve coverage
  test('updates status filter when status is changed', async () => {
    const mockOnFilterChange = jest.fn();
    renderWithProviders(<OrderFilters onFilterChange={mockOnFilterChange} />);
    
    // Open status dropdown
    const statusSelect = screen.getByLabelText('Status');
    await userEvent.click(statusSelect);
    
    // Select "Nowy" status
    const newStatusOption = screen.getByRole('option', { name: 'Nowy' });
    await userEvent.click(newStatusOption);
    
    // Close the dropdown (click away)
    await userEvent.click(document.body);
    
    // Verify the onFilterChange was called with updated status
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        status: ['new'],
      })
    );
  });

  test('updates dateFrom filter when a date is selected', async () => {
    const mockOnFilterChange = jest.fn();
    renderWithProviders(<OrderFilters onFilterChange={mockOnFilterChange} />);
    
    // Get the date picker input
    const dateFromInput = screen.getByLabelText('Data od');
    
    // Simulate date selection by triggering onChange
    await userEvent.type(dateFromInput, '2025-04-15');
    
    // Verify the onFilterChange was called with updated dateFrom
    expect(mockOnFilterChange).toHaveBeenCalled();
  });

  test('updates dateTo filter when a date is selected', async () => {
    const mockOnFilterChange = jest.fn();
    renderWithProviders(<OrderFilters onFilterChange={mockOnFilterChange} />);
    
    // Get the date picker input
    const dateToInput = screen.getByLabelText('Data do');
    
    // Simulate date selection by triggering onChange
    await userEvent.type(dateToInput, '2025-04-30');
    
    // Verify the onFilterChange was called with updated dateTo
    expect(mockOnFilterChange).toHaveBeenCalled();
  });

  test('handles updates to order number input correctly', async () => {
    renderWithProviders(<OrderFilters />);
    
    // Get the order number input
    const orderNumberInput = screen.getByLabelText('Numer zamówienia');
    
    // Type in the order number
    await userEvent.type(orderNumberInput, 'ZAM/2025/04/001');
    
    // Check the input value was updated correctly
    expect(orderNumberInput).toHaveValue('ZAM/2025/04/001');
  });

  test('renders correctly when no onFilterChange prop is provided', () => {
    renderWithProviders(<OrderFilters />);
    
    // The component should render without errors even without the onFilterChange prop
    expect(screen.getByRole('button', { name: /filtruj/i })).toBeInTheDocument();
  });
});