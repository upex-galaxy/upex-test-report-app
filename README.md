# UPEX Test Report Portal

A Next.js application for viewing test reports and Allure Reports with authentication using Auth.js (NextAuth).

## Features

- **Authentication** with Auth.js (NextAuth)
  - Credential provider (username/password)
  - GitHub OAuth provider
  - Protected routes with middleware
- **Test Report Dashboard**
  - View test reports by environment (stage, review, production)
  - View test reports by type (sanity, smoke, regression)
  - Detailed test report pages
- **Allure Report Viewer**
  - View Allure reports in a protected environment
  - Instructions for uploading Allure reports

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/upex-test-report-portal.git
   cd upex-test-report-portal

