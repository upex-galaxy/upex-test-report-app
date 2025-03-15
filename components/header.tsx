"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Home, FileText } from "lucide-react"

export function Header() {
  const { data: session, status } = useSession()

  // Debugging - remove in production
  console.log("Session status:", status)
  console.log("Session data:", session)

  return (
    <header className="border-b border-[#62E4CF]/20 bg-[#0E0F14]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold neon-gradient">UPEX Test Reports</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-1 text-gray-300 hover:text-[#62E4CF] transition-colors">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link
            href="/allure-report"
            className="flex items-center space-x-1 text-gray-300 hover:text-[#62E4CF] transition-colors"
          >
            <FileText size={18} />
            <span>Allure Reports</span>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {/* Always show user info if authenticated */}
          {status === "authenticated" && (
            <>
              <span className="hidden md:inline text-sm text-gray-400">
                {session.user?.name || session.user?.email || "Usuario autenticado"}
              </span>
              <Button
                onClick={() => signOut({ callbackUrl: "/login" })}
                variant="outline"
                size="sm"
                className="border-[#62E4CF]/30 hover:bg-[#62E4CF]/10 hover:border-[#62E4CF]/50"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </>
          )}

          {/* Show a message if not authenticated but we're in a protected route */}
          {status === "unauthenticated" && <span className="text-sm text-yellow-400">Sesión no detectada</span>}
        </div>
      </div>
    </header>
  )
}

