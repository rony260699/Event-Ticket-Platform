# Devtiro Event Ticket App Source Code

This is the backend and frontend source code for the Devtiro event ticket app build

## Running the Application

To run both the backend and frontend simultaneously, use the provided PowerShell script in the root directory:

```powershell
./run-dev.ps1
```

This will:
1. Start the Docker containers (Postgres & Keycloak) in the background.
2. Start the Spring Boot Backend in a new terminal window.
3. Start the Vite Frontend in a new terminal window.
