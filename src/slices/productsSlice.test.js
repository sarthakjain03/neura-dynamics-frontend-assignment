import reducer, {
  addFavourite,
  removeFavourite,
  fetchAllProducts,
} from './productsSlice';

describe('productsSlice', () => {
  const initialState = {
    products: [],
    initialLoading: true,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle addFavourite', () => {
    const prevState = {
      ...initialState,
      products: [
        { id: 1, title: 'Product A', isFavourite: false },
        { id: 2, title: 'Product B' },
      ],
    };

    const newState = reducer(prevState, addFavourite(1));
    expect(newState.products.find(p => p.id === 1).isFavourite).toBe(true);
  });

  it('should handle removeFavourite', () => {
    const prevState = {
      ...initialState,
      products: [
        { id: 1, title: 'Product A', isFavourite: true },
        { id: 2, title: 'Product B' },
      ],
    };

    const newState = reducer(prevState, removeFavourite(1));
    expect(newState.products.find(p => p.id === 1).isFavourite).toBe(false);
  });

  it('should handle fetchAllProducts.fulfilled', () => {
    const products = [
      { id: 1, title: 'Product A' },
      { id: 2, title: 'Product B' },
    ];

    const action = {
      type: fetchAllProducts.fulfilled.type,
      payload: products,
    };

    const newState = reducer(initialState, action);
    expect(newState.initialLoading).toBe(false);
    expect(newState.products).toEqual(products);
  });
});
