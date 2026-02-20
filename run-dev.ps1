# Event Ticket Platform Development Script

Write-Host "Starting Event Ticket Platform Development Environment..." -ForegroundColor Cyan

# 1. Start Docker (Postgres & Keycloak)
Write-Host "`n[1/3] Starting Docker containers (Postgres & Keycloak)..." -ForegroundColor Green
cd backend
docker-compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to start Docker containers."
    exit $LASTEXITCODE
}
cd ..

# 2. Start Spring Boot Backend in a new window
Write-Host "[2/3] Starting Spring Boot Backend in a new window..." -ForegroundColor Green
cd backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "title Backend; ./mvnw spring-boot:run"
cd ..

# 3. Start Vite Frontend in a new window
Write-Host "[3/3] Starting Vite Frontend in a new window..." -ForegroundColor Green
cd frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "title Frontend; npm run dev"
cd ..

Write-Host "`nAll components are starting! Please wait a moment for the services to initialize." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend: http://localhost:8080" -ForegroundColor Yellow
Write-Host "Keycloak: http://localhost:9090" -ForegroundColor Yellow
