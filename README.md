# Project Setup and Run Instructions

## Requirements
- Docker
OR
- Node.js
- PostgreSQL configured and running

## How to Run

1. Create a .env file in the project root:
POSTGRES_HOST=db
POSTGRES_PORT="5432"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DATABASE=shop
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true

2. Run:
docker-compose up --build

5. Now you can see the main screen(buttons):
http://localhost:3000/buttons 