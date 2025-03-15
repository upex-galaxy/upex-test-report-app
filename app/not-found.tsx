import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-6xl font-bold neon-gradient">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-6">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/">
        <Button className="neon-button">Return to Home</Button>
      </Link>
    </div>
  )
}

