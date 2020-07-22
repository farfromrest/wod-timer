import React from 'react'
import ReactDOM from 'react-dom'
import { Global, css } from '@emotion/core'

import App from 'components/App'
import resetStyles from 'styles/reset'
import baseStyles from 'styles/base'

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        ${resetStyles}
        ${baseStyles}
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
