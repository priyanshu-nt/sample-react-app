import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../../../setupTests';
import OrdersTable from '../OrdersTable';

// Mock date-fns to ensure consistent date formatting in tests
jest.mock('date-fns', () => {
  const actual = jest.requireActual('date-fns');
  return {
    ...actual,
    format: jest.fn((date, formatStr) => {
      if (!date) return '—';
      return actual.format(date, formatStr);
    }),
  };
});

describe('OrdersTable Component', () => {
  test('renders table with headers', () => {
    render(<OrdersTable />);
    
    // Check that all column headers are present
    expect(screen.getByRole('columnheader', { name: /status/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /data utworzenia/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /data aktualizacji/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /numer zamówienia/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /dokument/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /termin płatności/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /wartość/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /akcje/i })).toBeInTheDocument();
  });

  test('renders order data correctly', () => {
    render(<OrdersTable />);
    
    // Check that sample orders are displayed with correct order numbers
    expect(screen.getByText('ZAM/2024/04/001')).toBeInTheDocument();
    expect(screen.getByText('ZAM/2024/04/002')).toBeInTheDocument();
    expect(screen.getByText('ZAM/2024/04/003')).toBeInTheDocument();
  });

  test('expands row when clicking on expand icon', async () => {
    render(<OrdersTable />);
    
    // The detail panel should not be visible initially
    expect(screen.queryByText('Szczegóły zamówienia')).not.toBeInTheDocument();
    
    // Click on the first row's expand button
    const expandButtons = screen.getAllByRole('button', { name: /expand row/i });
    await userEvent.click(expandButtons[0]);
    
    // After clicking, the details panel should be visible
    await waitFor(() => {
      expect(screen.getByText('Szczegóły zamówienia')).toBeInTheDocument();
      expect(screen.getByText('Firma ABC Sp. z o.o.')).toBeInTheDocument();
      expect(screen.getByText('Produkt A')).toBeInTheDocument();
      expect(screen.getByText('Produkt B')).toBeInTheDocument();
    });
  });

  test('pagination works correctly', async () => {
    render(<OrdersTable />);
    
    // Get pagination elements
    const rowsPerPageSelect = screen.getByLabelText(/wierszy na stronie/i);
    
    // Change rows per page to 5
    await userEvent.click(rowsPerPageSelect);
    await userEvent.click(screen.getByRole('option', { name: '5' }));
    
    // The text should change to indicate pagination
    expect(screen.getByText(/1-3 z 3/i)).toBeInTheDocument(); // Assuming we have 3 sample orders
  });
});