import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../src/App";

describe("Dark Mode Toggle", () => {
  it("renders the dark mode toggle button with correct initial text", () => {
    render(<App />);
    expect(screen.getByText("Toggle Dark Mode")).toBeInTheDocument();
  });

  it("changes button text to 'Toggle Light Mode' when clicked", () => {
    render(<App />);
    const btn = screen.getByText("Toggle Dark Mode");
    fireEvent.click(btn);
    expect(screen.getByText("Toggle Light Mode")).toBeInTheDocument();
  });

  it("toggles back to 'Toggle Dark Mode' on second click", () => {
    render(<App />);
    const btn = screen.getByText("Toggle Dark Mode");
    fireEvent.click(btn);
    fireEvent.click(screen.getByText("Toggle Light Mode"));
    expect(screen.getByText("Toggle Dark Mode")).toBeInTheDocument();
  });
});

describe("Add to Cart", () => {
  it("adds an item to the cart when 'Add to Cart' is clicked", () => {
    render(<App />);
    const addButtons = screen.getAllByText("Add to Cart");
    fireEvent.click(addButtons[0]);
    expect(screen.getByText(/is in your cart/i)).toBeInTheDocument();
  });

  it("shows 'Milk is in your cart.' after adding Milk", () => {
    render(<App />);
    // Milk is in the Dairy category, visible by default (All)
    const milkCard = screen.getByText("Milk").closest(".product-card");
    fireEvent.click(milkCard.querySelector(".add-btn"));
    expect(screen.getByText("Milk is in your cart.")).toBeInTheDocument();
  });

  it("shows ✓ In Cart badge after adding an item", () => {
    render(<App />);
    const addButtons = screen.getAllByText("Add to Cart");
    fireEvent.click(addButtons[0]);
    expect(screen.getByText("✓ In Cart")).toBeInTheDocument();
  });
});

describe("Category Filter", () => {
  it("renders a category filter dropdown", () => {
    render(<App />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("filters products to show only Dairy items", () => {
    render(<App />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Dairy" } });
    // Dairy items should be visible
    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    // Non-dairy items should not be visible
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    expect(screen.queryByText("Bread")).not.toBeInTheDocument();
  });

  it("filters products to show only Bakery items", () => {
    render(<App />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Bakery" } });
    expect(screen.getByText("Bread")).toBeInTheDocument();
    expect(screen.getByText("Croissant")).toBeInTheDocument();
    expect(screen.queryByText("Milk")).not.toBeInTheDocument();
  });

  it("shows all products when 'All' is selected", () => {
    render(<App />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Dairy" } });
    fireEvent.change(select, { target: { value: "All" } });
    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Bread")).toBeInTheDocument();
  });
});