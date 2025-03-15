import { redirect } from "next/navigation"
import type { Metadata } from "next"

interface Props {
  params: { environment: string; strategy: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { environment, strategy } = params

  return {
    title: `${environment.charAt(0).toUpperCase() + environment.slice(1)} ${strategy.charAt(0).toUpperCase() + strategy.slice(1)} Reports - UPEX Test Report Portal`,
  }
}

// Esta página redirige a la nueva ruta para mantener la compatibilidad con enlaces existentes
export default function EnvironmentStrategyPage({ params }: Props) {
  const { environment, strategy } = params

  // Redirigir a la nueva ruta
  redirect(`/reports-list/${environment}/${strategy}`)
}

