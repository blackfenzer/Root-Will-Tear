# 🚀 Full-Stack AI-Powered Web App

## 📌 Overview

This project is a **full-stack web application** using:

- **Frontend**: Next.js

- **Backend**: FastAPI

- **Database**: SQLite

- **ML Model Serving**: TorchServe

It provides a seamless user experience with a React-based frontend, a high-performance Python backend, and an integrated machine learning model.

---

## 🏗 Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) (React framework for SSR & SSG)
- Tailwind CSS (for styling)
- Axios (for API requests)

### Backend

- [FastAPI](https://fastapi.tiangolo.com/) (high-performance API framework for Python)
- SQLite (lightweight relational database)
- SQLAlchemy (ORM for database interactions)

### Machine Learning

- [TorchServe](https://pytorch.org/serve/) (serving PyTorch models)
- PyTorch (deep learning framework)

---

## 📂 Project Structure

```
project-root/
│── backend/                # FastAPI backend
│   ├── models/             # Database models (SQLAlchemy)
│   ├── routes/             # API endpoints
│   ├── services/           # Business logic & ML interaction
│   ├── main.py             # FastAPI entry point
│   ├── database.py         # SQLite connection setup
│── frontend/               # Next.js frontend
│   ├── components/         # UI components
│   ├── pages/              # Page components (SSR/SSG)
│   ├── styles/             # TailwindCSS styles
│   ├── api/                # API service functions
│── model/                  # ML model directory
│   ├── model-store/        # TorchServe models
│   ├── handler.py          # Custom handler for inference
│── .env                    # Environment variables
│── docker-compose.yml      # Docker setup (optional)
│── README.md               # Project documentation
```

---

## 🔧 Installation & Setup

### Prerequisites

- Node.js & npm (for Next.js)
- Python 3.9+ (for FastAPI & TorchServe)
- PyTorch installed
- SQLite (built-in with Python)
- Make cli (run command)
- Docker (for deployment)
- .venv **(Note it should locate inside backend folder so it can work)**

### 1️⃣ Backend Setup (FastAPI & SQLite)

```bash
cd backend
pip install requirements.txt
cd ..
make table
make server
```

### 2️⃣ Frontend Setup (Next.js)

```bash
cd frontend
pnpm i
cd ..
make client
```

### 3️⃣ Model Serving (TorchServe)

```bash
cd model
torchserve --start --model-store model-store --models my_model.mar
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint         | Description        |
|--------|-----------------|--------------------|
| POST   | `/auth/login`   | User login        |
| POST   | `/auth/signup`  | User registration |

### ML Model Inference

| Method | Endpoint      | Description                     |
|--------|--------------|---------------------------------|
| POST   | `/predict`   | Sends data to the ML model     |

---

## 🐳 Docker Setup (Optional)

If you want to run everything in Docker:

```bash
docker-compose up --build
```

---

## 📌 Future Enhancements

✅ Add JWT authentication
✅ Improve UI/UX with better design
✅ Implement a caching layer for predictions
✅ Add a database migration system (Alembic)

---

## 🤝 Contributing

Make by Me and build by Me

---

## 📝 License

This project is licensed under the Chula License.
