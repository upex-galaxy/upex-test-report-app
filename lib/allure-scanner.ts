import fs from "fs"
import path from "path"

export type Environment = string
export type ExecutionStrategy = string
export type BuildNumber = string

export interface AllureExecution {
  buildNumber: BuildNumber
  date: string
  status: "passed" | "failed"
  path: string
}

export interface AllureReportStructure {
  [environment: string]: {
    [strategy: string]: AllureExecution[]
  }
}

// Función para verificar si un directorio existe
function directoryExists(dirPath: string): boolean {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()
  } catch (error) {
    console.error(`Error checking directory ${dirPath}:`, error)
    return false
  }
}

// Función para verificar si un archivo existe
function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
  } catch (error) {
    console.error(`Error checking file ${filePath}:`, error)
    return false
  }
}

// Función para determinar el estado del reporte basado en categories.json
function determineReportStatus(buildPath: string): "passed" | "failed" {
  try {
    const categoriesPath = path.join(buildPath, "data", "categories.json")

    if (!fileExists(categoriesPath)) {
      console.warn(`Categories file not found: ${categoriesPath}`)
      return "failed" // Si no podemos determinar, asumimos failed
    }

    const categoriesData = fs.readFileSync(categoriesPath, "utf8")
    const categories = JSON.parse(categoriesData)

    // Si children es un array vacío, todas las pruebas pasaron
    if (categories.children && Array.isArray(categories.children) && categories.children.length === 0) {
      return "passed"
    } else {
      return "failed"
    }
  } catch (error) {
    console.error(`Error determining report status for ${buildPath}:`, error)
    return "failed" // En caso de error, asumimos failed
  }
}

// Función principal para escanear los reportes de Allure
export async function scanAllureReports(): Promise<AllureReportStructure> {
  const allureReportPath = path.join(process.cwd(), "public", "allure-report")
  const structure: AllureReportStructure = {}

  // Verificar si el directorio principal existe
  if (!directoryExists(allureReportPath)) {
    console.warn("Allure report directory not found:", allureReportPath)
    return structure
  }

  try {
    // Escanear entornos (stage, review, production)
    const environments = fs.readdirSync(allureReportPath)

    for (const env of environments) {
      const envPath = path.join(allureReportPath, env)

      // Verificar si es un directorio
      if (!fs.statSync(envPath).isDirectory()) continue

      structure[env] = {}

      // Escanear estrategias (sanity, smoke, regression)
      const strategies = fs.readdirSync(envPath)

      for (const strategy of strategies) {
        const strategyPath = path.join(envPath, strategy)

        // Verificar si es un directorio
        if (!fs.statSync(strategyPath).isDirectory()) continue

        structure[env][strategy] = []

        // Escanear builds
        const builds = fs.readdirSync(strategyPath)

        for (const build of builds) {
          const buildPath = path.join(strategyPath, build)

          // Verificar si es un directorio y contiene index.html
          if (fs.statSync(buildPath).isDirectory() && fileExists(path.join(buildPath, "index.html"))) {
            // Determinar el estado del reporte
            const status = determineReportStatus(buildPath)

            // Obtener la fecha de modificación del directorio
            const stats = fs.statSync(buildPath)
            const date = new Date(stats.mtime).toISOString().split("T")[0]

            // Crear la ruta relativa para el navegador
            const relativePath = `/allure-report/${env}/${strategy}/${build}/index.html`

            structure[env][strategy].push({
              buildNumber: build,
              date,
              status,
              path: relativePath,
            })
          }
        }

        // Ordenar builds por número (descendente)
        structure[env][strategy].sort((a, b) => {
          const numA = Number.parseInt(a.buildNumber)
          const numB = Number.parseInt(b.buildNumber)
          return isNaN(numA) || isNaN(numB) ? b.buildNumber.localeCompare(a.buildNumber) : numB - numA
        })
      }
    }

    return structure
  } catch (error) {
    console.error("Error scanning Allure reports:", error)
    return structure
  }
}

// Función para obtener los últimos N reportes para una combinación específica
export async function getLatestAllureReports(
  environment: Environment,
  strategy: ExecutionStrategy,
  count = 2,
): Promise<AllureExecution[]> {
  const reports = await scanAllureReports()

  if (!reports[environment] || !reports[environment][strategy]) {
    return []
  }

  return reports[environment][strategy].slice(0, count)
}

// Función para verificar si un reporte específico existe
export async function checkAllureReportExists(
  environment: Environment,
  strategy: ExecutionStrategy,
  buildNumber: BuildNumber,
): Promise<boolean> {
  const reports = await scanAllureReports()

  if (!reports[environment] || !reports[environment][strategy]) {
    return false
  }

  return reports[environment][strategy].some((execution) => execution.buildNumber === buildNumber)
}

// Función para obtener la URL de un reporte específico
export function getAllureReportUrl(
  environment: Environment,
  strategy: ExecutionStrategy,
  buildNumber: BuildNumber,
): string {
  return `/allure-report/${environment}/${strategy}/${buildNumber}/index.html`
}

