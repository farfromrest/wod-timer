import styled from '@emotion/styled'

import mediaQueries from 'styles/media-queries'

const Wrapper = styled.header`
  padding: 16px;
  min-height: 76px;
  background-color: var(--black-800);
  color: var(--black-100);
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${mediaQueries.phone} {
    align-items: stretch;
    text-align: center;
    flex-direction: column;
  }
`

const Heading = styled.h1`
  font-size: 1.4rem;

  @media ${mediaQueries.phone} {
    margin-bottom: 8px;
  }
`

function Header() {
  return (
    <Wrapper>
      <Heading>WOD Timer</Heading>
    </Wrapper>
  )
}

export default Header
