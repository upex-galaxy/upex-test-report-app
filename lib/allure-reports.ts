export type Environment = "stage" | "review" | "production"
export type ExecutionStrategy = "sanity" | "smoke" | "regression"

export interface AllureExecution {
  buildNumber: string
  date: string
  status: "passed" | "failed" | "broken"
  totalTests?: number
  passedTests?: number
  failedTests?: number
  skippedTests?: number
}

export interface AllureReportStructure {
  [environment: string]: {
    [strategy: string]: AllureExecution[]
  }
}

// Función para obtener los reportes de Allure disponibles
// En un entorno real, esto podría leer del sistema de archivos o una API
export async function getAllureReports(): Promise<AllureReportStructure> {
  // Simulamos datos de ejemplo
  return {
    stage: {
      sanity: [
        {
          buildNumber: "34",
          date: "2023-12-15",
          status: "passed",
          totalTests: 15,
          passedTests: 15,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "33",
          date: "2023-12-14",
          status: "failed",
          totalTests: 15,
          passedTests: 13,
          failedTests: 2,
          skippedTests: 0,
        },
        {
          buildNumber: "32",
          date: "2023-12-13",
          status: "passed",
          totalTests: 15,
          passedTests: 15,
          failedTests: 0,
          skippedTests: 0,
        },
      ],
      smoke: [
        {
          buildNumber: "28",
          date: "2023-12-15",
          status: "passed",
          totalTests: 25,
          passedTests: 25,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "27",
          date: "2023-12-14",
          status: "passed",
          totalTests: 25,
          passedTests: 25,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "26",
          date: "2023-12-13",
          status: "failed",
          totalTests: 25,
          passedTests: 20,
          failedTests: 5,
          skippedTests: 0,
        },
      ],
      regression: [
        {
          buildNumber: "42",
          date: "2023-12-15",
          status: "failed",
          totalTests: 120,
          passedTests: 115,
          failedTests: 5,
          skippedTests: 0,
        },
        {
          buildNumber: "41",
          date: "2023-12-14",
          status: "passed",
          totalTests: 120,
          passedTests: 120,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "40",
          date: "2023-12-13",
          status: "passed",
          totalTests: 120,
          passedTests: 120,
          failedTests: 0,
          skippedTests: 0,
        },
      ],
    },
    review: {
      sanity: [
        {
          buildNumber: "21",
          date: "2023-12-15",
          status: "passed",
          totalTests: 15,
          passedTests: 15,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "20",
          date: "2023-12-14",
          status: "passed",
          totalTests: 15,
          passedTests: 15,
          failedTests: 0,
          skippedTests: 0,
        },
      ],
      smoke: [
        {
          buildNumber: "18",
          date: "2023-12-15",
          status: "passed",
          totalTests: 25,
          passedTests: 25,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "17",
          date: "2023-12-14",
          status: "failed",
          totalTests: 25,
          passedTests: 22,
          failedTests: 3,
          skippedTests: 0,
        },
      ],
      regression: [
        {
          buildNumber: "15",
          date: "2023-12-15",
          status: "passed",
          totalTests: 120,
          passedTests: 120,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "14",
          date: "2023-12-14",
          status: "passed",
          totalTests: 120,
          passedTests: 120,
          failedTests: 0,
          skippedTests: 0,
        },
      ],
    },
    production: {
      sanity: [
        {
          buildNumber: "12",
          date: "2023-12-15",
          status: "passed",
          totalTests: 15,
          passedTests: 15,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "11",
          date: "2023-12-14",
          status: "passed",
          totalTests: 15,
          passedTests: 15,
          failedTests: 0,
          skippedTests: 0,
        },
      ],
      smoke: [
        {
          buildNumber: "10",
          date: "2023-12-15",
          status: "passed",
          totalTests: 25,
          passedTests: 25,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "9",
          date: "2023-12-14",
          status: "passed",
          totalTests: 25,
          passedTests: 25,
          failedTests: 0,
          skippedTests: 0,
        },
      ],
      regression: [
        {
          buildNumber: "8",
          date: "2023-12-15",
          status: "passed",
          totalTests: 120,
          passedTests: 120,
          failedTests: 0,
          skippedTests: 0,
        },
        {
          buildNumber: "7",
          date: "2023-12-14",
          status: "passed",
          totalTests: 120,
          passedTests: 120,
          failedTests: 0,
          skippedTests: 0,
        },
      ],
    },
  }
}

// Función para verificar si un reporte específico existe
export async function checkAllureReportExists(
  environment: Environment,
  strategy: ExecutionStrategy,
  buildNumber: string,
): Promise<boolean> {
  // En un entorno real, esto verificaría si el directorio existe
  // Por ahora, simulamos que todos los reportes en nuestros datos existen
  const reports = await getAllureReports()

  if (!reports[environment] || !reports[environment][strategy]) {
    return false
  }

  return reports[environment][strategy].some((execution) => execution.buildNumber === buildNumber)
}

// Función para obtener la URL de un reporte específico
export function getAllureReportUrl(environment: Environment, strategy: ExecutionStrategy, buildNumber: string): string {
  return `/allure-report/${environment}/${strategy}/${buildNumber}/index.html`
}

// Función para obtener los últimos N reportes para una combinación específica
export async function getLatestAllureReports(
  environment: Environment,
  strategy: ExecutionStrategy,
  count = 2,
): Promise<AllureExecution[]> {
  const reports = await getAllureReports()

  if (!reports[environment] || !reports[environment][strategy]) {
    return []
  }

  return reports[environment][strategy].slice(0, count)
}

