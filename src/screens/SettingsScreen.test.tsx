import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SettingsScreen } from './SettingsScreen'

describe('SettingsScreen', () => {
  it('renders with default values', () => {
    render(<SettingsScreen onBack={vi.fn()} />)
    expect(screen.getByLabelText('Número de casillas')).toHaveValue(32)
    expect(screen.getByLabelText('Frecuencia (segundos entre palabras)')).toHaveValue('2.8')
    expect(screen.getByLabelText('Leer palabras en voz alta')).toBeChecked()
  })
})
