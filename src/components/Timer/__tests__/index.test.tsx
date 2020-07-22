import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { advanceTo, advanceBy } from 'jest-date-mock'

import Timer from '..'

jest.useFakeTimers()

describe('Timer', () => {
  it('should count down from the start seconds', () => {
    advanceTo(new Date(2020, 7, 1, 0, 0, 0))

    render(<Timer minutes={1} seconds={30} />)

    expect(screen.getByText('01:30')).toBeInTheDocument()

    userEvent.click(screen.getByText(/start/i))

    expect(screen.getByText('00:10')).toBeInTheDocument()

    act(() => {
      advanceBy(13000)
      jest.runOnlyPendingTimers()
    })

    expect(screen.getByText(/01:27/)).toBeInTheDocument()
  })
})
