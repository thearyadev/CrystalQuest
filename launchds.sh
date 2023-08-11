cd backend
poetry run uvicorn main:app --reload &

cd ../frontend
vite --host