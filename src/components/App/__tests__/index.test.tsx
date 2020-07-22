import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '..'

describe('App', () => {
  it('should allow you to add and select a workout', () => {
    render(<App />)

    userEvent.type(screen.getByLabelText(/title/i), 'epic wod')
    userEvent.type(screen.getByLabelText(/time/i), '2:00')
    userEvent.click(screen.getByText(/add workout/i))

    userEvent.click(screen.getByText(/epic wod/))
    expect(screen.getByText(/2:00/)).toBeInTheDocument()
  })
})
