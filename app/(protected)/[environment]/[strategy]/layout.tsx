import type React from "react"
import { notFound } from "next/navigation"
import { getAllureReports } from "@/lib/allure-reports"

export default async function ExecutionListLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { environment: string; strategy: string }
}) {
  const { environment, strategy } = params

  // Validar que el environment y strategy existen
  const reports = await getAllureReports()

  if (
    !["stage", "review", "production"].includes(environment) ||
    !["sanity", "smoke", "regression"].includes(strategy) ||
    !reports[environment] ||
    !reports[environment][strategy]
  ) {
    notFound()
  }

  return <>{children}</>
}

