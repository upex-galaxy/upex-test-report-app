"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError("")

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (result?.error) {
        setFormError("Invalid email or password")
        setIsLoading(false)
        return
      }

      router.push(callbackUrl)
    } catch (error) {
      console.error("Login error:", error)
      setFormError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleGitHubSignIn = () => {
    signIn("github", { callbackUrl })
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl })
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md neon-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center neon-gradient">UPEX Test Report Portal</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access test reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-800">
              <AlertDescription>
                {error === "AccessDenied"
                  ? "Access denied. You are not authorized to access this application."
                  : "An error occurred during sign in. Please try again."}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#1A1A2E] border-[#62E4CF]/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#1A1A2E] border-[#62E4CF]/30"
              />
            </div>
            {formError && <p className="text-red-500 text-sm">{formError}</p>}
            <Button type="submit" disabled={isLoading} className="w-full neon-button">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0B0C10] px-2 text-gray-400">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleGitHubSignIn}
              className="bg-[#1A1A2E] border-[#62E4CF]/30 hover:bg-[#2A2A3E] hover:border-[#62E4CF]/50"
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="bg-[#1A1A2E] border-[#62E4CF]/30 hover:bg-[#2A2A3E] hover:border-[#62E4CF]/50"
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-xs text-gray-400 border-t border-[#62E4CF]/20 pt-4 mt-2">
          <div className="space-y-2 text-sm text-center">
            <h4 className="font-medium text-[#62E4CF]/70">Login Instructions</h4>
            <div className="space-y-1 text-gray-400">
              <p>To access this portal, configure your credentials as repository secrets:</p>
              <div className="px-4 py-2 mt-2 bg-[#1A1A2E] rounded-md border border-[#62E4CF]/20">
          <p className="font-mono text-xs">
            <span className="text-[#62E4CF]">LOGIN_EMAIL</span> and <span className="text-[#62E4CF]">LOGIN_PASSWORD</span> for standard login
          </p>
          <div className="my-1 border-t border-gray-700/50"></div>
          <p className="font-mono text-xs">
            <span className="text-[#62E4CF]">GITHUB_ID/GITHUB_SECRET</span> or <span className="text-[#62E4CF]">GOOGLE_ID/GOOGLE_SECRET</span> for OAuth
          </p>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

