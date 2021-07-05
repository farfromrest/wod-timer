import { useMemo, useState } from 'react'

import { useTimers } from './useTimers'

export function useWorkoutTimer() {
  const [countdown, setCountdown] = useState(3)
  const [rounds, setRounds] = useState(8)
  const [work, setWork] = useState(20)
  const [rest, setRest] = useState(10)

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
        ms: rest * 1000,
        label: `rest (round ${round} of ${rounds})`,
      })
    }

    return results
  }, [countdown, rounds, work, rest])

  const useTimerResults = useTimers(timers)

  return {
    ...useTimerResults,
    setCountdown,
    countdown,
    rounds,
    setRounds,
    work,
    setWork,
    rest,
    setRest,
  }
}
