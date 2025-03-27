# UPEX Test Report Portal

## Introduction

UPEX Test Report Portal is a web-based simple app designed with AUTH to visualize and manage PRIVATE test reports generated with Allure. It provides automatic report detection, structured categorization, authentication and comprehensive visualization for effective test management.

This is a very helpful app to host your Allure Reports with PRIVATE ACCESS for your projects, and host it in Vercel (or in your favorite hosting server).
![image](https://github.com/user-attachments/assets/98ed001b-1242-48cc-9be3-25915dca64f1)

---

## Features

- **Automatic Detection**: Scans and organizes Allure reports automatically.
- **Structured View**: Categorizes reports by environment, strategy, and build number.
- **Interactive Dashboard**: Quick navigation and visualization of test reports.
- **Multi-Authentication Support**: Credentials, GitHub OAuth, and Google OAuth.
- **Easy Integration**: Simple setup and deployment via Vercel.

---

## Directory Structure

Allure reports must follow this structure for automatic detection:

```plaintext
public/
└── allure-report/
    ├── [environment]/
    │   ├── [strategy]/
    │   │   ├── [build-number]/
    │   │   │   ├── index.html
    │   │   │   ├── data/
    │   │   │   │   ├── categories.json
    │   │   │   │   └── ... (other Allure files)
```

- **environment**: Test environment (e.g., stage, review, production)
- **strategy**: Test type (e.g., sanity, smoke, regression)
- **build-number**: Unique identifier for each execution (e.g., 42, 123)

---

## Report Status Detection

The platform determines report status using `data/categories.json`:

- **PASSED**: If `categories.json` has an empty `children` array.
- **FAILED**: If `categories.json` contains items in the `children` array.

---

## Setup Guide

### Prerequisites

- GitHub account
- Vercel account
- Node.js 18.18.0 or higher
- (Optional) Google Cloud Console account

### Installation

Clone the repository:

```shell
git clone https://github.com/your-username/test-report-portal.git
cd test-report-portal
npm install
```

### Environment Variables

Create `.env.local` from `.env.example`:

```plaintext
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secure-secret

# OAuth Credentials (optional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Basic credentials (optional)
LOGIN_EMAIL=admin@example.com
LOGIN_PASSWORD=password123

# Authorized emails for OAuth (optional)
AUTHORIZED_EMAILS=email1@example.com,email2@example.com
```

Generate `NEXTAUTH_SECRET` securely:

```shell
openssl rand -base64 32
```

---

## Authentication Methods

### Credentials Authentication

Set up basic authentication in `.env.local`:

```plaintext
LOGIN_EMAIL=your-email@example.com
LOGIN_PASSWORD=your-password
```

### GitHub OAuth

1. Register a new OAuth app on GitHub.
2. Set callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy `Client ID` and `Client Secret` to `.env.local`.

### Google OAuth

1. Create OAuth Client ID in Google Cloud Console.
2. Set callback URL: `http://localhost:3000/api/auth/callback/google`
3. Copy `Client ID` and `Client Secret` to `.env.local`.

---

## Local Development

Run locally:

```shell
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and test your configuration.

---

## Deployment with Vercel

1. Connect GitHub repository to Vercel.
2. Import and configure the project with default settings.
3. Add environment variables from `.env.local`.
4. Deploy your application.

Update OAuth callback URLs post-deployment to match your production URL.

---

## Adding Allure Reports

### Manual Upload

```shell
mkdir -p public/allure-report/stage/regression/42
cp -r /path/to/your/allure-report/* public/allure-report/stage/regression/42/

git add public/allure-report
git commit -m "Add Allure report #42"
git push
```

### CI/CD Integration

Configure your pipeline to:

- Generate and structure Allure reports.
- Deploy reports automatically to your repository.

---

## Best Practices

- **Sequential build numbers**: Improve tracking.
- **Maintain Allure history**: Configure Allure accordingly.
- **Regular cleanup**: Implement retention policies.
- **Detailed categorization**: Clearly document defects.
- **Test Documentation**: Provide comprehensive descriptions.

---

## Troubleshooting

- **Authentication Issues**: Check OAuth callback URLs and `AUTHORIZED_EMAILS`.
- **Deployment Issues**: Verify Vercel build logs and environment variables.
- **Report Detection Issues**: Confirm directory structure and presence of necessary files (`index.html`, `categories.json`).

---

## Customization

### Branding

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Brand - Test Report Portal",
  description: "Your custom description",
}
```

Customize styles in `app/globals.css`.

### Adding Functionality

- Explore the protected routes in `app/(protected)/`.
- Modify `lib/allure-scanner.ts` to adjust report detection logic.

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)

---

Feel free to reach out or open issues on GitHub if you encounter problems or need further assistance.
