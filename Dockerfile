# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup Python backend
FROM python:3.10-slim
WORKDIR /app

# Copy the built frontend static files
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Set up the backend directory
WORKDIR /app/api
COPY api/requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code (including models and data)
COPY api/ ./

# Railway dynamically assigns a PORT environment variable
ENV PORT=8000
EXPOSE 8000

# Start the FastAPI application
CMD ["sh", "-c", "uvicorn index:app --host 0.0.0.0 --port $PORT"]
