import React, { useState, useEffect } from 'react'
import Toggle from 'react-toggle'
import { useMediaQuery } from 'react-responsive'

const DARK_CLASS = 'dark'

const DarkToggle = () => {
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined,
    (prefersDark) => {
      setIsDark(prefersDark)
    }
  )

  const [isDark, setIsDark] = useState(systemPrefersDark)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS)
    } else {
      document.documentElement.classList.remove(DARK_CLASS)
    }
  }, [isDark])

  return (
    <Toggle
      className='DarkToggle'
      checked={isDark}
      onChange={(toggleEvent) => setIsDark(toggleEvent.target.checked)}
      icons={{ checked: '🌙', unchecked: '🔆' }}
      aria-label='Dark mode'
    />
  )
}

export default DarkToggle
