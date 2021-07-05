import { css } from '@emotion/react'

export const reset = css`
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input,
  button,
  select {
    border: 0;
    padding: 0;
    margin: 0;
    background: none;
    font: inherit;
    outline: none;
    text-transform: inherit;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`

export const base = css`
  html,
  body {
    font-size: 16px;
    font-family: Lato, Helvetica, Arial, sans-serif;
    font-weight: 400;
    color: var(--black-800);
    background-color: var(--black-50);
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -webkit-overflow-scrolling: touch;
  }

  :root {
    --black-50: #f2f2f2;
    --black-100: #d9d9d9;
    --black-200: #bfbfbf;
    --black-300: #a6a6a6;
    --black-400: #8c8c8c;
    --black-500: #737373;
    --black-600: #595959;
    --black-700: #404040;
    --black-800: #262626;
    --black-900: #0d0d0d;
    --green-50: #f0f9e4;
    --green-100: #d9ecc4;
    --green-200: #c1dda1;
    --green-300: #a8cf7c;
    --green-400: #90c258;
    --green-500: #76a83e;
    --green-600: #5b8330;
    --green-700: #405d21;
    --green-800: #263811;
    --green-900: #091400;
    --blue-50: #dff8ff;
    --blue-100: #bce4f4;
    --blue-200: #95d0e9;
    --blue-300: #6dbdde;
    --blue-400: #48aad4;
    --blue-500: #2f90ba;
    --blue-600: #217092;
    --blue-700: #135069;
    --blue-800: #033141;
    --blue-900: #00121b;
    --red-50: #ffe5e7;
    --red-100: #f8bcc0;
    --red-200: #ed9297;
    --red-300: #e4676f;
    --red-400: #db3d46;
    --red-500: #c2242d;
    --red-600: #981b22;
    --red-700: #6d1118;
    --red-800: #44080d;
    --red-900: #1e0001;
  }
`
