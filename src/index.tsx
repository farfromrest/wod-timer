import React from 'react'
import ReactDOM from 'react-dom'
import { Global } from '@emotion/react'

import * as styles from 'styles'
import App from 'components/App'

ReactDOM.render(
  <React.StrictMode>
    <Global styles={styles.reset} />
    <Global styles={styles.base} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
