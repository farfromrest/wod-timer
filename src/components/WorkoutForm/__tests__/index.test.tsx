import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import WorkoutForm from '..'

describe('WorkoutForm', () => {
  it('should allow you to fill out a workout', () => {
    const handleSubmit = jest.fn()
    render(<WorkoutForm onSubmit={handleSubmit} />)

    userEvent.type(screen.getByLabelText(/title/i), 'epic wod')
    userEvent.type(screen.getByLabelText(/time/i), '1:30')
    userEvent.click(screen.getByText(/add workout/i))

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'epic wod',
      minutes: 1,
      seconds: 30,
    })
  })
})
