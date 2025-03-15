import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllureReports, getLatestAllureReports } from "@/lib/allure-reports"
import { AllureExecutionList } from "@/components/allure-execution-list"

// Componente para cargar las ejecuciones de Allure
async function AllureExecutions({
  environment,
  strategy,
}: {
  environment: "stage" | "review" | "production"
  strategy: "sanity" | "smoke" | "regression"
}) {
  const executions = await getLatestAllureReports(environment, strategy, 2)

  return <AllureExecutionList environment={environment} strategy={strategy} executions={executions} />
}

export default async function HomePage() {
  const allureReports = await getAllureReports()

  // Obtener todos los environments y strategies disponibles
  const environments = Object.keys(allureReports) as Array<"stage" | "review" | "production">

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold neon-gradient">Test Report Dashboard</h1>
        <p className="text-gray-400 mt-2">View test reports across different environments and test types</p>
      </div>

      {environments.map((environment) => (
        <div key={environment} className="space-y-4">
          <h2 className="text-2xl font-semibold capitalize neon-text">{environment} Environment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(allureReports[environment]).map((strategy) => (
              <Card key={strategy} className="neon-card">
                <CardHeader>
                  <CardTitle className="capitalize">{strategy} Tests</CardTitle>
                  <CardDescription>Latest Allure Reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="text-sm text-gray-400">Loading executions...</div>}>
                    <AllureExecutions
                      environment={environment as "stage" | "review" | "production"}
                      strategy={strategy as "sanity" | "smoke" | "regression"}
                    />
                  </Suspense>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

