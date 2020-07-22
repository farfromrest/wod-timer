import { css } from '@emotion/core'

import colors from 'styles/colors'

const base = css`
  body {
    color: ${colors.white};
    background-color: ${colors.black};
    font-family: 'Helvetica Neue', sans-serif;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
`

export default base
