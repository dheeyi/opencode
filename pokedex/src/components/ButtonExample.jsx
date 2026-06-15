import { useState } from 'react'
import './ButtonExample.css'

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {'primary' | 'secondary' | 'danger'} props.variant
 * @param {() => void} [props.onClick]
 */
export function ButtonExample({ label = 'Click me', variant = 'primary', onClick }) {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount((c) => c + 1)
    onClick?.()
  }

  return (
    <button className={`button-example button-example--${variant}`} onClick={handleClick}>
      {label} — clicked {count} times
    </button>
  )
}
