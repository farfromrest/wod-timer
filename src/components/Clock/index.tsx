import styled from '@emotion/styled'

const Wrapper = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 4rem;
`

function formatDoubleDigits(digits: number) {
  return digits < 10 ? `0${digits}` : digits
}

type Props = {
  minutes: number
  seconds: number
  className?: string
}

function Clock({ minutes, seconds, className }: Props) {
  return (
    <Wrapper className={className}>
      {formatDoubleDigits(minutes)}:{formatDoubleDigits(seconds)}
    </Wrapper>
  )
}

export default Clock
