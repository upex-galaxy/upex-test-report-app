import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, GitBranch, Terminal, CheckCircle2, XCircle } from "lucide-react"

export default async function AllureReportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold neon-gradient">Allure Reports Guide</h1>
        <p className="text-gray-400 mt-2">
          Learn how to effectively use and manage Allure reports in the UPEX Test Report Portal
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-[#62E4CF] mb-4">What is Allure Report?</h2>
        <p>
          Allure Report is a flexible, lightweight multi-language test reporting tool that shows a detailed
          representation of test executions and provides clear insights into test results. It helps QA engineers and
          developers to identify issues quickly and understand test failures.
        </p>

        <h2 className="text-2xl font-semibold text-[#62E4CF] mt-8 mb-4">How to Generate Allure Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="neon-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Terminal className="mr-2 h-5 w-5 text-[#62E4CF]" />
                Generate Reports in CI/CD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Configure your test framework to generate Allure results</li>
                <li>Add an Allure report generation step in your CI/CD pipeline</li>
                <li>Set up history preservation between builds</li>
                <li>Deploy the generated reports to this portal</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="neon-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GitBranch className="mr-2 h-5 w-5 text-[#62E4CF]" />
                Directory Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Follow this structure for your Allure reports:</p>
              <div className="bg-[#1A1A2E] p-3 rounded-md border border-[#2A2A4E] relative">
                <div className="flex items-center text-xs text-gray-400 mb-2 pb-1 border-b border-[#2A2A4E]">
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  <span>Directory Structure</span>
                </div>
                <pre className="text-sm overflow-x-auto font-mono">
                  <code>
                    <span className="text-gray-500">public/allure-report/</span>
                    <br /><span className="text-blue-400">├── [environment]/</span>
                    <br /><span className="text-blue-400">│   ├── [strategy]/</span>
                    <br /><span className="text-blue-400">│   │   ├── [build-number]/</span>
                    <br /><span className="text-green-400">│   │   │   ├── data/</span>
                    <br /><span className="text-yellow-400">│   │   │   ├── index.html</span>
                    <br /><span className="text-gray-500">│   │   │   └── ...</span>
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold text-[#62E4CF] mt-8 mb-4">Understanding Report Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="neon-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                Passed Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                A report is marked as <span className="text-green-500 font-semibold">PASSED</span> when:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>All test cases have executed successfully</li>
                <li>
                  The <code className="bg-[#0B0C10] px-1 py-0.5 rounded">data/categories.json</code> file has an empty{" "}
                  <code className="bg-[#0B0C10] px-1 py-0.5 rounded">children</code> array
                </li>
                <li>No defects or failures were detected during test execution</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="neon-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="mr-2 h-5 w-5 text-red-500" />
                Failed Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                A report is marked as <span className="text-red-500 font-semibold">FAILED</span> when:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>One or more test cases have failed</li>
                <li>
                  The <code className="bg-[#0B0C10] px-1 py-0.5 rounded">data/categories.json</code> file has items in
                  the <code className="bg-[#0B0C10] px-1 py-0.5 rounded">children</code> array
                </li>
                <li>Defects or failures were detected during test execution</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold text-[#62E4CF] mt-8 mb-4">Best Practices</h2>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <span className="font-semibold">Consistent Naming:</span> Use consistent build numbers across environments
            and strategies
          </li>
          <li>
            <span className="font-semibold">History Preservation:</span> Configure Allure to maintain history between
            test runs
          </li>
          <li>
            <span className="font-semibold">Regular Cleanup:</span> Implement a retention policy to remove old reports
          </li>
          <li>
            <span className="font-semibold">Detailed Categorization:</span> Configure proper categorization of test
            failures
          </li>
          <li>
            <span className="font-semibold">Documentation:</span> Include detailed test descriptions and steps in your
            test code
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#62E4CF] mt-8 mb-4">Viewing Reports</h2>
        <p>You can access Allure reports in two ways:</p>
        <ul className="list-disc list-inside space-y-3 mt-2">
          <li>
            <span className="font-semibold">Dashboard:</span> The main dashboard shows the latest reports for each
            environment and strategy
          </li>
          <li>
            <span className="font-semibold">Reports List:</span> Click &quot;View all reports&quot; on any card to see all reports
            for that environment and strategy
          </li>
        </ul>

        <Alert className="mt-8 bg-blue-900/20 border-blue-800">
          <FileText className="h-4 w-4" />
          <AlertTitle>Need Help?</AlertTitle>
          <AlertDescription>
            For more information on Allure Report, visit the{" "}
            <a
              href="https://docs.qameta.io/allure-report/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#62E4CF] hover:underline"
            >
              official documentation
            </a>
            .
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

