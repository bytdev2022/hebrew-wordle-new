import { render, screen } from "@testing-library/react";
import App from "../App";

test("on initial render, the submit button is disabled", () => {
  render(<App />);
  // screen.debug();
  expect(screen.getByRole("button", { name: /בחר/i })).toBeDisabled();
});
