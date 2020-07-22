import React, { useEffect, useReducer } from 'react'
import { addSeconds, differenceInSeconds } from 'date-fns/fp'
import styled from '@emotion/styled'

import Clock from 'components/Clock'

const COUNTDOWN_SECONDS = 10

const StyledClock = styled(Clock)`
  font-size: 3rem;
`

type Props = {
  minutes: number
  seconds: number
}

type Action = {
  type: string
}

type State = {
  status: string
  startSeconds: number
  currentSeconds: number
  endTime?: Date
}

function parseSeconds(secondsLeft: number) {
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft - minutes * 60

  return {
    minutes,
    seconds,
  }
}

const STATUS = {
  stopped: 'stopped',
  countdown: 'countdown',
  running: 'running',
}

const ACTION = {
  start: 'start',
  stop: 'stop',
  tick: 'tick',
}

function reducer(timer: State, action: Action) {
  switch (action.type) {
    case ACTION.start: {
      return {
        ...timer,
        status: STATUS.running,
        endTime: addSeconds(timer.startSeconds + COUNTDOWN_SECONDS, Date.now()),
      }
    }

    case ACTION.tick:
      if (timer.endTime) {
        let currentSeconds = differenceInSeconds(Date.now(), timer.endTime)

        if (currentSeconds > timer.startSeconds) {
          currentSeconds = currentSeconds - timer.startSeconds
        }

        return {
          ...timer,
          currentSeconds,
          status: currentSeconds === 0 ? STATUS.stopped : timer.status,
          endTime: currentSeconds === 0 ? undefined : timer.endTime,
        }
      } else {
        return timer
      }

    case ACTION.stop:
      return {
        ...timer,
        status: STATUS.stopped,
        endTime: undefined,
      }
    default:
      return timer
  }
}

function Timer(props: Props) {
  const { minutes, seconds } = props
  const startSeconds = minutes * 60 + seconds

  const [timer, dispatch] = useReducer(reducer, {
    status: STATUS.stopped,
    currentSeconds: startSeconds,
    startSeconds,
  })

  useEffect(() => {
    const id = setInterval(() => {
      if (timer.status === STATUS.running) {
        dispatch({ type: ACTION.tick })
      }
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [timer.status])

  function handleStart() {
    dispatch({ type: ACTION.start })
    dispatch({ type: ACTION.tick })
  }

  function handleStop() {
    dispatch({ type: ACTION.stop })
  }

  return (
    <>
      <StyledClock {...parseSeconds(timer.currentSeconds)} />
      {timer.status === STATUS.stopped ? (
        <button onClick={handleStart}>start</button>
      ) : (
        <button onClick={handleStop}>stop</button>
      )}
    </>
  )
}

export default Timer
