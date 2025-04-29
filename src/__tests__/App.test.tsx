import { render, screen } from '@testing-library/react';
import App from '../App';
import '../setupTests';

// Mock the Orders component to simplify testing
jest.mock('../components/orders/Orders', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="orders-component">Orders Component Content</div>
  };
});

describe('App Component', () => {
  test('renders the Orders component', () => {
    render(<App />);
    
    // Check that the Orders component is rendered
    expect(screen.getByTestId('orders-component')).toBeInTheDocument();
  });
});