import { render, screen } from '@testing-library/react'
import App from './App'

describe('TaskFlow app', () => {
  it('renders the login experience', () => {
    render(<App />)
    expect(screen.getByText(/Plan smarter/i)).toBeInTheDocument()
  })
})
