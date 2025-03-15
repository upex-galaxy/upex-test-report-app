import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Test report data (in a real app, this would come from an API or database)
const testReports = {
  stage: {
    sanity: [
      { id: "s1", name: "Login Flow Tests", date: "2023-12-01", status: "passed" },
      { id: "s2", name: "Navigation Tests", date: "2023-12-02", status: "failed" },
    ],
    smoke: [
      { id: "sm1", name: "Core Functionality", date: "2023-12-03", status: "passed" },
      { id: "sm2", name: "API Integration", date: "2023-12-04", status: "passed" },
    ],
    regression: [
      { id: "r1", name: "Full Suite", date: "2023-12-05", status: "failed" },
      { id: "r2", name: "Edge Cases", date: "2023-12-06", status: "passed" },
    ],
  },
  review: {
    sanity: [{ id: "rs1", name: "Login Flow Tests", date: "2023-12-07", status: "passed" }],
    smoke: [{ id: "rsm1", name: "Core Functionality", date: "2023-12-08", status: "passed" }],
    regression: [{ id: "rr1", name: "Full Suite", date: "2023-12-09", status: "passed" }],
  },
  production: {
    sanity: [{ id: "ps1", name: "Login Flow Tests", date: "2023-12-10", status: "passed" }],
    smoke: [{ id: "psm1", name: "Core Functionality", date: "2023-12-11", status: "passed" }],
    regression: [{ id: "pr1", name: "Full Suite", date: "2023-12-12", status: "passed" }],
  },
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold neon-gradient">Test Report Dashboard</h1>
        <p className="text-gray-400 mt-2">View test reports across different environments and test types</p>
      </div>

      {Object.entries(testReports).map(([environment, types]) => (
        <div key={environment} className="space-y-4">
          <h2 className="text-2xl font-semibold capitalize neon-text">{environment} Environment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(types).map(([type, reports]) => (
              <Card key={type} className="neon-card">
                <CardHeader>
                  <CardTitle className="capitalize">{type} Tests</CardTitle>
                  <CardDescription>
                    {reports.length} report{reports.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {reports.map((report) => (
                      <li key={report.id} className="flex items-center justify-between">
                        <div>
                          <Link href={`/report/${report.id}`} className="text-[#62E4CF] hover:underline">
                            {report.name}
                          </Link>
                          <p className="text-xs text-gray-400">{report.date}</p>
                        </div>
                        <Badge
                          variant={report.status === "passed" ? "default" : "destructive"}
                          className={
                            report.status === "passed"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                          }
                        >
                          {report.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

