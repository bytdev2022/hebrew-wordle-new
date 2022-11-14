import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("on initial render, the submit button is disabled", async () => {
  render(<App />);
  const chooseButton = screen.getByRole("button", { name: /בחר/i });
  expect(chooseButton).toBeDisabled();
});

test('after insert text submit button is enabled', async () => {
  render(<App />);
  const chooseButton = screen.getByRole("button", { name: /בחר/i });
  const inputField = screen.getByRole("textbox", { id: /word_input/i })
  await userEvent.type(inputField, "test");
  expect(chooseButton).not.toBeDisabled();
})
