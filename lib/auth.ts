import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// Demo users for credentials provider
const loginUser = process.env.LOGIN_EMAIL
const loginPassword = process.env.LOGIN_PASSWORD
if(!loginUser) {
  throw new Error("Please provide a LOGIN_EMAIL environment variable")
}
if(!loginPassword) {
  throw new Error("Please provide a LOGIN_PASSWORD environment variable")
}
const users = [
  {
    id: "1",
    name: "Fast-Login User",
    email: loginUser,
    password: loginPassword,
    role: "user",
  }
]

// Lista de correos electrónicos autorizados para OAuth
const authEmails = process.env.AUTHORIZED_EMAILS  // Añade aquí los correos electrónicos que quieres autorizar
if (!authEmails) {
  throw new Error("Please provide an AUTHORIZED_EMAILS environment variable")
}
const authorizedEmails = authEmails.split(",").map((email) => email.trim())

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user by email
        const user = users.find((user) => user.email === credentials.email)

        // Check if user exists and password matches
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        }

        return null
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Página a la que redirigir en caso de error
  },
  callbacks: {
    async signIn({ user, account }) {
      // Para proveedores de OAuth (GitHub, Google), verificar si el email está autorizado
      if (account?.provider === "github" || account?.provider === "google") {
        return authorizedEmails.includes(user.email as string)
      }

      // Para el proveedor de credenciales, permitir siempre (ya se verificó en authorize)
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user" // Asignar rol por defecto si no existe
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

