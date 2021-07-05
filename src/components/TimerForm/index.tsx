import styled from '@emotion/styled'

import Clock from 'components/Clock'
import { FormEvent, useEffect, useState } from 'react'

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  flex-direction: column;
`

const Timer = styled.div`
  margin: 8px 0;
  display: flex;
  flex-direction: column;
`

const Text = styled.p`
  color: var(--black-400);
  text-align: center;
  text-transform: uppercase;
`

const Button = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const StartButton = styled(Button)`
  background-color: var(--green-600);
  color: var(--black-50);

  &:hover {
    background-color: var(--green-700);
  }

  &:active {
    background-color: var(--green-800);
  }
`

const PauseButton = styled(Button)`
  background-color: var(--blue-600);
  color: var(--black-50);

  &:hover {
    background-color: var(--blue-700);
  }

  &:active {
    background-color: var(--blue-800);
  }
`

const RestartButton = styled(Button)`
  background-color: var(--red-500);
  color: var(--black-50);

  &:hover {
    background-color: var(--red-600);
  }

  &:active {
    background-color: var(--red-700);
  }
`

const StopButton = styled(Button)`
  background-color: var(--red-500);
  color: var(--black-50);

  &:hover {
    background-color: var(--red-600);
  }

  &:active {
    background-color: var(--red-700);
  }
`

const StyledClock = styled(Clock)`
  margin: 16px 0;
  text-align: center;
  ${(p: { status: string }) => {
    switch (p.status) {
      case 'countdown':
        return `color: var(--red-300);`
    }
  }};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  flex: 1;
  text-align: right;
  margin-right: 8px;
`
const FieldGroup = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
`
const Input = styled.input`
  font-family: 'Roboto Mono', monospace;
  border: 1px solid var(--black-300);
  padding: 4px;
  min-width: 0;
`

function TimeInput({ onChange, name, value }) {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState<number>(value)

  function handleChange(event) {
    if (event.currentTarget.name.includes('minutes')) {
      setMinutes(Number(event.currentTarget.value))
    } else {
      console.log(
        'Number(event.currentTarget.value)',
        Number(event.currentTarget.value)
      )
      let newSeconds = Number(event.currentTarget.value)

      if (newSeconds > 59) {
        newSeconds = 59
      }
      setSeconds(newSeconds)
    }
  }

  console.log('seconds2', seconds < 10 ? `0${seconds}` : seconds)
  useEffect(() => {
    onChange({ name, value: minutes * 60 + seconds })
  }, [minutes, seconds])

  return (
    <>
      <Input
        type="number"
        min="0"
        onChange={handleChange}
        name={`${name}-minutes`}
        value={minutes}
      />
      :
      <Input
        type="number"
        min="0"
        onChange={handleChange}
        name={`${name}-seconds`}
        value={seconds < 10 ? `0${seconds}` : seconds}
        max="59"
      />
    </>
  )
}

type Props = RouteComponentProps

function TimerForm(props: Props) {
  const [countdown, setCountdown] = useState(3)
  const [rounds, setRounds] = useState(3)
  const [work, setWork] = useState(30)
  const [rest, setRest] = useState(30)

  function handleChangeTimeInput({ value, name }) {
    switch (name) {
      case 'rest':
        setRest(value)
        break
      case 'work':
        setWork(value)
        break
      case 'countdown':
        setCountdown(value)
        break
    }
  }

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget

    switch (name) {
      case 'rounds':
        setRounds(Number(value))
        break
    }
  }

  return (
    <Form>
      <FieldGroup>
        <Label>Rounds</Label>
        <Input
          type="number"
          min="1"
          onChange={handleChange}
          name="rounds"
          value={rounds}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Countdown</Label>
        <TimeInput
          onChange={handleChangeTimeInput}
          name="countdown"
          value={countdown}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Work</Label>
        <TimeInput onChange={handleChangeTimeInput} name="work" value={work} />
      </FieldGroup>

      <FieldGroup>
        <Label>Rest</Label>
        <TimeInput onChange={handleChangeTimeInput} name="rest" value={rest} />
      </FieldGroup>
    </Form>
  )
}

export default TimerForm
