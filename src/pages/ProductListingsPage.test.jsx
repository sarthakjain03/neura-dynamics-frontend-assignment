import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductListingsPage from './ProductListingsPage';

// Mock the custom hooks
jest.mock('../hooks/useDebounce', () => ({
  __esModule: true,
  default: jest.fn((value) => value),
}));

jest.mock('../hooks/useProductActions', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    filterProducts: jest.fn(),
  })),
}));

// Mock the components
jest.mock('../layout/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>;
  };
});

jest.mock('../components/ProductCard', () => {
  return function MockProductCard(props) {
    return (
      <div data-testid={`product-card-${props.id}`}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <span>${props.price}</span>
        <span>{props.category}</span>
      </div>
    );
  };
});

// Mock react-icons
jest.mock('react-icons/io', () => ({
  IoIosSearch: () => <div data-testid="search-icon">Search Icon</div>,
}));

jest.mock('react-icons/fa', () => ({
  FaSort: () => <div data-testid="sort-icon">Sort Icon</div>,
  FaSortAmountDownAlt: () => <div data-testid="sort-asc-icon">Sort Asc Icon</div>,
  FaSortAmountUp: () => <div data-testid="sort-desc-icon">Sort Desc Icon</div>,
  FaFilter: () => <div data-testid="filter-icon">Filter Icon</div>,
}));

jest.mock('react-icons/ri', () => ({
  RiResetLeftLine: () => <div data-testid="reset-icon">Reset Icon</div>,
}));

// Mock useDebounce hook
const mockUseDebounce = require('../hooks/useDebounce').default;

// Mock useProductActions hook
const mockUseProductActions = require('../hooks/useProductActions').default;

describe('ProductListingsPage', () => {
  let mockStore;
  let mockFilterProducts;

  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      price: 100,
      category: 'electronics',
      image: 'image1.jpg',
      isFavourite: false,
      rating: { rate: 4.5, count: 100 },
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      price: 200,
      category: 'clothing',
      image: 'image2.jpg',
      isFavourite: true,
      rating: { rate: 3.5, count: 50 },
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Description 3',
      price: 150,
      category: 'electronics',
      image: 'image3.jpg',
      isFavourite: false,
      rating: { rate: 4.0, count: 75 },
    },
  ];

  const createMockStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        products: (state = initialState.products || mockProducts) => state,
        initialLoading: (state = initialState.initialLoading || false) => state,
      },
      preloadedState: initialState,
    });
  };

  beforeEach(() => {
    mockFilterProducts = jest.fn().mockReturnValue(mockProducts);
    mockUseProductActions.mockReturnValue({
      filterProducts: mockFilterProducts,
    });
    mockUseDebounce.mockImplementation((value) => value);
    
    mockStore = createMockStore({
      products: mockProducts,
      initialLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (store = mockStore) => {
    return render(
      <Provider store={store}>
        <ProductListingsPage />
      </Provider>
    );
  };

  describe('Component Rendering', () => {
    test('renders without crashing', () => {
      renderComponent();
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    test('renders filters section', () => {
      renderComponent();
      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search Title...')).toBeInTheDocument();
      expect(screen.getByText('All Categories')).toBeInTheDocument();
      expect(screen.getByText('Sort by Price')).toBeInTheDocument();
      expect(screen.getByText('Reset')).toBeInTheDocument();
    });

    test('renders product cards when products are available', () => {
      renderComponent();
      
      mockProducts.forEach((product) => {
        expect(screen.getByTestId(`product-card-${product.id}`)).toBeInTheDocument();
        expect(screen.getByText(product.title)).toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    test('updates search term when typing in search field', async () => {
      const user = userEvent.setup();
      renderComponent();
      
      const searchInput = screen.getByPlaceholderText('Search Title...');
      await user.type(searchInput, 'Product 1');
      
      expect(searchInput.value).toBe('Product 1');
    });

    test('calls filterProducts with debounced search term', async () => {
      const user = userEvent.setup();
      renderComponent();
      
      const searchInput = screen.getByPlaceholderText('Search Title...');
      await user.type(searchInput, 'test');
      
      await waitFor(() => {
        expect(mockFilterProducts).toHaveBeenCalledWith({
          allProducts: mockProducts,
          searchTerm: 'test',
          category: 'All',
          sortOrder: '',
        });
      });
    });
  });

  describe('Sorting Functionality', () => {
    test('cycles through sort orders when clicking sort button', async () => {
      const user = userEvent.setup();
      renderComponent();
      
      const sortButton = screen.getByText('Sort by Price');
      
      // First click - should set to 'asc'
      await user.click(sortButton);
      await waitFor(() => {
        expect(mockFilterProducts).toHaveBeenCalledWith({
          allProducts: mockProducts,
          searchTerm: '',
          category: 'All',
          sortOrder: 'asc',
        });
      });
      
      // Second click - should set to 'desc'
      await user.click(sortButton);
      await waitFor(() => {
        expect(mockFilterProducts).toHaveBeenCalledWith({
          allProducts: mockProducts,
          searchTerm: '',
          category: 'All',
          sortOrder: 'desc',
        });
      });
      
      // Third click - should reset to ''
      await user.click(sortButton);
      await waitFor(() => {
        expect(mockFilterProducts).toHaveBeenCalledWith({
          allProducts: mockProducts,
          searchTerm: '',
          category: 'All',
          sortOrder: '',
        });
      });
    });

    test('displays correct sort icons based on sort order', async () => {
      const user = userEvent.setup();
      renderComponent();
      
      const sortButton = screen.getByText('Sort by Price');
      
      // Initially should show default sort icon
      expect(screen.getByTestId('sort-icon')).toBeInTheDocument();
      
      // After first click - should show ascending icon
      await user.click(sortButton);
      expect(screen.getByTestId('sort-asc-icon')).toBeInTheDocument();
      
      // After second click - should show descending icon
      await user.click(sortButton);
      expect(screen.getByTestId('sort-desc-icon')).toBeInTheDocument();
    });
  });

  describe('Reset Functionality', () => {
    test('resets all filters when clicking reset button', async () => {
      const user = userEvent.setup();
      renderComponent();
      
      // Set some filters first
      const searchInput = screen.getByPlaceholderText('Search Title...');
      await user.type(searchInput, 'test');
      
      const sortButton = screen.getByText('Sort by Price');
      await user.click(sortButton);
      
      // Click reset button
      const resetButton = screen.getByText('Reset');
      await user.click(resetButton);
      
      // Check that filters are reset
      expect(searchInput.value).toBe('');
      expect(screen.getByTestId('sort-icon')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(mockFilterProducts).toHaveBeenCalledWith({
          allProducts: mockProducts,
          searchTerm: '',
          category: 'All',
          sortOrder: '',
        });
      });
    });
  });
});