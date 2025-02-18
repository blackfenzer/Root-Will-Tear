server:
	cd backend && uvicorn main:app --reload --port 8001

client:
	cd frontend && pnpm run dev

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

b2:
	cd backend/bentoml && bentoml serve service2:DynamicRegressionService --port 5000