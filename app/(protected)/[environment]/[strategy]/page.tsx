import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllureReports } from "@/lib/allure-reports"
import { AllureExecutionList } from "@/components/allure-execution-list"

export default async function ExecutionListPage({
  params,
}: {
  params: { environment: "stage" | "review" | "production"; strategy: "sanity" | "smoke" | "regression" }
}) {
  const { environment, strategy } = params
  const reports = await getAllureReports()
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
          {strategy.charAt(0).toUpperCase() + strategy.slice(1)} Tests
        </h1>
        <p className="text-gray-400 mt-2">
          View all Allure reports for {strategy} tests in the {environment} environment
        </p>
      </div>

      <Card className="neon-card">
        <CardHeader>
          <CardTitle>All Executions</CardTitle>
          <CardDescription>
            {executions.length} execution{executions.length !== 1 ? "s" : ""} available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AllureExecutionList
            environment={environment}
            strategy={strategy}
            executions={executions}
            showViewAll={false}
          />
        </CardContent>
      </Card>
    </div>
  )
}

