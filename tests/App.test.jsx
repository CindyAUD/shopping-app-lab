import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";

describe("Dark Mode Toggle", () => {
  it("renders the dark mode toggle button with correct initial text", () => {
    render(<App />);
    expect(screen.getByText("Toggle Dark Mode")).toBeTruthy();
  });

  it("changes button text to 'Toggle Light Mode' when clicked", () => {
    render(<App />);
    const btn = screen.getByText("Toggle Dark Mode");
    fireEvent.click(btn);
    expect(screen.getByText("Toggle Light Mode")).toBeTruthy();
  });

  it("toggles back to 'Toggle Dark Mode' on second click", () => {
    render(<App />);
    const btn = screen.getByText("Toggle Dark Mode");
    fireEvent.click(btn);
    fireEvent.click(screen.getByText("Toggle Light Mode"));
    expect(screen.getByText("Toggle Dark Mode")).toBeTruthy();
  });
});

describe("Add to Cart", () => {
  it("adds an item to the cart when 'Add to Cart' is clicked", () => {
    render(<App />);
    const addButtons = screen.getAllByText("Add to Cart");
    fireEvent.click(addButtons[0]);
    expect(screen.getByText(/is in your cart/i)).toBeTruthy();
  });

  it("shows 'Milk is in your cart.' after adding Milk", () => {
    render(<App />);
    // Milk is in the Dairy category, visible by default (All)
    const milkCard = screen.getByText("Milk").closest(".product-card");
    fireEvent.click(milkCard.querySelector(".add-btn"));
    expect(screen.getByText("Milk is in your cart.")).toBeTruthy();
  });

  it("shows ✓ In Cart badge after adding an item", () => {
    render(<App />);
    const addButtons = screen.getAllByText("Add to Cart");
    fireEvent.click(addButtons[0]);
    expect(screen.getByText("✓ In Cart")).toBeTruthy();
  });
});

describe("Category Filter", () => {
  it("renders a category filter dropdown", () => {
    render(<App />);
    expect(screen.getByRole("combobox")).toBeTruthy();
  });

  it("filters products to show only Dairy items", () => {
    render(<App />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Dairy" } });
    // Dairy items should be visible
    expect(screen.getByText("Milk")).toBeTruthy();
    expect(screen.getByText("Cheese")).toBeTruthy();
    // Non-dairy items should not be visible
    expect(screen.queryByText("Apple")).toBeNull();
    expect(screen.queryByText("Bread")).toBeNull();
  });

  it("filters products to show only Bakery items", () => {
    render(<App />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Bakery" } });
    expect(screen.getByText("Bread")).toBeTruthy();
    expect(screen.getByText("Croissant")).toBeTruthy();
    expect(screen.queryByText("Milk")).toBeNull();
  });

  it("shows all products when 'All' is selected", () => {
    render(<App />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Dairy" } });
    fireEvent.change(select, { target: { value: "All" } });
    expect(screen.getByText("Milk")).toBeTruthy();
    expect(screen.getByText("Apple")).toBeTruthy();
    expect(screen.getByText("Bread")).toBeTruthy();
  });
});