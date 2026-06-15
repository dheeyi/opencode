import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PokemonCard } from './PokemonCard.jsx'

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('PokemonCard', () => {
  it('renders card with correct sprite and name', () => {
    const { container } = renderWithRouter(
      <PokemonCard name="bulbasaur" id={1} sprite="https://example.com/sprite.png" />
    )
    const img = container.querySelector('img')
    expect(img.src).toBe('https://example.com/sprite.png')
    expect(img.alt).toBe('bulbasaur')
  })

  it('formats name with capitalized first letter', () => {
    const { container } = renderWithRouter(
      <PokemonCard name="bulbasaur" id={1} sprite="https://example.com/sprite.png" />
    )
    const heading = container.querySelector('h3')
    expect(heading.textContent).toBe('#1 Bulbasaur')
  })

  it('displays id with # prefix', () => {
    const { container } = renderWithRouter(
      <PokemonCard name="charmander" id={4} sprite="https://example.com/sprite.png" />
    )
    const heading = container.querySelector('h3')
    expect(heading.textContent).toBe('#4 Charmander')
  })

  it('applies pokemon-card class', () => {
    const { container } = renderWithRouter(
      <PokemonCard name="squirtle" id={7} sprite="https://example.com/sprite.png" />
    )
    const link = container.querySelector('a')
    expect(link.className).toBe('pokemon-card')
    expect(link.getAttribute('href')).toBe('/pokemon/squirtle')
  })
})