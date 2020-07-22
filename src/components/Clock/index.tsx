import React from 'react'
import styled from '@emotion/styled'

import colors from 'styles/colors'

const Wrapper = styled.div<{}>`
  color: ${colors.white};
`

type Props = {
  minutes: number
  seconds: number
  className?: string
}

function formatDigits(digits: number) {
  return digits < 10 ? `0${digits}` : digits
}

function Clock(props: Props) {
  const { minutes, seconds, className } = props
  return (
    <Wrapper className={className}>
      {formatDigits(minutes)}:{formatDigits(seconds)}
    </Wrapper>
  )
}

export default Clock
