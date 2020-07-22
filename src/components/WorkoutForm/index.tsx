import React, { useState } from 'react'

type Props = {
  onSubmit: (args: Workout) => void
}

function parseTimeString(time: string) {
  const parts = time.split(':')

  return {
    minutes: Number(parts[0]),
    seconds: Number(parts[1]),
  }
}

function WorkoutForm(props: Props) {
  const { onSubmit } = props
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    onSubmit({ title, ...parseTimeString(time) })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    } else if (e.target.name === 'time') {
      setTime(e.target.value)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="workout-title">Title</label>
      <input
        id="workout-title"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <label htmlFor="workout-time">Time</label>
      <input
        id="workout-time"
        name="time"
        value={time}
        onChange={handleChange}
      />
      <button>Add Workout</button>
    </form>
  )
}

export default WorkoutForm
