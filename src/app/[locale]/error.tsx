'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Algo deu errado!</h2>
      <p>Ocorreu um erro inesperado em nossa aplicação.</p>
      
      <button 
        onClick={() => reset()} 
        style={{ marginTop: '10px', padding: '8px 16px' }}
      >
        Tentar novamente
      </button>
    </div>
  )
}