import { useEffect, useRef, useState } from 'react'

const RESET_DELAY = 2000

function CopyButton({ text, label = 'Copy text' }) {
  const [status, setStatus] = useState('idle')
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const resetStatus = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setStatus('idle')
    }, RESET_DELAY)
  }

  const handleCopy = async () => {
    if (!text) {
      setStatus('error')
      resetStatus()
      return
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      setStatus('copied')
    } catch (error) {
      console.error('Failed to copy text:', error)
      setStatus('error')
    }

    resetStatus()
  }

  const buttonLabel =
    status === 'copied'
      ? 'Copied!'
      : status === 'error'
        ? 'Copy failed'
        : label

  return (
    <button
      className="copy-button"
      type="button"
      onClick={handleCopy}
      aria-live="polite"
    >
      {buttonLabel}
    </button>
  )
}

export default CopyButton
