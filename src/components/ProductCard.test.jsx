import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";
import useProductActions from "../hooks/useProductActions";

jest.mock("../hooks/useProductActions", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ProductCard", () => {
  const mockHandlers = {
    handleAddToFavouritesClick: jest.fn(),
    handleRemoveFavouriteClick: jest.fn(),
    handleCardClick: jest.fn(),
  };

  const baseProps = {
    id: 1,
    title: "Test Product",
    description: "A short description",
    price: 999,
    category: "Electronics",
    image: "https://via.placeholder.com/150",
    rating: { rate: 4.5, count: 120 },
  };

  beforeEach(() => {
    useProductActions.mockReturnValue(mockHandlers);
    jest.clearAllMocks();
  });

  it("renders product details correctly", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("A short description")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText(/₹ 999/)).toBeInTheDocument();
  });

  it("shows Add to Favourites button when not favourite", () => {
    render(<ProductCard {...baseProps} isFavourite={false} />);
    expect(screen.getByText("Add to Favourites")).toBeInTheDocument();
  });

  it("shows Remove Favourite button when marked as favourite and canRemove is true", () => {
    render(<ProductCard {...baseProps} isFavourite={true} canRemoveFromFavourites={true} />);
    expect(screen.getByText("Remove Favourite")).toBeInTheDocument();
  });

  it("shows disabled button when isFavourite is true but cannot remove", () => {
    render(<ProductCard {...baseProps} isFavourite={true} canRemoveFromFavourites={false} />);
    const button = screen.getByText("Marked as Favourite");
    expect(button).toBeDisabled();
  });

  it("calls handleAddToFavouritesClick when Add button is clicked", () => {
    render(<ProductCard {...baseProps} isFavourite={false} />);
    fireEvent.click(screen.getByText("Add to Favourites"));
    expect(mockHandlers.handleAddToFavouritesClick).toHaveBeenCalledWith(1);
  });

  it("calls handleRemoveFavouriteClick when Remove button is clicked", () => {
    render(<ProductCard {...baseProps} isFavourite={true} canRemoveFromFavourites={true} />);
    fireEvent.click(screen.getByText("Remove Favourite"));
    expect(mockHandlers.handleRemoveFavouriteClick).toHaveBeenCalledWith(1);
  });
});
