from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .core.database import Base, engine
from .routers import auth, clients, policies, reminders, enquiries
from .routers.reminders import start_scheduler

scheduler = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup
    Base.metadata.create_all(bind=engine)
    global scheduler
    scheduler = start_scheduler()
    yield
    if scheduler:
        scheduler.shutdown()

app = FastAPI(
    title="Diko's Assurances SARL — API",
    description="Insurance broker management system — clients, policies, reminders",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow Vite dev server + production domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://dikosassurances.com",
        "https://www.dikosassurances.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(clients.router)
app.include_router(policies.router)
app.include_router(reminders.router)
app.include_router(enquiries.router)

@app.get("/")
def root():
    return {"message": "Diko's Assurances SARL API v1.0", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok"}
