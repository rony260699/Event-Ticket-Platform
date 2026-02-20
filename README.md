# Devtiro Event Ticket App Source Code

This is the backend and frontend source code for the Devtiro event ticket app build published June 2025.

The source code is provided as a learning tool. It is provided as-is.

You can check out the build video [here](https://youtu.be/vK-KQZ8cpbU).

## Running the Application

To run both the backend and frontend simultaneously, use the provided PowerShell script in the root directory:

```powershell
./run-dev.ps1
```

This will:
1. Start the Docker containers (Postgres & Keycloak) in the background.
2. Start the Spring Boot Backend in a new terminal window.
3. Start the Vite Frontend in a new terminal window.