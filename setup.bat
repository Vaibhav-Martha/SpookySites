@echo off
echo.
echo 🪦 ================================ 🪦
echo    Setting up Graveyard of the Forgotten Web
echo    Preparing the digital cemetery...
echo 👻 ================================ 👻
echo.

echo Installing root dependencies...
call npm install

echo.
echo Installing client dependencies...
cd client
call npm install
cd ..

echo.
echo Installing server dependencies...
cd server
call npm install
cd ..

echo.
echo 🕯️ ================================ 🕯️
echo    Setup complete! The spirits are ready...
echo.
echo    To start the haunted experience:
echo    npm run dev
echo.
echo    This will start:
echo    - Frontend on http://localhost:3002
echo    - Backend on http://localhost:5001
echo 👻 ================================ 👻
echo.
pause