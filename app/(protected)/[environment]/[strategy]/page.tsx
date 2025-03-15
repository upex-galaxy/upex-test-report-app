import { redirect } from "next/navigation"
import type { Metadata } from "next"

// Definir los parámetros como Promises
type EnvironmentParams = Promise<{
  environment: string
  strategy: string
}>

// Recibir los props completos y esperar la resolución de la Promise
export default async function EnvironmentStrategyPage({
  params,
}: {
  params: EnvironmentParams
}) {
  // Esperar la resolución de la Promise antes de acceder a los parámetros
  const { environment, strategy } = await params

  // Redirigir a la nueva ruta
  redirect(`/reports-list/${environment}/${strategy}`)
}

// Actualizar también la función generateMetadata
export async function generateMetadata({
  params,
}: {
  params: EnvironmentParams
}): Promise<Metadata> {
  // Esperar la resolución de la Promise antes de acceder a los parámetros
  const { environment, strategy } = await params

  return {
    title: `${environment.charAt(0).toUpperCase() + environment.slice(1)} ${strategy.charAt(0).toUpperCase() + strategy.slice(1)} Reports - UPEX Test Report Portal`,
  }
}

