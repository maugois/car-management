import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Página não encontrada</h2>
      <p>Infelizmente, não conseguimos achar o que você procura.</p>
      <Link href="/">Voltar para o Início</Link>
    </div>
  )
}