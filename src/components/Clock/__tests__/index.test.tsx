import React from 'react'
import { render, screen } from '@testing-library/react'

import Clock from '..'

jest.useFakeTimers()

describe('Clock', () => {
  it('should display properly formated time', () => {
    render(<Clock minutes={1} seconds={30} />)

    expect(screen.getByText(/01:30/)).toBeInTheDocument()
  })
})
