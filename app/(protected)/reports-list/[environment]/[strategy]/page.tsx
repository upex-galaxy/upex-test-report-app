import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { scanAllureReports } from "@/lib/allure-scanner"
import type { Metadata } from "next"

// Definir los parámetros como Promises
type ReportParams = Promise<{
  environment: string
  strategy: string
}>

// Recibir los props completos y esperar la resolución de la Promise
export default async function ReportsListPage({
  params,
}: {
  params: ReportParams
}) {
  // Esperar la resolución de la Promise antes de acceder a los parámetros
  const { environment, strategy } = await params
  const reports = await scanAllureReports()

  // Verificar si el environment y strategy existen
  if (!reports[environment] || !reports[environment][strategy]) {
    notFound()
  }

  const executions = reports[environment][strategy] || []

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center text-gray-400 hover:text-white">
            <ChevronLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold neon-gradient">
          {environment.charAt(0).toUpperCase() + environment.slice(1)}{" "}
          {strategy.charAt(0).toUpperCase() + strategy.slice(1)} Reports
        </h1>
        <p className="text-gray-400 mt-2">
          Complete list of Allure reports for {strategy} tests in the {environment} environment
        </p>
      </div>

      {executions.length === 0 ? (
        <Card className="neon-card">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-gray-400">No reports found for this environment and strategy.</p>
              <p className="text-gray-500 text-sm mt-2">
                Upload reports to{" "}
                <code className="bg-[#0B0C10] px-1 py-0.5 rounded">
                  public/allure-report/{environment}/{strategy}/
                </code>
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="neon-card">
          <CardHeader>
            <CardTitle>All Reports</CardTitle>
            <CardDescription>
              {executions.length} report{executions.length !== 1 ? "s" : ""} available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {executions.map((execution) => (
                <div
                  key={execution.buildNumber}
                  className="flex items-center justify-between p-3 border border-[#62E4CF]/20 rounded-md"
                >
                  <div>
                    <Link href={execution.path} target="_blank" className="text-[#62E4CF] hover:underline font-medium">
                      Execution #{execution.buildNumber}
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">Generated on {execution.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={execution.status === "passed" ? "default" : "destructive"}
                      className={
                        execution.status === "passed"
                          ? "bg-green-600 hover:bg-green-700 uppercase text-white"
                          : "bg-red-600 hover:bg-red-700 uppercase text-white"
                      }
                    >
                      {execution.status}
                    </Badge>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={execution.path} target="_blank">
                        View Report
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Actualizar también la función generateMetadata
export async function generateMetadata({
  params,
}: {
  params: ReportParams
}): Promise<Metadata> {
  // Esperar la resolución de la Promise antes de acceder a los parámetros
  const { environment, strategy } = await params

  return {
    title: `${environment.charAt(0).toUpperCase() + environment.slice(1)} ${strategy.charAt(0).toUpperCase() + strategy.slice(1)} Reports - UPEX Test Report Portal`,
  }
}

