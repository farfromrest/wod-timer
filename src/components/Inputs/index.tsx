import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'

export const Input = styled.input`
  font-family: 'Roboto Mono', monospace;
  border: 1px solid var(--black-300);
  padding: 4px;
  width: 3em;
`

type TimeInputProps = Omit<
  React.HTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (args: { name: string; value: number }) => void
  name: string
  value: number
}

export function TimeInput({ onChange, name, value, ...rest }: TimeInputProps) {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState<number>(value)

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.name.includes('minutes')) {
      setMinutes(Number(event.currentTarget.value))
    } else {
      let newSeconds = Number(event.currentTarget.value)

      if (newSeconds > 59) {
        newSeconds = 59
      }
      setSeconds(newSeconds)
    }
  }

  useEffect(() => {
    onChange({ name, value: minutes * 60 + seconds })
  }, [onChange, name, minutes, seconds])

  return (
    <>
      <Input
        type='number'
        min='0'
        onChange={handleChange}
        name={`${name}-minutes`}
        value={minutes}
        {...rest}
      />
      :
      <Input
        type='number'
        min='0'
        onChange={handleChange}
        name={`${name}-seconds`}
        value={seconds < 10 ? `0${seconds}` : seconds}
        max='59'
      />
    </>
  )
}
