import { FormEvent } from 'react'
import styled from '@emotion/styled'

import Clock from 'components/Clock'
import { Input, TimeInput } from 'components/Inputs'
import {
  StartButton,
  PauseButton,
  RestartButton,
  StopButton,
} from 'components/Buttons'
import Header from 'components/Header'
import { useWorkoutTimer } from 'hooks/useWorkoutTimer'

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
`

const Timer = styled.div`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
`

const Text = styled.p`
  color: var(--black-400);
  text-align: center;
  text-transform: uppercase;
`

const StyledClock = styled(Clock)`
  margin: 16px 0;
  text-align: center;
  ${(p: { status: string }) => {
    switch (p.status) {
      case 'rest':
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
  align-items: center;
  margin: 16px 0;
`

const Label = styled.label`
  flex: 1 0 50%;
  text-align: right;
  margin-right: 8px;
`

const FieldGroup = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
`

const Field = styled.div`
  flex: 1 0 50%;
  display: flex;
  align-items: center;
`

const HeaderOne = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
  text-align: center;
`

const HeaderTwo = styled.h2`
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-bottom: 8px;
  text-align: center;
`

const Footer = styled.footer`
  font-size: 0.7rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  text-align: right;
  color: var(--black-400);
`

function App() {
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
    setCountdown,
    countdown,
    rounds,
    setRounds,
    work,
    setWork,
    rest,
    setRest,
  } = useWorkoutTimer()

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget
    switch (name) {
      case 'rounds':
        setRounds(Number(value))
        break
    }
  }

  function handleChangeTime({ name, value }: { name: string; value: number }) {
    switch (name) {
      case 'countdown':
        setCountdown(value)
        break
      case 'work':
        setWork(value)
        break
      case 'rest':
        setRest(value)
        break
    }
  }

  return (
    <Wrapper>
      <Header />
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

      {!isRunning && (
        <Form>
          <HeaderTwo>Settings</HeaderTwo>
          <FieldGroup>
            <Label htmlFor='countdown'>Countdown</Label>
            <Field>
              <TimeInput
                onChange={handleChangeTime}
                id='countdown'
                name='countdown'
                value={countdown}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor='rounds'>Rounds</Label>
            <Field>
              <Input
                id='rounds'
                type='number'
                min='0'
                onChange={handleChange}
                name='rounds'
                value={rounds}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor='work'>Work</Label>
            <Field>
              <TimeInput
                onChange={handleChangeTime}
                id='work'
                name='work'
                value={work}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor='rest'>Rest</Label>
            <Field>
              <TimeInput
                onChange={handleChangeTime}
                id='rest'
                name='rest'
                value={rest}
              />
            </Field>
          </FieldGroup>
        </Form>
      )}
      <Footer>&copy; 2021 Derek Fons</Footer>
    </Wrapper>
  )
}

export default App
