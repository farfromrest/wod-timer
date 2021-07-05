import { render, screen } from '@testing-library/react'
import Clock from '.'

describe('clock component', () => {
  it('should display the correct time', () => {
    render(<Clock minutes={2} seconds={5} />)

    expect(screen.getByText(/02:05/)).toBeInTheDocument()
  })
})
