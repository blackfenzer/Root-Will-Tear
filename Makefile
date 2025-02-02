server:
	cd backend && uvicorn main:app --reload

client:
	cd frontend && pnpm run dev

table:
	python -m backend.app.models.user
	cd backend && python -m backend.app.database.create_table