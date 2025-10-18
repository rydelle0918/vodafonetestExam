@echo off
REM Setup script for pushing to GitHub repository
echo Setting up Git repository for Vodafone Test Exam...

echo.
echo Step 1: Initialize Git repository
git init

echo.
echo Step 2: Add remote origin
git remote add origin https://github.com/rydelle0918/vodafonetestExam.git

echo.
echo Step 3: Add all files to staging
git add .

echo.
echo Step 4: Create initial commit
git commit -m "Add Playwright test project with Vodafone tests"

echo.
echo Step 5: Set main branch and push
git branch -M main
git push -u origin main

echo.
echo Setup complete! Your project has been pushed to GitHub.
echo Repository: https://github.com/rydelle0918/vodafonetestExam

pause