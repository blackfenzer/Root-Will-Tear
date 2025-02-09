server:
	cd backend && uvicorn main:app --reload

client:
	cd frontend && pnpm run dev

table:
	cd backend && python -m app.database.create_table
# python -m backend.app.models.user
# python backend/app/database/create_table.py

proto:
	cd backend/infrastructure/resources/proto && python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. inference.proto management.proto open_inference_grpc.proto

torchserve:
	cd backend && torchserve --start --ncs --model-store model_store --ts-config config.properties

stopserve:
	cd backend && torchserve --stop