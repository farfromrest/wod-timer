import React, { useState } from 'react'
import styled from '@emotion/styled'

import WorkoutForm from 'components/WorkoutForm'
import Timer from 'components/Timer'
import Clock from 'components/Clock'

const Wrapper = styled.div``
const SelectedWorkout = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`
const Title = styled.h1`
  font-size: 1.4rem;
`

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      title: 'Sample',
      minutes: 1,
      seconds: 30,
    },
  ])
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>()

  function handleAddWorkout(workout: Workout) {
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout])
  }

  return (
    <Wrapper>
      {selectedWorkout ? (
        <SelectedWorkout>
          <Title>{selectedWorkout.title}</Title>
          <Timer
            minutes={selectedWorkout.minutes}
            seconds={selectedWorkout.seconds}
          />
        </SelectedWorkout>
      ) : (
        <>
          {workouts.map((workout) => (
            <div
              key={workout.title}
              onClick={() => setSelectedWorkout(workout)}
            >
              {workout.title}
              <Clock minutes={workout.minutes} seconds={workout.seconds} />
            </div>
          ))}
          <WorkoutForm onSubmit={handleAddWorkout} />
        </>
      )}
    </Wrapper>
  )
}

export default App
