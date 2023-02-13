import { render, within, screen } from '@testing-library/react';
import App from './App';
import ShowEvent from './ShowEvent';


test('component renders fine', () => {
  const { container } = render(<App />)
  expect(container).toBeTruthy();
})
test('component renders events fine', () => {
  const props = {
    calEvents: [{start: '10:30', end:'11:00'}]
  }
  const { container } = render(<ShowEvent {...props} />)
  expect(container).toBeTruthy();
})
test('component renders header fine', () => {
  const props = {
    calEvents: [{start: '10:30', end:'11:00'}]
  }
  render(<App />)
  const { getByText } = within(screen.getByTestId('header'))
  expect(getByText('Welcome to your calendar daily view')).toBeInTheDocument()
})

