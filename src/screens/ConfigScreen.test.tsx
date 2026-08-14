import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ConfigScreen } from './ConfigScreen'

describe('ConfigScreen', () => {
  it('renders with default values', () => {
    render(<ConfigScreen onStart={vi.fn()} />)
    expect(screen.getByLabelText('Número de casillas')).toHaveValue(32)
    expect(screen.getByLabelText('Frecuencia (segundos entre palabras)')).toHaveValue(1.5)
  })
})
