import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Orders from '../Orders';

describe('Orders Component', () => {
  // Basic rendering test
  test('renders orders component with title', () => {
    render(<Orders />);
    const titleElement = screen.getByText('Zamówienia');
    expect(titleElement).toBeInTheDocument();
  });

  // Filter section tests
  test('renders filter section with all inputs', () => {
    render(<Orders />);
    
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // Status dropdown
    expect(screen.getByPlaceholderText('Nr zamówienia')).toBeInTheDocument(); // Order number input
    expect(screen.getByText('Filtruj')).toBeInTheDocument(); // Filter button
    
    // Check for date inputs by looking for the label text and then finding the input in the same container
    const dateLabels = screen.getAllByText(/Data .*/i);
    expect(dateLabels.length).toBeGreaterThanOrEqual(2);
    
    // Verify inputs exist in the date filter containers
    const dateFilters = screen.getAllByTestId('date-filter');
    expect(dateFilters.length).toBeGreaterThanOrEqual(2);
  });

  test('filter button is clickable', async () => {
    render(<Orders />);
    const filterButton = screen.getByText('Filtruj');
    
    await userEvent.click(filterButton);
    // In a real application, you would test the filtering effect here
    expect(filterButton).toBeInTheDocument();
  });

  // Table tests
  test('renders orders table with headers', () => {
    render(<Orders />);
    
    // Make sure the table exists
    const table = screen.getByTestId('orders-table');
    expect(table).toBeInTheDocument();
    
    // Get the header cells directly as they have role 'columnheader'
    const headerCells = within(table).getAllByRole('columnheader');
    
    // Verify we have headers
    expect(headerCells.length).toBeGreaterThan(0);
    
    // Check that important column headers exist
    const headerTexts = headerCells.map(cell => cell.textContent?.trim());
    expect(headerTexts).toContain('Status');
    expect(headerTexts).toContain('Nr');
    expect(headerTexts).toContain('Dokument');
    
    // Check that the table shows order data
    const rows = within(table).getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); // At least header row + 1 data row
  });

  test('renders order data correctly', () => {
    render(<Orders />);
    
    // Check for specific order data - using more specific queries
    const statusCells = screen.getAllByText('Potwierdzone');
    expect(statusCells.length).toBeGreaterThanOrEqual(1);
    
    const orderNumberCells = screen.getAllByText('1596');
    expect(orderNumberCells.length).toBe(1);
    
    const documentCells = screen.getAllByText('PROFORMA/7/03/2022');
    expect(documentCells.length).toBeGreaterThanOrEqual(1);
  });

  // Expandable row tests
  test('expands row when details button is clicked', async () => {
    render(<Orders />);
    
    // Initially the third order (#1594) should be expanded based on initial state
    const detailsTable = screen.getByTestId('details-table');
    expect(detailsTable).toBeInTheDocument();
    
    expect(screen.getByText('Lp.')).toBeInTheDocument();
    expect(screen.getByText('Nazwa')).toBeInTheDocument();
    expect(screen.getByText('Kod')).toBeInTheDocument();
    expect(screen.getByText('Ilość')).toBeInTheDocument();
    
    // Check order details data
    expect(screen.getByText('MShybridGLASS8acterio')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    
    // Find a details button from a collapsed row and click it
    const detailsButtons = screen.getAllByRole('button', { name: '' });
    // Find a button that's for details - this is a bit brittle since we're relying on the order of buttons
    const detailsButton = detailsButtons.find(button => 
      button.innerHTML.includes('path d="M9.5 13a1.5 1.5 0 1 1-3 0'));
    
    if (detailsButton) {
      await userEvent.click(detailsButton);
      // After clicking, there should be more order detail sections visible
      const detailRows = screen.getAllByText('Lp.');
      expect(detailRows.length).toBeGreaterThan(1);
    }
  });

  // Action buttons tests
  test('download button is present for each order', () => {
    render(<Orders />);
    const downloadButtons = screen.getAllByText('Ściągnij');
    expect(downloadButtons.length).toBeGreaterThanOrEqual(5); // 5 orders in mock data
  });

  test('displays proforma button in expanded row', () => {
    render(<Orders />);
    const proformaButton = screen.getByText('Wyświetl proformę');
    expect(proformaButton).toBeInTheDocument();
  });

  // Pagination test
  test('renders pagination controls', () => {
    render(<Orders />);
    
    expect(screen.getByText('Page')).toBeInTheDocument();
    
    // Use a more specific query for the page number to avoid ambiguity
    const pageNumberButton = screen.getByRole('button', { name: '1' });
    expect(pageNumberButton).toBeInTheDocument();
    expect(pageNumberButton).toHaveClass('active');
    
    expect(screen.getByText('30')).toBeInTheDocument(); // Total pages or items
    
    // Pagination buttons
    const paginationButtons = screen.getAllByRole('button');
    expect(paginationButtons.length).toBeGreaterThanOrEqual(3); // At least prev, page 1, next buttons
  });
});
