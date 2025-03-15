import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

// Definir los parámetros como Promises
type ReportIdParams = Promise<{
  id: string
}>

// Mock data - in a real app, this would come from an API or database
const reports = {
  s1: {
    id: "s1",
    name: "Login Flow Tests",
    date: "2023-12-01",
    status: "passed",
    environment: "stage",
    type: "sanity",
    duration: "2m 15s",
    totalTests: 12,
    passed: 12,
    failed: 0,
    skipped: 0,
    details: [
      { name: "User can access login page", status: "passed", duration: "0.5s" },
      { name: "User can login with valid credentials", status: "passed", duration: "1.2s" },
      { name: "User cannot login with invalid credentials", status: "passed", duration: "0.8s" },
      { name: "User can reset password", status: "passed", duration: "1.5s" },
    ],
  },
  s2: {
    id: "s2",
    name: "Navigation Tests",
    date: "2023-12-02",
    status: "failed",
    environment: "stage",
    type: "sanity",
    duration: "1m 45s",
    totalTests: 8,
    passed: 6,
    failed: 2,
    skipped: 0,
    details: [
      { name: "User can navigate to dashboard", status: "passed", duration: "0.3s" },
      { name: "User can navigate to profile", status: "passed", duration: "0.4s" },
      { name: "User can navigate to settings", status: "failed", duration: "0.6s" },
      { name: "User can navigate to help", status: "failed", duration: "0.5s" },
    ],
  },
}

// Recibir los props completos y esperar la resolución de la Promise
export default async function ReportDetailPage({
  params,
}: {
  params: ReportIdParams
}) {
  // Esperar la resolución de la Promise antes de acceder a los parámetros
  const { id } = await params
  const report = reports[id as keyof typeof reports]

  if (!report) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold neon-gradient">{report.name}</h1>
        <p className="text-gray-400 mt-2">
          {report.environment} environment - {report.type} test
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="neon-card">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-400">Status</dt>
                <dd>
                  <Badge
                    variant={report.status === "passed" ? "default" : "destructive"}
                    className={
                      report.status === "passed"
                        ? "bg-green-600 hover:bg-green-700 uppercase text-white"
                        : "bg-red-600 hover:bg-red-700 uppercase text-white"
                    }
                  >
                    {report.status}
                  </Badge>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Date</dt>
                <dd>{report.date}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Duration</dt>
                <dd>{report.duration}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Total Tests</dt>
                <dd>{report.totalTests}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="neon-card">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-green-500">Passed</span>
                <span className="font-bold">{report.passed}</span>
              </div>
              <div className="w-full bg-[#1A1A2E] rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(report.passed / report.totalTests) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-red-500">Failed</span>
                <span className="font-bold">{report.failed}</span>
              </div>
              <div className="w-full bg-[#1A1A2E] rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(report.failed / report.totalTests) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-yellow-500">Skipped</span>
                <span className="font-bold">{report.skipped}</span>
              </div>
              <div className="w-full bg-[#1A1A2E] rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(report.skipped / report.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="neon-card">
          <CardHeader>
            <CardTitle>Environment</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-400">Environment</dt>
                <dd className="capitalize">{report.environment}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Test Type</dt>
                <dd className="capitalize">{report.type}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card className="neon-card">
        <CardHeader>
          <CardTitle>Test Details</CardTitle>
          <CardDescription>Individual test results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.details.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-[#62E4CF]/20 rounded-md">
                <div>
                  <p className="font-medium">{test.name}</p>
                  <p className="text-sm text-gray-400">Duration: {test.duration}</p>
                </div>
                <Badge
                  variant={test.status === "passed" ? "default" : "destructive"}
                  className={
                    test.status === "passed"
                      ? "bg-green-600 hover:bg-green-700 uppercase text-white"
                      : "bg-red-600 hover:bg-red-700 uppercase text-white"
                  }
                >
                  {test.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Actualizar también la función generateMetadata
export async function generateMetadata({
  params,
}: {
  params: ReportIdParams
}): Promise<Metadata> {
  // Esperar la resolución de la Promise antes de acceder a los parámetros
  const { id } = await params
  const report = reports[id as keyof typeof reports]

  if (!report) {
    return {
      title: "Report Not Found - UPEX Test Report Portal",
    }
  }

  return {
    title: `${report.name} - UPEX Test Report Portal`,
  }
}

