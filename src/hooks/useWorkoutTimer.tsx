import { useEffect, useMemo, useReducer } from 'react'

const START = 'start'
const RESTART = 'restart'
const STOP = 'stop'
const PAUSE = 'pause'
const TICK = 'tick'
const UPDATE = 'update'

function convertMiliseconds(miliseconds: number) {
  const totalSeconds = Math.round(miliseconds / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)

  const seconds = totalSeconds % 60
  const minutes = totalMinutes % 60

  return { minutes, seconds }
}

type State = {
  index: number
  timers: Timer[]
  startTime: number | null
  currentMs: number
  msOffset: number
  ms: number
}

type StartAction = {
  type: typeof START
}

type PauseAction = {
  type: typeof PAUSE
}

type TickAction = {
  type: typeof TICK
}

type StopAction = {
  type: typeof STOP
}

type RestartAction = {
  type: typeof RESTART
}
type UpdateAction = {
  type: typeof UPDATE
  payload: Timer[]
}

type Actions =
  | StartAction
  | PauseAction
  | TickAction
  | StopAction
  | RestartAction
  | UpdateAction

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case TICK:
      if (state.startTime) {
        const currentTimer = state.timers[state.index]
        const ms = Date.now() - state.startTime
        const currentMs = currentTimer.ms - (ms - state.msOffset)

        if (currentMs > 0) {
          return {
            ...state,
            ms,
            currentMs,
          }
        } else if (state.timers[state.index + 1]) {
          return {
            ...state,
            ms,
            msOffset: ms,
            index: state.index + 1,
            currentMs: state.timers[state.index + 1].ms,
          }
        } else {
          return {
            ...state,
            ms: 0,
            currentMs: 0,
            msOffset: 0,
            startTime: null,
          }
        }
      } else {
        return state
      }
    case START:
      return {
        ...state,
        startTime: Date.now() - state.ms,
      }
    case PAUSE:
      return {
        ...state,
        startTime: null,
      }
    case STOP:
      return {
        ...state,
        index: 0,
        ms: 0,
        currentMs: state.timers[0].ms,
        msOffset: 0,
        startTime: null,
      }
    case RESTART:
      return {
        ...state,
        index: 0,
        ms: 0,
        currentMs: state.timers[0].ms,
        msOffset: 0,
        startTime: Date.now(),
      }
    case UPDATE:
      return {
        index: 0,
        timers: action.payload,
        ms: 0,
        currentMs: action.payload[0].ms,
        msOffset: 0,
        startTime: null,
      }
    default:
      return state
  }
}

type Timer = {
  ms: number
  label: string
}

function useWorkoutTimer(timers: Timer[]) {
  const [state, dispatch] = useReducer(reducer, {
    index: 0,
    timers,
    ms: 0,
    currentMs: timers[0].ms,
    msOffset: 0,
    startTime: null,
  })

  useEffect(() => {
    dispatch({ type: UPDATE, payload: timers })
  }, [timers])

  useEffect(() => {
    const id = setInterval(() => {
      if (state.startTime) {
        dispatch({ type: TICK })
      }
    }, 50)

    return () => {
      clearInterval(id)
    }
  }, [state.startTime])

  function handleStart() {
    dispatch({ type: START })
  }

  function handleRestart() {
    dispatch({ type: RESTART })
  }

  function handlePause() {
    dispatch({ type: PAUSE })
  }

  function handleStop() {
    dispatch({ type: STOP })
  }

  const { minutes, seconds } = useMemo(() => {
    return convertMiliseconds(state.currentMs)
  }, [state])
  console.log('state', state)

  return {
    minutes,
    seconds,
    onStart: handleStart,
    onRestart: handleRestart,
    onPause: handlePause,
    onStop: handleStop,
    isRunning: !!state.startTime,
    hasStarted: state.ms > 0,
    currentTimer: timers[state.index],
  }
}

export default useWorkoutTimer
