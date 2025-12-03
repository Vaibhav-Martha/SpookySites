@echo off
echo ========================================
echo  Graveyard Deployment Preparation
echo ========================================
echo.

echo 1. Building client for production...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Client build failed!
    pause
    exit /b 1
)
echo ✓ Client build successful!
echo.

echo 2. Testing server dependencies...
cd ..\server
call npm install --production
if %errorlevel% neq 0 (
    echo ERROR: Server dependencies failed!
    pause
    exit /b 1
)
echo ✓ Server dependencies installed!
echo.

echo 3. Checking environment variables...
if not exist .env (
    echo WARNING: No .env file found in server directory
    echo Please create one based on .env.example before deploying
) else (
    echo ✓ Environment file found
)
echo.

echo ========================================
echo  Deployment Checklist:
echo ========================================
echo [ ] MongoDB Atlas cluster created
echo [ ] Environment variables configured in Vercel
echo [ ] Code pushed to GitHub repository
echo [ ] Vercel project connected to GitHub repo
echo.
echo Ready for deployment!
echo Visit: https://vercel.com to deploy
echo.
pause