table:
	cd backend && python -m app.database.create_table
# python -m backend.app.models.user
# python backend/app/database/create_table.py

# proto:
# 	cd backend/app/resources/proto && python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. inference.proto management.proto open_inference_grpc.proto

torchserve:
	cd backend && torchserve --start --ncs --model-store model_store --ts-config config.properties --disable-token-auth --enable-model-api

stop:
	cd backend && torchserve --stop

.PHONY: proto

p:
	cd backend/app/resources/proto && \
	python -m grpc_tools.protoc \
		-I. \
		--python_out=. \
		--grpc_python_out=. \
		google/rpc/status.proto \
		inference.proto \
		management.proto \
		open_inference_grpc.proto

am:
	torch-model-archiver --model-name regression_model \
		--version 1.0 \
		--model-file backend/app/handlers/regression_net.py \
		--serialized-file backend/model_artifacts/regression_model.pth \
		--handler backend/app/handlers/model_handler.py \
		--extra-files "backend/app/handlers/regression_net.py" \
		--export-path backend/model_store

b1:
	cd backend/bentoml && bentoml serve service:RegressionService --port 5000




# When creating a new migration **change message**
alembic:
	cd backend && alembic revision --autogenerate -m "Initial migration"
	cd backend && alembic upgrade head

power:
	cd backend && alembic revision --autogenerate -m "smart migration"
	cd backend && alembic upgrade head
# TODO run all to start server and client

migration:
	cd backend && alembic upgrade head

# revision:
# 	cd backend && alembic revision --autogenerate -m "smart migration"

b2:
	cd backend/bentoml && bentoml serve service:DynamicRegressionService --port 5010 --reload

server:
	cd backend && uvicorn main:app --reload --port 8000

client:
	cd frontend && pnpm run dev

seed:
	cd backend && python -m app.seeds.seed_admin