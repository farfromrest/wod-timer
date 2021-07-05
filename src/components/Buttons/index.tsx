import styled from '@emotion/styled'

const Button = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const StartButton = styled(Button)`
  background-color: var(--green-600);
  color: var(--black-50);

  &:hover {
    background-color: var(--green-700);
  }

  &:active {
    background-color: var(--green-800);
  }
`

export const PauseButton = styled(Button)`
  background-color: var(--blue-600);
  color: var(--black-50);

  &:hover {
    background-color: var(--blue-700);
  }

  &:active {
    background-color: var(--blue-800);
  }
`

export const RestartButton = styled(Button)`
  background-color: var(--red-500);
  color: var(--black-50);

  &:hover {
    background-color: var(--red-600);
  }

  &:active {
    background-color: var(--red-700);
  }
`

export const StopButton = styled(Button)`
  background-color: var(--red-500);
  color: var(--black-50);

  &:hover {
    background-color: var(--red-600);
  }

  &:active {
    background-color: var(--red-700);
  }
`
