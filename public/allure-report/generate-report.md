# Allure Reports Guide

> Learn how to effectively use and manage Allure reports in the UPEX Test Report Portal

## What is Allure Report?

**Allure Report** is a flexible, lightweight multi-language test reporting tool that shows a detailed representation of test executions and provides clear insights into test results. It helps QA engineers and developers to identify issues quickly and understand test failures.

## How to Generate Allure Reports

### Generate Reports in CI/CD

1. Configure your test framework to generate Allure results
2. Add an Allure report generation step in your CI/CD pipeline
3. Set up history preservation between builds
4. Deploy the generated reports to this portal

### Directory Structure

Follow this structure for your Allure reports:

```bash
public/allure-report/
├── {environment}/
│   ├── {strategy}/
│   │   ├── {build-number}/
│   │   │   ├── data/
│   │   │   ├── index.html
│   │   │   └── ...
```

## Understanding Report Status

### ✅ Passed Reports

A report is marked as **PASSED** when:

* All test cases have executed successfully
* The `data/categories.json` file has an empty `children` array
* No defects or failures were detected during test execution

### ❌ Failed Reports

A report is marked as **FAILED** when:

* One or more test cases have failed
* The `data/categories.json` file has items in the `children` array
* Defects or failures were detected during test execution

## Best Practices

| Practice | Description |
|----------|-------------|
| **Consistent Naming** | Use consistent build numbers across environments and strategies |
| **History Preservation** | Configure Allure to maintain history between test runs |
| **Regular Cleanup** | Implement a retention policy to remove old reports |
| **Detailed Categorization** | Configure proper categorization of test failures |
| **Documentation** | Include detailed test descriptions and steps in your test code |

## Viewing Reports

You can access Allure reports in two ways:

1. **Dashboard**: The main dashboard shows the latest reports for each environment and strategy
2. **Reports List**: Click "View all reports" on any card to see all reports for that environment and strategy

## Need Help?

For more information on Allure Report, visit the [official documentation](https://docs.qameta.io/allure/).
