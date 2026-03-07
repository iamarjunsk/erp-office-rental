#!/bin/bash
# Free ports
kill $(lsof -t -i :8000) 2>/dev/null || true
kill $(lsof -t -i :3000) 2>/dev/null || true

# Start backend
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000 > ../backend.log 2>&1 &
BACKEND_PID=$!

cd ..

# Start frontend
pnpm dev > frontend.log 2>&1 &
FRONTEND_PID=$!

# Wait for servers to be ready
sleep 15

# Run playwright script
python verification/verify_toast.py

# Cleanup
kill $BACKEND_PID
kill $FRONTEND_PID
