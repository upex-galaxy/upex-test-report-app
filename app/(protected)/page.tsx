import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { scanAllureReports, getLatestAllureReports } from "@/lib/allure-scanner"
import { AllureExecutionList } from "@/components/allure-execution-list"

// Component for the "View all reports" button
function ViewAllButton({ environment, strategy }: { environment: string; strategy: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs text-[#62E4CF] hover:text-[#62E4CF] hover:bg-[#62E4CF]/10"
      asChild
    >
      <Link href={`/reports-list/${environment}/${strategy}`}>
        <span>View all reports</span>
        <ChevronRight size={14} className="ml-1" />
      </Link>
    </Button>
  )
}

// Actualizar la llamada al componente AllureExecutionList para eliminar los parámetros no utilizados
async function AllureExecutions({
  environment,
  strategy,
}: {
  environment: string
  strategy: string
}) {
  const executions = await getLatestAllureReports(environment, strategy, 2)

  return <AllureExecutionList executions={executions} />
}

export default async function HomePage() {
  const allureReports = await scanAllureReports()

  // Obtener todos los environments disponibles
  const environments = Object.keys(allureReports)

  if (environments.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold neon-gradient">Test Report Dashboard</h1>
          <p className="text-gray-400 mt-2">View test reports across different environments and test types</p>
        </div>

        <Card className="neon-card">
          <CardHeader>
            <CardTitle>No Reports Found</CardTitle>
            <CardDescription>No Allure reports were found in the public directory</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Please upload Allure reports to the{" "}
              <code className="bg-[#0B0C10] px-1 py-0.5 rounded">public/allure-report</code> directory following the
              structure:
            </p>
            <pre className="bg-[#1A1A2E] p-4 rounded-md mt-4 text-sm overflow-x-auto">
              public/allure-report/{"{"}
              <span className="text-[#62E4CF]">environment</span>
              {"}"}/{"{"}
              <span className="text-[#62E4CF]">strategy</span>
              {"}"}/{"{"}
              <span className="text-[#62E4CF]">build-number</span>
              {"}"}/
            </pre>
            <p className="mt-4 text-gray-400">
              For example:{" "}
              <code className="bg-[#0B0C10] px-1 py-0.5 rounded">public/allure-report/stage/regression/42/</code>
            </p>
            <div className="mt-6">
              <Link href="/allure-report" className="text-[#62E4CF] hover:underline">
                View the Allure Reports Guide for more information
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold neon-gradient">Test Report Dashboard</h1>
        <p className="text-gray-400 mt-2">View test reports across different environments and test types</p>
      </div>

      {environments.map((environment) => {
        const strategies = Object.keys(allureReports[environment])

        if (strategies.length === 0) return null

        return (
          <div key={environment} className="space-y-4">
            <h2 className="text-2xl font-semibold capitalize neon-text">{environment} Environment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strategies.map((strategy) => (
                <Card key={strategy} className="neon-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="capitalize">{strategy} Tests</CardTitle>
                      <CardDescription>Latest Allure Reports</CardDescription>
                    </div>
                    <ViewAllButton environment={environment} strategy={strategy} />
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<div className="text-sm text-gray-400">Loading executions...</div>}>
                      <AllureExecutions environment={environment} strategy={strategy} />
                    </Suspense>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

