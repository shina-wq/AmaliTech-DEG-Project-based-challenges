import {it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

it('selecting a file marks it selected and populates the properties panel', async () => {
  render(<App />)
  const file = screen.getByText('README_First.txt')

  await userEvent.click(file)

  expect(file.closest('button')).toHaveAttribute('aria-selected', 'true')

  const panel = screen.getByRole('region', { name: 'File properties' })
  expect(panel).toHaveTextContent('README_First.txt')
  expect(panel).toHaveTextContent('1KB')
})

it('shows the empty state before any selection', () => {
  render(<App />)
  expect(screen.getByText('No file selected')).toBeInTheDocument()
})