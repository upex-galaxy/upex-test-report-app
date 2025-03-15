import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, FileText } from "lucide-react"
import {
  type AllureExecution,
  type Environment,
  type ExecutionStrategy,
  getAllureReportUrl,
} from "@/lib/allure-reports"

interface AllureExecutionListProps {
  environment: Environment
  strategy: ExecutionStrategy
  executions: AllureExecution[]
  showViewAll?: boolean
}

export function AllureExecutionList({
  environment,
  strategy,
  executions,
  showViewAll = true,
}: AllureExecutionListProps) {
  return (
    <div className="space-y-3">
      {executions.length > 0 ? (
        <>
          <ul className="space-y-2">
            {executions.map((execution) => (
              <li key={execution.buildNumber} className="flex items-center justify-between">
                <Link
                  href={getAllureReportUrl(environment, strategy, execution.buildNumber)}
                  target="_blank"
                  className="flex items-center text-[#62E4CF] hover:underline"
                >
                  <FileText size={16} className="mr-2" />
                  <span>Execution #{execution.buildNumber}</span>
                </Link>
                <Badge
                  variant={execution.status === "passed" ? "default" : "destructive"}
                  className={
                    execution.status === "passed" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }
                >
                  {execution.status}
                </Badge>
              </li>
            ))}
          </ul>

          {showViewAll && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-[#62E4CF] hover:text-[#62E4CF] hover:bg-[#62E4CF]/10"
                asChild
              >
                <Link href={`/${environment}/${strategy}`}>
                  <span>View All</span>
                  <ChevronRight size={14} className="ml-1" />
                </Link>
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-400">No executions found</p>
      )}
    </div>
  )
}

