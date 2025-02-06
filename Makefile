server:
	cd backend && uvicorn main:app --reload

client:
	cd frontend && pnpm run dev

table:
	cd backend && python -m app.database.create_table
# python -m backend.app.models.user
# python backend/app/database/create_table.py
