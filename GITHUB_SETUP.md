# Instructions for Adding Project to GitHub

## Prerequisites
1. Install Git: https://git-scm.com/download/win
2. Make sure you have access to: https://github.com/rydelle0918/vodafonetestExam

## Option A: Using the Setup Script (Easy)
1. Double-click `setup-git.bat` in this folder
2. The script will automatically:
   - Initialize Git repository
   - Add your GitHub remote
   - Commit all files
   - Push to GitHub

## Option B: Manual Commands
Open PowerShell in this directory and run:

```powershell
git init
git remote add origin https://github.com/rydelle0918/vodafonetestExam.git
git add .
git commit -m "Add Playwright test project with Vodafone tests"
git branch -M main
git push -u origin main
```

## What's Ready for GitHub:

✅ **Files prepared:**
- `package.json` - Updated with proper metadata and npm scripts
- `.gitignore` - Excludes node_modules and test results
- `README.md` - Documentation for the repository
- `playwright.config.ts` - Playwright configuration
- `tests/` - All your test files
- `setup-git.bat` - Automated setup script

✅ **npm scripts added:**
- `npm test` - Run all tests
- `npm run test:ui` - Run tests with UI
- `npm run test:part2` - Run part2 test with UI
- `npm run report` - Show test report
- `npm run install-browsers` - Install Playwright browsers

## After pushing to GitHub:
Your repository will be available at: https://github.com/rydelle0918/vodafonetestExam

Anyone can clone and run your tests with:
```bash
git clone https://github.com/rydelle0918/vodafonetestExam.git
cd vodafonetestExam
npm install
npm run install-browsers
npm test
```