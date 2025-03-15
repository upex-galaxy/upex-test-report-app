import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import type { AllureExecution } from "@/lib/allure-scanner"

// Actualizar la interfaz para eliminar los parámetros no utilizados
interface AllureExecutionListProps {
  executions: AllureExecution[]
}

// Actualizar la función para eliminar los parámetros no utilizados
export function AllureExecutionList({ executions }: AllureExecutionListProps) {
  return (
    <div className="space-y-3">
      {executions.length > 0 ? (
        <ul className="space-y-2">
          {executions.map((execution) => (
            <li key={execution.buildNumber} className="flex items-center justify-between">
              <Link href={execution.path} target="_blank" className="flex items-center text-[#62E4CF] hover:underline">
                <FileText size={16} className="mr-2" />
                <span>Execution #{execution.buildNumber}</span>
              </Link>
              <Badge
                variant={execution.status === "passed" ? "default" : "destructive"}
                className={`uppercase text-white font-medium ${
                  execution.status === "passed" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {execution.status}
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">No executions found</p>
      )}
    </div>
  )
}

