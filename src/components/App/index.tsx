import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Clock from 'components/Clock'
import TimerForm from 'components/TimerForm'
import useWorkoutTimer from 'hooks/useWorkoutTimer'
import { FormEvent, useMemo, useState } from 'react'

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

function App() {
  const [countdown, setCountdown] = useState(3)
  const [rounds, setRounds] = useState(3)
  const [work, setWork] = useState(30)
  const [restMinutes, setRestMinutes] = useState(0)
  const [restSeconds, setRestSeconds] = useState(30)

  const timers = useMemo(() => {
    const results = [
      {
        ms: countdown * 1000,
        label: 'countdown',
      },
    ]
    for (let round = 1; round <= rounds; round++) {
      results.push({
        ms: work * 1000,
        label: `work (round ${round} of ${rounds})`,
      })
      results.push({
        ms: (restMinutes * 60 + restSeconds) * 1000,
        label: `rest (round ${round} of ${rounds})`,
      })
    }

    return results
  }, [countdown, rounds, work, restSeconds, restMinutes])

  const {
    minutes,
    seconds,
    onRestart,
    onStart,
    onStop,
    onPause,
    isRunning,
    hasStarted,
    currentTimer,
  } = useWorkoutTimer(timers)

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget

    switch (name) {
      case 'countdown':
        setCountdown(Number(value))
        break
      case 'rounds':
        setRounds(Number(value))
        break
      case 'work':
        setWork(Number(value))
        break
      case 'restMinutes':
        setRestMinutes(Number(value))
        break
      case 'restSeconds':
        if (value) {
          setRestSeconds(Number(value))
        } else {
          setRestSeconds()
        }
        break
    }
  }

  return (
    <Wrapper>
      <Timer>
        <Text>{currentTimer.label}</Text>
        <StyledClock
          minutes={minutes}
          seconds={seconds}
          status={currentTimer.label}
        />
        <ButtonContainer>
          {isRunning ? (
            <>
              <StopButton onClick={onStop}>Stop</StopButton>
              <PauseButton onClick={onPause}>Pause</PauseButton>
            </>
          ) : (
            <>
              {' '}
              {hasStarted && (
                <RestartButton onClick={onRestart}>Restart</RestartButton>
              )}
              <StartButton onClick={onStart}>
                {hasStarted ? 'Resume' : 'Start'}
              </StartButton>
            </>
          )}
        </ButtonContainer>
      </Timer>
      <Form>
        <FieldGroup>
          <Label>Countdown</Label>
          <Input
            type="number"
            min="0"
            onChange={handleChange}
            name="countdown"
            value={countdown}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Rounds</Label>
          <Input
            type="number"
            min="0"
            onChange={handleChange}
            name="rounds"
            value={rounds}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Work</Label>
          <Input
            type="number"
            min="0"
            onChange={handleChange}
            name="work"
            value={work}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Rest</Label>
          <Input
            type="number"
            min="0"
            onChange={handleChange}
            name="restMinutes"
            value={restMinutes}
          />
          :
          <Input
            type="number"
            min="0"
            onChange={handleChange}
            name="restSeconds"
            value={restSeconds}
            max="59"
            css={css`
              width: 2ch;
            `}
          />
        </FieldGroup>
      </Form>
      <TimerForm />
    </Wrapper>
  )
}

export default App
